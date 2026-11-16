import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findRelevantLessons } from './knowledgeEngine.js';
import { callAIModel } from './aiProvider.js';

// Load .env variables manually without external dependencies
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    });
  }
}

loadEnv();

const PORT = process.env.PORT || 3001;

// ==============================================================================
// RATE LIMITING & SECURITY CONFIGURATION
// ==============================================================================
// Limits per individual client IP to prevent quota abuse and DoS
const IP_RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_IP_PER_MINUTE = 10;  // Up to 10 questions/min per student
const MAX_REQUESTS_PER_IP_PER_HOUR = 45;    // Up to 45 questions/hour per student

// Global limiter across all users to protect upstream free API tiers
const GLOBAL_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_GLOBAL_REQUESTS_PER_MINUTE = 35;

// In-memory request tracking
const ipRequestHistory = new Map();
const globalRequestTimestamps = [];

// Periodic cleanup of stale rate-limit records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, history] of ipRequestHistory.entries()) {
    const validTimestamps = history.filter(ts => now - ts < 60 * 60 * 1000);
    if (validTimestamps.length === 0) {
      ipRequestHistory.delete(ip);
    } else {
      ipRequestHistory.set(ip, validTimestamps);
    }
  }
  // Trim global timestamps older than 1 minute
  while (globalRequestTimestamps.length > 0 && now - globalRequestTimestamps[0] > GLOBAL_RATE_LIMIT_WINDOW_MS) {
    globalRequestTimestamps.shift();
  }
}, 5 * 60 * 1000);

/**
 * Extracts client IP safely across reverse proxies (Render, Vercel, Railway, Cloudflare)
 */
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // Return first IP in comma-separated list
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket.remoteAddress || '127.0.0.1';
}

/**
 * Checks and records rate limits for a given client IP
 * Returns { allowed: boolean, reason?: string, retryAfter?: number }
 */
function checkRateLimits(clientIp) {
  const now = Date.now();

  // 1. Global throughput check
  while (globalRequestTimestamps.length > 0 && now - globalRequestTimestamps[0] > GLOBAL_RATE_LIMIT_WINDOW_MS) {
    globalRequestTimestamps.shift();
  }
  if (globalRequestTimestamps.length >= MAX_GLOBAL_REQUESTS_PER_MINUTE) {
    const oldest = globalRequestTimestamps[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + GLOBAL_RATE_LIMIT_WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      reason: 'The public AI Study Tutor is currently at high student traffic capacity. Please pause for a few seconds and try again.',
      retryAfter
    };
  }

  // 2. Per-IP checks
  let history = ipRequestHistory.get(clientIp) || [];
  // Filter history to last 1 hour
  history = history.filter(ts => now - ts < 60 * 60 * 1000);

  // Check 1-minute window
  const recentInMinute = history.filter(ts => now - ts < IP_RATE_LIMIT_WINDOW_MS);
  if (recentInMinute.length >= MAX_REQUESTS_PER_IP_PER_MINUTE) {
    const oldestInMinute = recentInMinute[0];
    const retryAfter = Math.max(1, Math.ceil((oldestInMinute + IP_RATE_LIMIT_WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      reason: `You have submitted several questions recently (${recentInMinute.length} in 1 min). To ensure fair server access for all students, please wait ${retryAfter} seconds before your next question.`,
      retryAfter
    };
  }

  // Check 1-hour window
  if (history.length >= MAX_REQUESTS_PER_IP_PER_HOUR) {
    const oldestInHour = history[0];
    const retryAfter = Math.max(1, Math.ceil((oldestInHour + 60 * 60 * 1000 - now) / 1000));
    return {
      allowed: false,
      reason: 'Hourly question limit reached for this session (45 questions/hour). Please take a short study break or configure your own free Gemini API key.',
      retryAfter
    };
  }

  // Record valid hit
  history.push(now);
  ipRequestHistory.set(clientIp, history);
  globalRequestTimestamps.push(now);

  return { allowed: true };
}

function setSecurityHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
}

const server = http.createServer(async (req, res) => {
  setSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Health and Status Check Endpoint
  if (url.pathname === '/api/tutor/status' && req.method === 'GET') {
    loadEnv();
    const configuredProvider = process.env.GEMINI_API_KEY ? 'Google Gemini (gemini-1.5-flash)' :
                               process.env.OPENAI_API_KEY ? 'OpenAI (gpt-4o-mini)' :
                               process.env.GROQ_API_KEY ? 'Groq (Llama-3.3-70B)' :
                               process.env.OPENROUTER_API_KEY ? 'OpenRouter' :
                               process.env.ANTHROPIC_API_KEY ? 'Anthropic Claude' : null;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      hasApiKey: !!configuredProvider,
      provider: configuredProvider || 'None configured (Set GEMINI_API_KEY in hosting environment variables)',
      rateLimits: {
        maxPerMinute: MAX_REQUESTS_PER_IP_PER_MINUTE,
        maxPerHour: MAX_REQUESTS_PER_IP_PER_HOUR
      }
    }));
    return;
  }

  // AI Chat Request Endpoint
  if (url.pathname === '/api/tutor/chat' && req.method === 'POST') {
    const clientIp = getClientIp(req);

    // 1. Verify Rate Limits
    const limitCheck = checkRateLimits(clientIp);
    if (!limitCheck.allowed) {
      res.writeHead(429, { 
        'Content-Type': 'application/json',
        'Retry-After': String(limitCheck.retryAfter || 60)
      });
      res.end(JSON.stringify({
        error: limitCheck.reason,
        isRateLimited: true,
        retryAfter: limitCheck.retryAfter
      }));
      return;
    }

    // 2. Read and Limit Body Size (Max 64KB to prevent payload flooding)
    let body = '';
    const MAX_PAYLOAD_BYTES = 64 * 1024;
    let payloadExceeded = false;

    req.on('data', chunk => {
      body += chunk;
      if (body.length > MAX_PAYLOAD_BYTES) {
        payloadExceeded = true;
        req.destroy();
      }
    });

    req.on('end', async () => {
      if (payloadExceeded) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Request payload too large (maximum 64KB).' }));
        return;
      }

      try {
        loadEnv();
        let parsed;
        try {
          parsed = JSON.parse(body || '{}');
        } catch (parseErr) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON request payload.' }));
          return;
        }

        const { messages = [], explanationDepth = 'detailed', currentSubject = null } = parsed;

        // 3. Strict Input Validation
        if (!Array.isArray(messages) || messages.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'At least one message is required in the conversation array.' }));
          return;
        }

        if (messages.length > 25) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Conversation history exceeds maximum permitted length (25 turns).' }));
          return;
        }

        // Validate each message structure
        for (const msg of messages) {
          if (!msg || typeof msg.content !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Malformed message: content must be a valid string.' }));
            return;
          }
          if (msg.content.length > 1500) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Individual questions are limited to 1,500 characters. Please shorten or divide your inquiry.' }));
            return;
          }
        }

        const latestUserMsg = [...messages].reverse().find(m => m.sender === 'user')?.content?.trim() || '';
        if (!latestUserMsg) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Question content cannot be empty or purely whitespace.' }));
          return;
        }

        // Sanitize explanationDepth and currentSubject
        const safeDepth = explanationDepth === 'simple' ? 'simple' : 'detailed';
        const safeSubject = typeof currentSubject === 'string' ? currentSubject.slice(0, 80) : null;

        // 4. Find relevant internal Nova Learn lessons to augment context
        const relevantLessons = findRelevantLessons(latestUserMsg, safeSubject, 3);

        // 5. Call the live AI model
        const aiResponseText = await callAIModel({
          messages,
          explanationDepth: safeDepth,
          relevantLessons,
          currentSubject: safeSubject
        });

        // Recommended follow-ups
        const suggestedFollowUps = relevantLessons.slice(0, 2).map(l => `Tell me more about ${l.title} in ${l.subject}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          response: aiResponseText,
          relevantLessons: relevantLessons.map(l => ({
            id: l.id,
            title: l.title,
            subject: l.subject,
            summary: l.summaryEn || l.summary
          })),
          suggestedFollowUps
        }));
      } catch (err) {
        console.error('AI Tutor Handler Error:', err.message);
        const isConfigRequired = err.message.includes('CONFIG_REQUIRED');
        const isQuotaError = err.message.includes('QUOTA_EXHAUSTED') || 
                             err.message.includes('429') || 
                             err.message.includes('ResourceExhausted');

        let userFacingError = err.message;
        let statusCode = 500;

        if (isConfigRequired) {
          statusCode = 503;
          userFacingError = 'AI Service Not Configured: No AI provider key is configured on the backend. Please add GEMINI_API_KEY in your hosting environment variables.';
        } else if (isQuotaError) {
          statusCode = 429;
          userFacingError = 'Demonstration Usage Quota Reached: The AI provider quota for this public demonstration has temporarily been reached. Please try again in 1-2 minutes or configure your own free Gemini API key.';
        }

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: userFacingError,
          isConfigRequired,
          isQuotaExhausted: isQuotaError
        }));
      }
    });
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found.' }));
});

server.listen(PORT, () => {
  console.log(`Nova Learn AI Tutor backend listening on http://localhost:${PORT}`);
});
