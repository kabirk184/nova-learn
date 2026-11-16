// Lightweight local storage manager for student progress, XP, streaks, badges, and daily challenges
const STORAGE_KEY = 'nova_learn_progress_v1';

export const ALL_AVAILABLE_BADGES = [
  { id: 'first_orbit', title: 'First Orbit', icon: '🌌', desc: 'Explored the Cosmos 3D simulator', category: 'Cosmos' },
  { id: 'curious_mind', title: 'Curious Mind', icon: '🧠', desc: 'Completed first psychology reflection', category: 'Academic' },
  { id: 'urdu_reader', title: 'Urdu Scholar', icon: '📖', desc: 'Read Urdu grammar study notes', category: 'Humanities' },
  { id: 'arena_champion', title: 'Arena Champion', icon: '🏆', desc: 'Achieved 100% precision in Quiz Arena', category: 'Competition' },
  { id: 'quiz_master', title: 'Speed Demon', icon: '⚡', desc: 'Completed a timed quiz session', category: 'Competition' },
  { id: 'pomodoro_scholar', title: 'Deep Focus Master', icon: '⏳', desc: 'Completed a 25-minute deep focus study block', category: 'Study Prep' },
  { id: 'tutor_scholar', title: 'Inquisitive Learner', icon: '🤖', desc: 'Synthesized 3 conceptual inquiries with Nova Tutor', category: 'AI Tutor' },
  { id: 'streak_titan', title: 'Streak Titan', icon: '🔥', desc: 'Maintained a 7-day continuous study streak', category: 'Dedication' },
  { id: 'polymath', title: 'Campus Polymath', icon: '🎓', desc: 'Studied lessons across 5 distinct faculties', category: 'Dedication' }
];

export const INITIAL_DAILY_CHALLENGES = [
  {
    id: 'ch-1',
    title: 'Explore the Cosmos 3D Simulation',
    desc: 'Launch the Cosmos Explorer and examine orbital characteristics of planetary bodies.',
    xp: 50,
    targetTab: 'cosmos',
    completed: true
  },
  {
    id: 'ch-2',
    title: 'Take a Quiz Arena Challenge',
    desc: 'Configure and complete a 5-question test in Psychology, Math, or Computer Science.',
    xp: 75,
    targetTab: 'arena',
    completed: false
  },
  {
    id: 'ch-3',
    title: 'Consult Nova AI Study Tutor',
    desc: 'Submit a conceptual question or explore follow-up inquiries with the tutor.',
    xp: 50,
    targetTab: 'tutor',
    completed: false
  },
  {
    id: 'ch-4',
    title: 'Master 3 Interactive Flashcards',
    desc: 'Review and mark 3 study concepts as mastered in the Study Preparation suite.',
    xp: 40,
    targetTab: 'prep',
    completed: false
  }
];

const DEFAULT_PROFILE = {
  name: 'Talha Khan',
  grade: 'BS Education (Semester 4)',
  avatar: '🚀',
  xp: 350,
  level: 2,
  streak: 3,
  lastActive: new Date().toISOString().split('T')[0],
  completedLessons: ['psych-intro-1', 'space-intro-solar', 'eng-tenses-1'],
  badges: [
    { id: 'first_orbit', title: 'First Orbit', icon: '🌌', desc: 'Explored the Cosmos 3D simulator', date: '2026-10-20' },
    { id: 'curious_mind', title: 'Curious Mind', icon: '🧠', desc: 'Completed first psychology reflection', date: '2026-10-21' },
    { id: 'urdu_reader', title: 'Urdu Scholar', icon: '📖', desc: 'Read Urdu grammar study notes', date: '2026-10-22' }
  ],
  quizScores: {
    'solar-sys-quiz': 80,
    'grammar-basics': 90
  },
  dailyQuests: INITIAL_DAILY_CHALLENGES
};

export const getProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    // Ensure dailyQuests exists
    if (!parsed.dailyQuests || parsed.dailyQuests.length === 0) {
      parsed.dailyQuests = INITIAL_DAILY_CHALLENGES;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to parse progress from storage', e);
    return DEFAULT_PROFILE;
  }
};

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('nova_progress_updated'));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export const addXp = (amount) => {
  const current = getProgress();
  const newXp = current.xp + amount;
  const newLevel = Math.floor(newXp / 250) + 1; // Level up every 250 XP
  const updated = {
    ...current,
    xp: newXp,
    level: Math.max(current.level, newLevel)
  };
  saveProgress(updated);
  return updated;
};

export const unlockBadge = (badge) => {
  const current = getProgress();
  if (current.badges.some(b => b.id === badge.id)) {
    return false; // already unlocked
  }
  const updated = {
    ...current,
    badges: [...current.badges, { ...badge, date: new Date().toISOString().split('T')[0] }],
    xp: current.xp + 100 // Bonus XP for badge
  };
  saveProgress(updated);
  return true;
};

export const completeDailyChallenge = (challengeId) => {
  const current = getProgress();
  let gainedXp = 0;
  const updatedQuests = (current.dailyQuests || INITIAL_DAILY_CHALLENGES).map(q => {
    if (q.id === challengeId && !q.completed) {
      gainedXp = q.xp;
      return { ...q, completed: true };
    }
    return q;
  });

  if (gainedXp > 0) {
    const newXp = current.xp + gainedXp;
    const newLevel = Math.floor(newXp / 250) + 1;
    const updated = {
      ...current,
      xp: newXp,
      level: Math.max(current.level, newLevel),
      dailyQuests: updatedQuests
    };
    saveProgress(updated);
    return { success: true, xp: gainedXp };
  }
  return { success: false, xp: 0 };
};
