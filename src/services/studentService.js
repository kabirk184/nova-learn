/**
 * Nova Learn — Student Profile & Leaderboard Client Service
 * Bridges local client gamification with persistent backend leaderboard
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001' : '');

const STUDENT_PROFILE_KEY = 'nova_student_profile_v1';

export function getStoredStudent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STUDENT_PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function saveStoredStudent(profile) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile));
    // Also sync with nova_learn_progress_v1 so storage.js stays seamlessly aligned
    const progressRaw = localStorage.getItem('nova_learn_progress_v1');
    if (progressRaw) {
      const parsed = JSON.parse(progressRaw);
      parsed.name = profile.displayName || parsed.name;
      parsed.avatar = profile.avatar || parsed.avatar;
      parsed.grade = profile.grade || parsed.grade;
      if (profile.xp !== undefined) parsed.xp = profile.xp;
      if (profile.level !== undefined) parsed.level = profile.level;
      localStorage.setItem('nova_learn_progress_v1', JSON.stringify(parsed));
    }
    window.dispatchEvent(new Event('nova_progress_updated'));
  } catch (err) {
    console.error('Failed to save student profile locally:', err);
  }
}

export async function registerStudentOnServer({ displayName, avatar = '🚀', grade = 'Undergraduate Scholar' }) {
  try {
    // Check existing progress to import initial XP if student already studied
    let existingXp = 0;
    try {
      const existing = localStorage.getItem('nova_learn_progress_v1');
      if (existing) existingXp = JSON.parse(existing).xp || 0;
    } catch (_) {}

    const res = await fetch(`${API_BASE_URL}/api/student/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName, avatar, grade, existingXp })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to register student profile.');
    }

    const studentRecord = {
      ...data.student,
      isRegistered: true
    };
    saveStoredStudent(studentRecord);
    return studentRecord;
  } catch (err) {
    console.warn('Backend registration failed, using offline student profile:', err.message);
    const offlineRecord = {
      studentId: 'std_local_' + Math.random().toString(36).substring(2, 9),
      secretToken: 'tok_local_' + Math.random().toString(36).substring(2, 9),
      displayName: displayName.trim().slice(0, 24),
      avatar: avatar || '🚀',
      grade: grade || 'Undergraduate Scholar',
      xp: 0,
      level: 1,
      isRegistered: true,
      isOffline: true
    };
    saveStoredStudent(offlineRecord);
    return offlineRecord;
  }
}

export async function updateStudentOnServer({ displayName, avatar, grade }) {
  const current = getStoredStudent();
  if (!current || !current.studentId) {
    return registerStudentOnServer({ displayName, avatar, grade });
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/student/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Student-Token': current.secretToken,
        'X-Student-Session-Id': current.studentId
      },
      body: JSON.stringify({ displayName, avatar, grade })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update student profile.');
    }

    const updated = {
      ...current,
      ...data.student
    };
    saveStoredStudent(updated);
    return updated;
  } catch (err) {
    console.warn('Backend update failed, saving locally:', err.message);
    const updated = {
      ...current,
      displayName: displayName || current.displayName,
      avatar: avatar || current.avatar,
      grade: grade || current.grade
    };
    saveStoredStudent(updated);
    return updated;
  }
}

export async function recordValidatedActivity({ activityType, activityId, metadata = {} }) {
  const current = getStoredStudent();
  if (!current || !current.studentId || !current.secretToken) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/student/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Student-Token': current.secretToken,
        'X-Student-Session-Id': current.studentId
      },
      body: JSON.stringify({ activityType, activityId, metadata })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      if (data.earnedXp > 0) {
        current.xp = data.totalXp;
        current.level = data.level;
        saveStoredStudent(current);
      }
      return data;
    }
  } catch (err) {
    console.warn('[Activity Tracker] Backend sync error, continuing offline:', err.message);
  }
  return null;
}

export async function fetchGlobalLeaderboard(period = 'all') {
  const current = getStoredStudent();
  const headers = {};
  if (current && current.studentId) {
    headers['X-Student-Session-Id'] = current.studentId;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/leaderboard?period=${period}`, { headers });
    if (!res.ok) {
      throw new Error(`Failed to load leaderboard (${res.status})`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch leaderboard from server:', err.message);
    return {
      period,
      totalParticipants: 1,
      leaderboard: [
        {
          rank: 1,
          displayName: current?.displayName || 'My Scholar Profile',
          avatar: current?.avatar || '🚀',
          grade: current?.grade || 'Undergraduate',
          xp: current?.xp || 450,
          totalXp: current?.xp || 450,
          level: current?.level || 2,
          streak: 3,
          badgesCount: 3,
          isCurrent: true
        }
      ],
      currentStudent: {
        rank: 1,
        displayName: current?.displayName || 'My Scholar Profile',
        avatar: current?.avatar || '🚀',
        xp: current?.xp || 450,
        level: current?.level || 2,
        isCurrent: true
      },
      isOffline: true
    };
  }
}
