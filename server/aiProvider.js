/**
 * Multi-Provider AI Model Router for Nova Learn
 * Primary Provider: Groq Cloud (openai/gpt-oss-120b, secondary: qwen/qwen3.8-27b)
 * Secondary Provider: Google Gemini (gemini-3.8-flash, fallback: gemini-3.5-flash-lite)
 * Quota Protection & Persistence: Calibrated for 60 students sharing free-tier capacity
 * Timezone-Aware Resets: Groq resets at Midnight UTC; Gemini resets at Midnight Pacific Time (PT).
 */

import fs from 'fs';
import path from 'path';

const SYSTEM_PROMPT = `You are the official AI Study Tutor for Nova Learn, a comprehensive university-level educational platform.
Your purpose is to provide clear, academically rigorous, articulate, and engaging pedagogical explanations to students.

Key Guidelines:
1. Cover all undergraduate academic subjects: Psychology, Educational Pedagogy, Mathematics, English & Grammar, Urdu Literature & Linguistics, Economics, Literature & Novels, Computer Science, History, Geography, Space & Astronomy, Biology, Physics, Chemistry, and Sociology & Criminology.
2. Structure your responses clearly with appropriate Markdown headings, bullet points, numbered lists, math notation, and code snippets where applicable.
3. Adapt your explanations to the requested depth: intuitive and accessible for foundational learners; rigorous and detailed for university level.
4. When math problems are submitted, show every step of the working clearly with definitions and formulas.
5. When MCQs or practice questions are requested, provide accurate questions, multiple choice options (A, B, C, D), correct answers, and thorough conceptual explanations for each option.
6. When relevant Nova Learn lesson content is provided in the prompt context, synthesize it seamlessly and recommend related topics.
7. Maintain an encouraging, scholarly, and supportive pedagogical tone.
8. Respond in clear English. If the student asks in Urdu or requests Urdu explanations, respond in eloquent, grammatically correct Urdu.
9. Never fabricate citations or claim to have accessed the live internet. State facts with scholarly precision.`;

// Officially supported production models on Free Tiers
export const GROQ_MODEL_PRIMARY = 'openai/gpt-oss-120b';
export const GROQ_MODEL_SECONDARY = 'qwen/qwen3.8-27b';

export const GEMINI_MODEL_PRIMARY = 'gemini-3.8-flash';
export const GEMINI_MODEL_SECONDARY = 'gemini-3.5-flash-lite';

// Realistic daily ceilings tailored for 60 students with safety buffers:
export const GROQ_DAILY_CEILING = 800; // 20% margin under 1,000 RPD
export const GEMINI_DAILY_CEILING = 500; // conservative project-specific allocation
export const COMBINED_DAILY_CEILING = GROQ_DAILY_CEILING + GEMINI_DAILY_CEILING;

// Timezone calculation helpers
function getUtcDate() {
  return new Date().toISOString().split('T')[0];
}

function getPacificDate() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
}

// Persistent usage storage setup
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const USAGE_FILE = path.join(DATA_DIR, 'usageStats.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadPersistedUsage() {
  try {
    ensureDataDir();
    if (fs.existsSync(USAGE_FILE)) {
      const data = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf8'));
      return data;
    }
  } catch (err) {
    console.warn('[Usage Storage] Failed to load usage file, initializing fresh stats:', err.message);
  }
  return null;
}

function savePersistedUsage(state) {
  try {
    ensureDataDir();
    fs.writeFileSync(USAGE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Usage Storage] Failed to persist usage state:', err.message);
  }
}

// Initialize state from file or defaults
const existingState = loadPersistedUsage();

const dailyTracker = {
  groq: {
    date: existingState?.groq?.date || getUtcDate(),
    requestsToday: existingState?.groq?.requestsToday || 0,
    tokensEstimatedToday: existingState?.groq?.tokensEstimatedToday || 0,
    liveRemainingRequests: existingState?.groq?.liveRemainingRequests || null,
    liveRemainingTokens: existingState?.groq?.liveRemainingTokens || null
  },
  gemini: {
    date: existingState?.gemini?.date || getPacificDate(),
    requestsToday: existingState?.gemini?.requestsToday || 0,
    liveRetryAfter: null
  },
  fallbackEventsToday: existingState?.fallbackEventsToday || 0
};

// Ensure state is written to disk immediately on boot
if (!existingState) {
  savePersistedUsage(dailyTracker);
}

function ensureDateRollovers() {
  const currentUtc = getUtcDate();
  const currentPacific = getPacificDate();
  let changed = false;

  // Groq resets daily at 00:00 UTC
  if (dailyTracker.groq.date !== currentUtc) {
    dailyTracker.groq.date = currentUtc;
    dailyTracker.groq.requestsToday = 0;
    dailyTracker.groq.tokensEstimatedToday = 0;
    dailyTracker.groq.liveRemainingRequests = null;
    dailyTracker.groq.liveRemainingTokens = null;
    dailyTracker.fallbackEventsToday = 0;
    changed = true;
  }

  // Gemini resets daily at Midnight Pacific Time (PT)
  if (dailyTracker.gemini.date !== currentPacific) {
    dailyTracker.gemini.date = currentPacific;
    dailyTracker.gemini.requestsToday = 0;
    dailyTracker.gemini.liveRetryAfter = null;
    changed = true;
  }

  if (changed) {
    savePersistedUsage(dailyTracker);
  }
}

/**
 * Returns current usage statistics and configured provider states
 */
export function getDailyStats() {
  ensureDateRollovers();
  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  let primary = null;
  let secondary = null;

  if (hasGroq) {
    primary = `Groq Cloud (${GROQ_MODEL_PRIMARY})`;
    if (hasGemini) secondary = `Google Gemini (${GEMINI_MODEL_PRIMARY})`;
  } else if (hasGemini) {
    primary = `Google Gemini (${GEMINI_MODEL_PRIMARY})`;
  }

  const totalUsed = dailyTracker.groq.requestsToday + dailyTracker.gemini.requestsToday;
  const activeCeiling = (hasGroq ? GROQ_DAILY_CEILING : 0) + (hasGemini ? GEMINI_DAILY_CEILING : 0);

  return {
    primaryProvider: primary,
    secondaryProvider: secondary,
    fallbackConfigured: Boolean(hasGroq && hasGemini),
    timezones: {
      groqResetTimezone: '00:00 UTC',
      geminiResetTimezone: 'Midnight Pacific Time (PT)',
      currentUtcDate: dailyTracker.groq.date,
      currentPacificDate: dailyTracker.gemini.date
    },
    usage: {
      totalRequestsToday: totalUsed,
      groqRequestsToday: dailyTracker.groq.requestsToday,
      geminiRequestsToday: dailyTracker.gemini.requestsToday,
      fallbackTriggeredToday: dailyTracker.fallbackEventsToday,
      groqDailyCeiling: GROQ_DAILY_CEILING,
      geminiDailyCeiling: GEMINI_DAILY_CEILING,
      combinedDailyCeiling: activeCeiling || 800,
      estimatedQueriesPerStudentRemaining: Math.max(0, Math.floor((activeCeiling - totalUsed) / 60)),
      groqHeaderRemainingRequests: dailyTracker.groq.liveRemainingRequests,
      groqHeaderRemainingTokens: dailyTracker.groq.liveRemainingTokens
    }
  };
}

/**
 * Primary AI Router with automatic, bounded fallback from Groq to Gemini
 * Strictly protects against ever calling paid APIs or enabling automatic billing
 */
export async function callAIModel({ messages, explanationDepth = 'detailed', relevantLessons = [], currentSubject = null }) {
  ensureDateRollovers();

  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  if (!hasGroq && !hasGemini) {
    throw new Error('CONFIG_REQUIRED: No AI API key is configured. Please add GROQ_API_KEY or GEMINI_API_KEY in your hosting environment variables.');
  }

  // Build lesson context augmentation
  let contextSnippet = '';
  if (relevantLessons && relevantLessons.length > 0) {
    contextSnippet = `\n\n[Verified Nova Learn Library Context]:\n` + 
      relevantLessons.map(l => 
        `Subject: ${l.subject}\nTopic: ${l.title}\nSummary: ${l.summaryEn || l.summary || ''}\nExcerpt: ${(l.contentEn || l.content || '').slice(0, 450)}...`
      ).join('\n---\n');
  }

  const depthDirective = explanationDepth === 'simple'
    ? '\n\n[Instruction: Provide an intuitive, easy-to-understand explanation with everyday analogies, avoiding overly dense technical jargon unless defined.]'
    : '\n\n[Instruction: Provide a comprehensive, rigorous undergraduate-level explanation with clear conceptual definitions, key theoretical frameworks, examples, and synthesis.]';

  const formattedMessages = [
    { role: 'system', content: SYSTEM_PROMPT + (currentSubject ? `\nActive Subject Focus: ${currentSubject}` : '') + contextSnippet + depthDirective },
    ...messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.content
    }))
  ];

  let groqError = null;

  // 1. Try Groq Cloud first (Preferred primary free provider)
  if (hasGroq && dailyTracker.groq.requestsToday < GROQ_DAILY_CEILING) {
    try {
      const responseData = await callOpenAICompatible(
        'https://api.groq.com/openai/v1/chat/completions',
        process.env.GROQ_API_KEY,
        GROQ_MODEL_PRIMARY,
        formattedMessages
      );
      
      dailyTracker.groq.requestsToday++;
      dailyTracker.groq.tokensEstimatedToday += (responseData.totalTokens || 350);
      savePersistedUsage(dailyTracker);

      return {
        text: responseData.text,
        provider: `Groq Cloud (${GROQ_MODEL_PRIMARY})`,
        usedFallback: false
      };
    } catch (err) {
      groqError = err;
      console.warn(`[AI Router] Groq primary (${GROQ_MODEL_PRIMARY}) failed: ${err.message}. Trying secondary Groq model (${GROQ_MODEL_SECONDARY})...`);
      
      try {
        const altResponse = await callOpenAICompatible(
          'https://api.groq.com/openai/v1/chat/completions',
          process.env.GROQ_API_KEY,
          GROQ_MODEL_SECONDARY,
          formattedMessages
        );
        dailyTracker.groq.requestsToday++;
        dailyTracker.groq.tokensEstimatedToday += (altResponse.totalTokens || 350);
        savePersistedUsage(dailyTracker);

        return {
          text: altResponse.text,
          provider: `Groq Cloud (${GROQ_MODEL_SECONDARY})`,
          usedFallback: false
        };
      } catch (altErr) {
        console.warn(`[AI Router] Groq secondary (${GROQ_MODEL_SECONDARY}) also failed: ${altErr.message}. Attempting Gemini fallback...`);
        dailyTracker.fallbackEventsToday++;
        savePersistedUsage(dailyTracker);
      }
    }
  } else if (hasGroq && dailyTracker.groq.requestsToday >= GROQ_DAILY_CEILING) {
    console.warn(`[AI Router] Groq daily ceiling (${GROQ_DAILY_CEILING}) reached for today (UTC). Switching to Gemini fallback...`);
    dailyTracker.fallbackEventsToday++;
    savePersistedUsage(dailyTracker);
  }

  // 2. Secondary Fallback: Google Gemini
  if (hasGemini && dailyTracker.gemini.requestsToday < GEMINI_DAILY_CEILING) {
    try {
      const responseText = await callGemini(process.env.GEMINI_API_KEY, formattedMessages, GEMINI_MODEL_PRIMARY);
      dailyTracker.gemini.requestsToday++;
      savePersistedUsage(dailyTracker);

      return {
        text: responseText,
        provider: hasGroq ? `Google Gemini (${GEMINI_MODEL_PRIMARY}) [Auto-Fallback]` : `Google Gemini (${GEMINI_MODEL_PRIMARY})`,
        usedFallback: Boolean(hasGroq)
      };
    } catch (geminiErr) {
      console.warn(`[AI Router] Gemini primary (${GEMINI_MODEL_PRIMARY}) failed: ${geminiErr.message}. Trying Gemini Lite (${GEMINI_MODEL_SECONDARY})...`);
      try {
        const altGeminiText = await callGemini(process.env.GEMINI_API_KEY, formattedMessages, GEMINI_MODEL_SECONDARY);
        dailyTracker.gemini.requestsToday++;
        savePersistedUsage(dailyTracker);

        return {
          text: altGeminiText,
          provider: `Google Gemini (${GEMINI_MODEL_SECONDARY}) [Auto-Fallback]`,
          usedFallback: true
        };
      } catch (geminiLiteErr) {
        console.error(`[AI Router] Gemini fallback failed: ${geminiLiteErr.message}`);
        if (groqError) {
          throw new Error(`QUOTA_EXHAUSTED: Both Groq (UTC) and Gemini (PT) free quotas are temporarily busy or exhausted. Quotas reset at 00:00 UTC and Midnight PT.`);
        }
        throw geminiLiteErr;
      }
    }
  } else if (hasGemini && dailyTracker.gemini.requestsToday >= GEMINI_DAILY_CEILING) {
    throw new Error(`QUOTA_EXHAUSTED: Daily free student quota (${GEMINI_DAILY_CEILING} requests) for Gemini has been completed for today. It resets at Midnight Pacific Time.`);
  }

  // If Groq failed and Gemini is not configured
  if (groqError) {
    if (groqError.message?.includes('QUOTA_EXHAUSTED') || groqError.message?.includes('rate_limit') || groqError.message?.includes('429')) {
      throw new Error(`QUOTA_EXHAUSTED: Groq free usage limit reached. Configure GEMINI_API_KEY as a secondary provider in .env for automatic zero-downtime fallback.`);
    }
    throw groqError;
  }

  // Strictly refuse to silently call paid APIs
  throw new Error('QUOTA_EXHAUSTED: All configured free AI quotas for the 60-student community have been utilized for today. Resets occur at 00:00 UTC (Groq) and Midnight PT (Gemini).');
}

async function callGemini(apiKey, messages, modelName = GEMINI_MODEL_PRIMARY) {
  const systemMsg = messages.find(m => m.role === 'system');
  const convo = messages.filter(m => m.role !== 'system');

  const contents = convo.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    }
  };

  if (systemMsg) {
    payload.systemInstruction = {
      parts: [{ text: systemMsg.content }]
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errJson = null;
    try { errJson = JSON.parse(errorBody); } catch (_) {}
    const msg = errJson?.error?.message || `Gemini API returned status ${response.status}`;
    if (response.status === 429 || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')) {
      throw new Error(`QUOTA_EXHAUSTED: ${msg}`);
    }
    throw new Error(`Gemini API Error: ${msg}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.map(p => p.text).join('') || '';

  if (!text) {
    throw new Error('Empty response received from Gemini model.');
  }

  return text;
}

async function callOpenAICompatible(endpoint, apiKey, model, messages) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2048
    })
  });

  // Extract live rate limit headers from Groq
  const headerRemainingReqs = response.headers.get('x-ratelimit-remaining-requests');
  const headerRemainingTokens = response.headers.get('x-ratelimit-remaining-tokens');
  if (headerRemainingReqs !== null) {
    dailyTracker.groq.liveRemainingRequests = parseInt(headerRemainingReqs, 10);
  }
  if (headerRemainingTokens !== null) {
    dailyTracker.groq.liveRemainingTokens = parseInt(headerRemainingTokens, 10);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    let errJson = null;
    try { errJson = JSON.parse(errorBody); } catch (_) {}
    const msg = errJson?.error?.message || `API returned status ${response.status}`;
    if (response.status === 429 || msg.includes('rate_limit') || msg.includes('quota') || msg.includes('tokens per minute')) {
      throw new Error(`QUOTA_EXHAUSTED: ${msg}`);
    }
    throw new Error(`API Error: ${msg}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';

  if (!text) {
    throw new Error('Empty response received from AI model.');
  }

  return {
    text,
    totalTokens: data.usage?.total_tokens || 350
  };
}
