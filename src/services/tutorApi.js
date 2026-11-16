/**
 * Nova Learn AI Tutor Service
 * Interfaces with the backend proxy
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001' : '');

export async function checkTutorStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tutor/status`);
    if (!res.ok) {
      throw new Error(`Status check returned ${res.status}`);
    }
    return await res.json();
  } catch (_) {
    return {
      status: 'offline',
      hasApiKey: false,
      error: 'Backend proxy is currently offline or unreachable.'
    };
  }
}

export async function sendChatMessage({ messages, explanationDepth = 'detailed', currentSubject = null }) {
  const res = await fetch(`${API_BASE_URL}/api/tutor/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages,
      explanationDepth,
      currentSubject
    })
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMsg = data.error || `Server responded with status ${res.status}`;
    const err = new Error(errorMsg);
    err.isConfigRequired = Boolean(data.isConfigRequired);
    err.isRateLimited = Boolean(data.isRateLimited);
    err.isQuotaExhausted = Boolean(data.isQuotaExhausted);
    err.retryAfter = data.retryAfter;
    throw err;
  }

  return data;
}
