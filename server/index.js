import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findRelevantLessons } from './knowledgeEngine.js';
import { callAIModel, getDailyStats } from './aiProvider.js';
import { leaderboardDb } from './leaderboardDb.js';

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

const PORT = parseInt(process.env.PORT, 10) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// ==============================================================================
// RATE LIMITING & SECURITY CONFIGURATION (School Wi-Fi & 60 Students Aware)
// ==============================================================================
const STUDENT_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_STUDENT_PER_MINUTE = 10;
const MAX_REQUESTS_PER_STUDENT_PER_HOUR = 45;
const MAX_SHARED_IP_REQUESTS_PER_MINUTE = 28;
const GLOBAL_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_GLOBAL_REQUESTS_PER_MINUTE = 28;

const studentRequestHistory = new Map();
const ipRequestHistory = new Map();
const globalRequestTimestamps = [];
const inFlightStudents = new Set();

setInterval(() => {
  const now = Date.now();
  for (const [key, history] of studentRequestHistory.entries()) {
    const valid = history.filter(ts => now - ts < 60 * 60 * 1000);
    if (valid.length === 0) studentRequestHistory.delete(key);
    else studentRequestHistory.set(key, valid);
  }
  for (const [ip, history] of ipRequestHistory.entries()) {
    const valid = history.filter(ts => now - ts < 60 * 1000);
    if (valid.length === 0) ipRequestHistory.delete(ip);
    else ipRequestHistory.set(ip, valid);
  }
  while (globalRequestTimestamps.length > 0 && now - globalRequestTimestamps[0] > GLOBAL_RATE_LIMIT_WINDOW_MS) {
    globalRequestTimestamps.shift();
  }
}, 5 * 60 * 1000);

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket.remoteAddress || '127.0.0.1';
}

function checkRateLimits(clientIp, studentSessionId) {
  const now = Date.now();

  while (globalRequestTimestamps.length > 0 && now - globalRequestTimestamps[0] > GLOBAL_RATE_LIMIT_WINDOW_MS) {
    globalRequestTimestamps.shift();
  }
  if (globalRequestTimestamps.length >= MAX_GLOBAL_REQUESTS_PER_MINUTE) {
    const oldest = globalRequestTimestamps[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + GLOBAL_RATE_LIMIT_WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      reason: 'The AI Study Tutor is currently processing concurrent questions from multiple students. Please wait a few seconds and try again.',
      retryAfter
    };
  }

  let ipHistory = ipRequestHistory.get(clientIp) || [];
  ipHistory = ipHistory.filter(ts => now - ts < 60 * 1000);
  if (ipHistory.length >= MAX_SHARED_IP_REQUESTS_PER_MINUTE) {
    const oldestInMin = ipHistory[0];
    const retryAfter = Math.max(1, Math.ceil((oldestInMin + 60 * 1000 - now) / 1000));
    return {
      allowed: false,
      reason: 'The shared school network has hit the rapid-burst limit. Please pause for a few seconds before your next question.',
      retryAfter
    };
  }

  const studentKey = studentSessionId || `fallback_ip_${clientIp}`;
  let studentHistory = studentRequestHistory.get(studentKey) || [];
  studentHistory = studentHistory.filter(ts => now - ts < 60 * 60 * 1000);

  const studentRecentMinute = studentHistory.filter(ts => now - ts < STUDENT_RATE_LIMIT_WINDOW_MS);
  if (studentRecentMinute.length >= MAX_REQUESTS_PER_STUDENT_PER_MINUTE) {
    const oldestInMin = studentRecentMinute[0];
    const retryAfter = Math.max(1, Math.ceil((oldestInMin + STUDENT_RATE_LIMIT_WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      reason: `You have submitted several questions recently (${studentRecentMinute.length} in 1 min). Please pause for ${retryAfter} seconds to let other students ask.`,
      retryAfter
    };
  }

  if (studentHistory.length >= MAX_REQUESTS_PER_STUDENT_PER_HOUR) {
    const oldestInHour = studentHistory[0];
    const retryAfter = Math.max(1, Math.ceil((oldestInHour + 60 * 60 * 1000 - now) / 1000));
    return {
      allowed: false,
      reason: 'Hourly question limit reached for your session (45 questions/hour). Please take a brief study break before asking more.',
      retryAfter
    };
  }

  return { allowed: true, studentKey, clientIp };
}

function commitRateLimits(clientIp, studentKey) {
  const now = Date.now();
  let studentHistory = studentRequestHistory.get(studentKey) || [];
  studentHistory.push(now);
  studentRequestHistory.set(studentKey, studentHistory);

  let ipHistory = ipRequestHistory.get(clientIp) || [];
  ipHistory.push(now);
  ipRequestHistory.set(clientIp, ipHistory);

  globalRequestTimestamps.push(now);
}

function setSecurityHeaders(req, res) {
  const origin = req ? req.headers['origin'] : null;
  const configuredOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
    : [];

  let matchedOrigin = null;

  if (origin) {
    if (configuredOrigins.includes(origin)) {
      matchedOrigin = origin;
    } else if (origin.endsWith('.vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      // Safe preview/production matching for Vercel apps & local test environments
      matchedOrigin = origin;
    }
  }

  if (matchedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', matchedOrigin);
    res.setHeader('Vary', 'Origin');
  } else if (configuredOrigins.length === 0) {
    // Development fallback if no specific origin is specified and request is direct
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Student-Session-Id, X-Student-Token');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
}

function parseJsonBody(req, maxBytes = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > maxBytes) {
        req.destroy();
        reject(new Error('Payload too large.'));
      }
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        resolve(parsed);
      } catch (err) {
        reject(new Error('Invalid JSON format.'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  setSecurityHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // ============================================================================
  // 1. LEADERBOARD API ENDPOINTS
  // ============================================================================

  // GET /api/leaderboard?period=all|weekly|daily
  if (url.pathname === '/api/leaderboard' && req.method === 'GET') {
    const period = url.searchParams.get('period') || 'all';
    const currentStudentId = req.headers['x-student-session-id'] || null;
    const limit = parseInt(url.searchParams.get('limit'), 10) || 50;

    const data = leaderboardDb.getLeaderboard({ period, currentStudentId, limit });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }

  // POST /api/student/register
  if (url.pathname === '/api/student/register' && req.method === 'POST') {
    try {
      const parsed = await parseJsonBody(req, 16 * 1024);
      const student = leaderboardDb.registerStudent(parsed);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, student }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // POST /api/student/profile
  if (url.pathname === '/api/student/profile' && req.method === 'POST') {
    try {
      const parsed = await parseJsonBody(req, 16 * 1024);
      const secretToken = req.headers['x-student-token'] || parsed.secretToken;
      const studentId = req.headers['x-student-session-id'] || parsed.studentId;

      if (!secretToken || !studentId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing student authentication credentials.' }));
        return;
      }

      const updated = leaderboardDb.updateProfile(studentId, secretToken, parsed);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, student: updated }));
    } catch (err) {
      res.writeHead(err.message.includes('Unauthorized') ? 403 : 400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // POST /api/student/activity (Server-validated XP award)
  if (url.pathname === '/api/student/activity' && req.method === 'POST') {
    try {
      const parsed = await parseJsonBody(req, 16 * 1024);
      const secretToken = req.headers['x-student-token'] || parsed.secretToken;
      const studentId = req.headers['x-student-session-id'] || parsed.studentId;

      if (!secretToken || !studentId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing student authentication credentials.' }));
        return;
      }

      const result = leaderboardDb.recordActivity(studentId, secretToken, parsed);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(err.message.includes('Unauthorized') ? 403 : 400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ============================================================================
  // 2. AI STUDY TUTOR ENDPOINTS
  // ============================================================================

  // GET /api/tutor/status
  if (url.pathname === '/api/tutor/status' && req.method === 'GET') {
    loadEnv();
    const stats = getDailyStats();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      hasApiKey: !!stats.primaryProvider,
      provider: stats.primaryProvider || 'None configured (Set GROQ_API_KEY or GEMINI_API_KEY)',
      primaryProvider: stats.primaryProvider,
      secondaryProvider: stats.secondaryProvider,
      fallbackConfigured: stats.fallbackConfigured,
      audienceTarget: '60 students max (School Wi-Fi friendly)',
      timezones: stats.timezones,
      dailyUsage: stats.usage,
      rateLimits: {
        maxPerStudentPerMinute: MAX_REQUESTS_PER_STUDENT_PER_MINUTE,
        maxPerStudentPerHour: MAX_REQUESTS_PER_STUDENT_PER_HOUR,
        maxSharedNetworkBurstPerMinute: MAX_SHARED_IP_REQUESTS_PER_MINUTE
      }
    }));
    return;
  }

  // POST /api/tutor/chat
  if (url.pathname === '/api/tutor/chat' && req.method === 'POST') {
    const clientIp = getClientIp(req);
    const studentSessionId = req.headers['x-student-session-id'] || null;

    // 1. Verify Rate Limits (School Wi-Fi friendly)
    const limitCheck = checkRateLimits(clientIp, studentSessionId);
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

    const studentLockKey = limitCheck.studentKey;
    if (inFlightStudents.has(studentLockKey)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Your previous question is still being answered. Please wait for the tutor to finish.',
        isRateLimited: true,
        retryAfter: 3
      }));
      return;
    }

    try {
      const parsed = await parseJsonBody(req, 64 * 1024);
      loadEnv();

      const { messages = [], explanationDepth = 'detailed', currentSubject = null } = parsed;

      // Strict Input Validation
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

      // Input is validated — now acquire lock and commit rate limit quota
      inFlightStudents.add(studentLockKey);
      commitRateLimits(clientIp, studentLockKey);

      try {
        const safeDepth = explanationDepth === 'simple' ? 'simple' : 'detailed';
        const safeSubject = typeof currentSubject === 'string' ? currentSubject.slice(0, 80) : null;

        const relevantLessons = findRelevantLessons(latestUserMsg, safeSubject, 3);

        const aiResult = await callAIModel({
          messages,
          explanationDepth: safeDepth,
          relevantLessons,
          currentSubject: safeSubject
        });

        const suggestedFollowUps = relevantLessons.slice(0, 2).map(l => `Tell me more about ${l.title} in ${l.subject}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          response: aiResult.text,
          provider: aiResult.provider,
          usedFallback: aiResult.usedFallback,
          relevantLessons: relevantLessons.map(l => ({
            id: l.id,
            title: l.title,
            subject: l.subject,
            summary: l.summaryEn || l.summary
          })),
          suggestedFollowUps
        }));
      } finally {
        inFlightStudents.delete(studentLockKey);
      }
    } catch (err) {
      inFlightStudents.delete(studentLockKey);
      console.error('AI Tutor Handler Error:', err.message);
      const isConfigRequired = err.message.includes('CONFIG_REQUIRED');
      const isQuotaError = err.message.includes('QUOTA_EXHAUSTED') || 
                           err.message.includes('429') || 
                           err.message.includes('ResourceExhausted');

      let userFacingError = err.message;
      let statusCode = 500;

      if (isConfigRequired) {
        statusCode = 503;
        userFacingError = 'AI Service Not Configured: No free AI provider key is configured on the backend. Please add GROQ_API_KEY or GEMINI_API_KEY in your hosting environment variables.';
      } else if (isQuotaError) {
        statusCode = 429;
        userFacingError = 'Demonstration Usage Quota Reached: All free AI quotas for the 60-student community have temporarily been reached. Quotas reset at 00:00 UTC (Groq) and Midnight PT (Gemini).';
      }

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: userFacingError,
        isConfigRequired,
        isQuotaExhausted: isQuotaError
      }));
    }
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found.' }));
});

server.listen(PORT, HOST, () => {
  console.log(`Nova Learn AI Tutor backend listening on http://${HOST}:${PORT}`);
});
