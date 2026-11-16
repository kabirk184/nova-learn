/**
 * Multi-Provider AI Model Router for Nova Learn
 * Primary Provider: Groq Cloud (openai/gpt-oss-120b, secondary in-provider: qwen/qwen3.8-27b)
 * Secondary Provider: Google Gemini (gemini-3.8-flash, fallback: gemini-3.5-flash-lite)
 * Quota Protection: Calibrated for 60 students sharing free-tier capacity
 */

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
// Groq Free Tier: 1,000 RPD, 8,000 TPM, 200,000 TPD. Safe ceiling: 800 reqs/day (20% safety margin).
export const GROQ_DAILY_CEILING = 800;
// Gemini Free Tier: 10-15 RPM, ~500-1,000 RPD. Safe ceiling: 500 reqs/day.
export const GEMINI_DAILY_CEILING = 500;
// Combined realistic daily ceiling = 1,300 requests/day (~21 questions/day per student for 60 students)
export const COMBINED_DAILY_CEILING = GROQ_DAILY_CEILING + GEMINI_DAILY_CEILING;

function getUtcDateString() {
  return new Date().toISOString().split('T')[0];
}

// In-memory usage tracker
const dailyTracker = {
  date: getUtcDateString(),
  groqRequests: 0,
  geminiRequests: 0,
  otherRequests: 0,
  fallbackEvents: 0
};

function ensureDateRollover() {
  const today = getUtcDateString();
  if (dailyTracker.date !== today) {
    dailyTracker.date = today;
    dailyTracker.groqRequests = 0;
    dailyTracker.geminiRequests = 0;
    dailyTracker.otherRequests = 0;
    dailyTracker.fallbackEvents = 0;
  }
}

/**
 * Returns current usage statistics and configured provider states
 */
export function getDailyStats() {
  ensureDateRollover();
  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  let primary = null;
  let secondary = null;

  if (hasGroq) {
    primary = `Groq Cloud (${GROQ_MODEL_PRIMARY})`;
    if (hasGemini) secondary = `Google Gemini (${GEMINI_MODEL_PRIMARY})`;
  } else if (hasGemini) {
    primary = `Google Gemini (${GEMINI_MODEL_PRIMARY})`;
  } else if (process.env.OPENAI_API_KEY) {
    primary = 'OpenAI (gpt-4o-mini)';
  }

  const totalUsed = dailyTracker.groqRequests + dailyTracker.geminiRequests + dailyTracker.otherRequests;
  const activeCeiling = (hasGroq ? GROQ_DAILY_CEILING : 0) + (hasGemini ? GEMINI_DAILY_CEILING : 0);

  return {
    primaryProvider: primary,
    secondaryProvider: secondary,
    fallbackConfigured: Boolean(hasGroq && hasGemini),
    date: dailyTracker.date,
    usage: {
      totalRequestsToday: totalUsed,
      groqRequestsToday: dailyTracker.groqRequests,
      geminiRequestsToday: dailyTracker.geminiRequests,
      fallbackTriggeredToday: dailyTracker.fallbackEvents,
      groqDailyCeiling: GROQ_DAILY_CEILING,
      geminiDailyCeiling: GEMINI_DAILY_CEILING,
      combinedDailyCeiling: activeCeiling || 800,
      estimatedQueriesPerStudentRemaining: Math.max(0, Math.floor((activeCeiling - totalUsed) / 60))
    }
  };
}

/**
 * Primary AI Router with automatic, bounded fallback from Groq to Gemini
 * Enforces zero-paid-billing and safe single-retry fallback bounds
 */
export async function callAIModel({ messages, explanationDepth = 'detailed', relevantLessons = [], currentSubject = null }) {
  ensureDateRollover();

  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
  const hasOpenRouter = Boolean(process.env.OPENROUTER_API_KEY);

  if (!hasGroq && !hasGemini && !hasOpenAI && !hasAnthropic && !hasOpenRouter) {
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
  if (hasGroq && dailyTracker.groqRequests < GROQ_DAILY_CEILING) {
    try {
      // Primary model: openai/gpt-oss-120b
      const responseText = await callOpenAICompatible(
        'https://api.groq.com/openai/v1/chat/completions',
        process.env.GROQ_API_KEY,
        GROQ_MODEL_PRIMARY,
        formattedMessages
      );
      dailyTracker.groqRequests++;
      return {
        text: responseText,
        provider: `Groq Cloud (${GROQ_MODEL_PRIMARY})`,
        usedFallback: false
      };
    } catch (err) {
      groqError = err;
      console.warn(`[AI Router] Groq primary (${GROQ_MODEL_PRIMARY}) failed: ${err.message}. Trying secondary Groq model (${GROQ_MODEL_SECONDARY})...`);
      
      // Try in-provider secondary model (qwen/qwen3.8-27b) before switching provider
      try {
        const altResponse = await callOpenAICompatible(
          'https://api.groq.com/openai/v1/chat/completions',
          process.env.GROQ_API_KEY,
          GROQ_MODEL_SECONDARY,
          formattedMessages
        );
        dailyTracker.groqRequests++;
        return {
          text: altResponse,
          provider: `Groq Cloud (${GROQ_MODEL_SECONDARY})`,
          usedFallback: false
        };
      } catch (altErr) {
        console.warn(`[AI Router] Groq secondary (${GROQ_MODEL_SECONDARY}) also failed: ${altErr.message}. Attempting Gemini fallback...`);
        dailyTracker.fallbackEvents++;
      }
    }
  } else if (hasGroq && dailyTracker.groqRequests >= GROQ_DAILY_CEILING) {
    console.warn(`[AI Router] Groq daily ceiling (${GROQ_DAILY_CEILING}) reached today. Switching to Gemini fallback...`);
    dailyTracker.fallbackEvents++;
  }

  // 2. Secondary Fallback: Google Gemini
  if (hasGemini && dailyTracker.geminiRequests < GEMINI_DAILY_CEILING) {
    try {
      const responseText = await callGemini(process.env.GEMINI_API_KEY, formattedMessages, GEMINI_MODEL_PRIMARY);
      dailyTracker.geminiRequests++;
      return {
        text: responseText,
        provider: hasGroq ? `Google Gemini (${GEMINI_MODEL_PRIMARY}) [Auto-Fallback]` : `Google Gemini (${GEMINI_MODEL_PRIMARY})`,
        usedFallback: Boolean(hasGroq)
      };
    } catch (geminiErr) {
      console.warn(`[AI Router] Gemini primary (${GEMINI_MODEL_PRIMARY}) failed: ${geminiErr.message}. Trying Gemini Lite (${GEMINI_MODEL_SECONDARY})...`);
      try {
        const altGeminiText = await callGemini(process.env.GEMINI_API_KEY, formattedMessages, GEMINI_MODEL_SECONDARY);
        dailyTracker.geminiRequests++;
        return {
          text: altGeminiText,
          provider: `Google Gemini (${GEMINI_MODEL_SECONDARY}) [Auto-Fallback]`,
          usedFallback: true
        };
      } catch (geminiLiteErr) {
        console.error(`[AI Router] Gemini fallback failed: ${geminiLiteErr.message}`);
        if (groqError) {
          throw new Error(`QUOTA_EXHAUSTED: Both Groq and Gemini free quotas are temporarily busy or exhausted. The 60-student daily quota resets at 00:00 UTC.`);
        }
        throw geminiLiteErr;
      }
    }
  } else if (hasGemini && dailyTracker.geminiRequests >= GEMINI_DAILY_CEILING) {
    throw new Error(`QUOTA_EXHAUSTED: Daily free student quota (${GEMINI_DAILY_CEILING} requests) for Gemini has been completed for today. It will reset at 00:00 UTC.`);
  }

  // If Groq failed and Gemini is not configured
  if (groqError) {
    if (groqError.message?.includes('QUOTA_EXHAUSTED') || groqError.message?.includes('rate_limit') || groqError.message?.includes('429')) {
      throw new Error(`QUOTA_EXHAUSTED: Groq free usage limit reached. Configure GEMINI_API_KEY as a secondary provider in .env for automatic zero-downtime fallback.`);
    }
    throw groqError;
  }

  // 3. Optional third-party providers (OpenAI / OpenRouter / Anthropic)
  if (hasOpenAI) {
    const text = await callOpenAICompatible('https://api.openai.com/v1/chat/completions', process.env.OPENAI_API_KEY, 'gpt-4o-mini', formattedMessages);
    dailyTracker.otherRequests++;
    return { text, provider: 'OpenAI (gpt-4o-mini)', usedFallback: true };
  }

  if (hasOpenRouter) {
    const text = await callOpenAICompatible('https://openrouter.ai/api/v1/chat/completions', process.env.OPENROUTER_API_KEY, 'meta-llama/llama-3.3-70b-instruct', formattedMessages);
    dailyTracker.otherRequests++;
    return { text, provider: 'OpenRouter (Llama-3.3-70B)', usedFallback: true };
  }

  if (hasAnthropic) {
    const text = await callAnthropic(process.env.ANTHROPIC_API_KEY, formattedMessages);
    dailyTracker.otherRequests++;
    return { text, provider: 'Anthropic Claude', usedFallback: true };
  }

  throw new Error('QUOTA_EXHAUSTED: All configured free AI quotas for the 60-student community have been utilized for today. Limits reset at 00:00 UTC.');
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

  return text;
}

async function callAnthropic(apiKey, messages) {
  const systemMsg = messages.find(m => m.role === 'system');
  const convo = messages.filter(m => m.role !== 'system');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 2048,
      system: systemMsg?.content || '',
      messages: convo.map(m => ({ role: m.role, content: m.content }))
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    if (response.status === 429) {
      throw new Error(`QUOTA_EXHAUSTED: Anthropic rate limit reached`);
    }
    throw new Error(`Anthropic API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || '';
  return text;
}
