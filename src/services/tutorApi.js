/**
 * Nova Learn AI Tutor Service
 * Interfaces with the backend proxy
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001' : '');

function getStudentSessionId() {
  if (typeof window === 'undefined') return 'server_session';
  try {
    let id = localStorage.getItem('nova_student_session_id');
    if (!id) {
      id = 'std_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem('nova_student_session_id', id);
    }
    return id;
  } catch (_) {
    return 'std_anonymous_' + Math.random().toString(36).substring(2, 8);
  }
}

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
  const studentSessionId = getStudentSessionId();

  const res = await fetch(`${API_BASE_URL}/api/tutor/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Student-Session-Id': studentSessionId
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
