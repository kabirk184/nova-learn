/**
 * Multi-Provider AI Model Router
 * Supports Google Gemini, OpenAI, Groq, Anthropic, or OpenRouter
 */

const SYSTEM_PROMPT = `You are the official AI Study Tutor for Nova Learn, a comprehensive university-level educational platform.
Your purpose is to provide clear, academically rigorous, articulate, and engaging pedagogical explanations to students.

Key Guidelines:
1. Cover all undergraduate academic subjects: Psychology, Educational Pedagogy, Mathematics, English & Grammar, Urdu Literature & Linguistics, Economics, Literature & Novels, Computer Science, History, Geography, Space & Astronomy, Biology, Physics, Chemistry, and Sociology & Criminology.
2. Structure your responses clearly with appropriate Markdown headings, bullet points, numbered lists, math notation, and code snippets where applicable.
3. Adapt your explanations to the requested depth: intuitive and accessible for foundational learners; rigorous and detailed for university level.
4. When math problems are submitted, show every step of the working clearly.
5. When MCQs or practice questions are requested, provide accurate questions, multiple choice options, correct answers, and thorough conceptual explanations.
6. When relevant Nova Learn lesson content is provided in the prompt context, synthesize it seamlessly and recommend related topics.
7. Maintain an encouraging, scholarly, and supportive pedagogical tone.
8. Respond in clear English. If the student asks in Urdu or requests Urdu explanations, respond in eloquent, grammatically correct Urdu.
9. Never fabricate citations or claim to have accessed the live internet. State facts with scholarly precision.`;

export async function callAIModel({ messages, explanationDepth = 'detailed', relevantLessons = [], currentSubject = null }) {
  const apiKey = process.env.GEMINI_API_KEY || 
                 process.env.OPENAI_API_KEY || 
                 process.env.GROQ_API_KEY || 
                 process.env.ANTHROPIC_API_KEY || 
                 process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('CONFIG_REQUIRED: No AI API key has been configured on the server yet. Please add your GEMINI_API_KEY or OPENAI_API_KEY in the hosting environment variables.');
  }

  // Build context augmentation from Nova Learn's verified library
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

  // Format messages
  const formattedMessages = [
    { role: 'system', content: SYSTEM_PROMPT + (currentSubject ? `\nActive Subject Focus: ${currentSubject}` : '') + contextSnippet + depthDirective },
    ...messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.content
    }))
  ];

  // 1. Google Gemini (Preferred provider if GEMINI_API_KEY is present)
  if (process.env.GEMINI_API_KEY) {
    return await callGemini(process.env.GEMINI_API_KEY, formattedMessages);
  }

  // 2. Groq (Ultra-fast Llama-3 inference)
  if (process.env.GROQ_API_KEY) {
    return await callOpenAICompatible('https://api.groq.com/openai/v1/chat/completions', process.env.GROQ_API_KEY, 'llama-3.3-70b-versatile', formattedMessages);
  }

  // 3. OpenAI
  if (process.env.OPENAI_API_KEY) {
    return await callOpenAICompatible('https://api.openai.com/v1/chat/completions', process.env.OPENAI_API_KEY, 'gpt-4o-mini', formattedMessages);
  }

  // 4. OpenRouter
  if (process.env.OPENROUTER_API_KEY) {
    return await callOpenAICompatible('https://openrouter.ai/api/v1/chat/completions', process.env.OPENROUTER_API_KEY, 'meta-llama/llama-3.3-70b-instruct', formattedMessages);
  }

  // 5. Anthropic Claude
  if (process.env.ANTHROPIC_API_KEY) {
    return await callAnthropic(process.env.ANTHROPIC_API_KEY, formattedMessages);
  }

  throw new Error('Unsupported AI provider configuration.');
}

async function callGemini(apiKey, messages) {
  const systemMsg = messages.find(m => m.role === 'system');
  const convo = messages.filter(m => m.role !== 'system');

  const contents = convo.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const model = 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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
    if (response.status === 429 || msg.includes('rate_limit') || msg.includes('quota')) {
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
