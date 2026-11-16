/**
 * Nova Learn — Persistent Student Profile & Global Leaderboard Database
 * Handles multi-student persistence, secret token auth, server-side XP validation,
 * and Daily / Weekly / All-Time leaderboard calculations.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'leaderboardDb.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Inappropriate name filter (basic sanitization)
const INAPPROPRIATE_WORDS = [
  'admin', 'administrator', 'moderator', 'root', 'system', 'null', 'undefined',
  'fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy', 'nigger', 'faggot'
];

function sanitizeDisplayName(name) {
  if (!name || typeof name !== 'string') return null;
  const trimmed = name.trim().replace(/\s+/g, ' ');
  if (trimmed.length < 2 || trimmed.length > 24) return null;
  // Allow unicode letters, numbers, spaces, underscores, and hyphens
  if (!/^[\p{L}\p{N}_\- ]+$/u.test(trimmed)) return null;

  const lower = trimmed.toLowerCase();
  for (const bad of INAPPROPRIATE_WORDS) {
    if (lower.includes(bad)) return null;
  }
  return trimmed;
}

function getUtcDateKey() {
  return new Date().toISOString().split('T')[0];
}

function getUtcWeekKey() {
  const d = new Date();
  const year = d.getUTCFullYear();
  // Simple ISO week calculation
  const firstDay = new Date(Date.UTC(year, 0, 1));
  const pastDays = (d - firstDay) / 86400000;
  const weekNum = Math.ceil((pastDays + firstDay.getUTCDay() + 1) / 7);
  return `${year}-W${weekNum.toString().padStart(2, '0')}`;
}

class LeaderboardDatabase {
  constructor() {
    this.students = new Map(); // studentId -> studentRecord
    this.nameToId = new Map(); // normalizedName -> studentId
    this.load();
  }

  load() {
    try {
      ensureDataDir();
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const data = JSON.parse(raw);
        if (Array.isArray(data.students)) {
          for (const s of data.students) {
            this.students.set(s.studentId, s);
            this.nameToId.set(s.displayName.toLowerCase(), s.studentId);
          }
        }
      } else {
        // Initialize with default seed students to establish a lively academic community
        this.seedInitialStudents();
      }
    } catch (err) {
      console.warn('[Leaderboard DB] Failed to load DB file, reinitializing:', err.message);
      this.seedInitialStudents();
    }
  }

  save() {
    try {
      ensureDataDir();
      const payload = {
        updatedAt: new Date().toISOString(),
        students: Array.from(this.students.values())
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf8');
    } catch (err) {
      console.error('[Leaderboard DB] Failed to save DB file:', err.message);
    }
  }

  seedInitialStudents() {
    const today = getUtcDateKey();
    const thisWeek = getUtcWeekKey();
    const seed = [
      {
        studentId: 'std_seed_ayesha',
        secretToken: crypto.randomBytes(16).toString('hex'),
        displayName: 'Ayesha Siddiqui',
        avatar: '🌟',
        grade: 'BS Physics (Sem 6)',
        xp: 1450,
        level: 6,
        streak: 14,
        badges: ['first_orbit', 'arena_champion', 'curious_mind'],
        completedLessons: ['space-01', 'phy-01', 'phy-02'],
        activityLog: ['seed_1', 'seed_2'],
        dailyXp: { [today]: 180 },
        weeklyXp: { [thisWeek]: 650 },
        createdAt: '2026-10-12T10:00:00Z',
        lastActiveAt: new Date().toISOString()
      },
      {
        studentId: 'std_seed_hamza',
        secretToken: crypto.randomBytes(16).toString('hex'),
        displayName: 'Hamza Farooq',
        avatar: '⚡',
        grade: 'BS Computer Science',
        xp: 890,
        level: 4,
        streak: 7,
        badges: ['curious_mind', 'quiz_master'],
        completedLessons: ['cs-01', 'cs-02'],
        activityLog: ['seed_3'],
        dailyXp: { [today]: 120 },
        weeklyXp: { [thisWeek]: 420 },
        createdAt: '2026-10-15T12:00:00Z',
        lastActiveAt: new Date().toISOString()
      },
      {
        studentId: 'std_seed_fatima',
        secretToken: crypto.randomBytes(16).toString('hex'),
        displayName: 'Fatima Zahra',
        avatar: '📚',
        grade: 'BS Urdu Literature',
        xp: 620,
        level: 3,
        streak: 5,
        badges: ['urdu_reader', 'curious_mind'],
        completedLessons: ['urdu-01'],
        activityLog: ['seed_4'],
        dailyXp: { [today]: 85 },
        weeklyXp: { [thisWeek]: 310 },
        createdAt: '2026-10-18T14:00:00Z',
        lastActiveAt: new Date().toISOString()
      },
      {
        studentId: 'std_seed_zain',
        secretToken: crypto.randomBytes(16).toString('hex'),
        displayName: 'Zain Ul Abideen',
        avatar: '🔬',
        grade: 'BS Psychology',
        xp: 410,
        level: 2,
        streak: 3,
        badges: ['curious_mind'],
        completedLessons: ['psy-01'],
        activityLog: ['seed_5'],
        dailyXp: { [today]: 45 },
        weeklyXp: { [thisWeek]: 190 },
        createdAt: '2026-10-22T09:00:00Z',
        lastActiveAt: new Date().toISOString()
      }
    ];

    for (const s of seed) {
      this.students.set(s.studentId, s);
      this.nameToId.set(s.displayName.toLowerCase(), s.studentId);
    }
    this.save();
  }

  registerStudent({ displayName, avatar = '🚀', grade = 'Undergraduate', existingXp = 0 }) {
    const validName = sanitizeDisplayName(displayName);
    if (!validName) {
      throw new Error('Invalid display name. Must be 2-24 characters, contain only letters/numbers/spaces, and be appropriate.');
    }

    // Check duplicate display name, append a suffix if collision occurs
    let finalName = validName;
    let counter = 2;
    while (this.nameToId.has(finalName.toLowerCase())) {
      finalName = `${validName}_${counter}`;
      counter++;
    }

    const studentId = 'std_' + crypto.randomBytes(8).toString('hex');
    const secretToken = 'sec_' + crypto.randomBytes(24).toString('hex');
    const today = getUtcDateKey();
    const thisWeek = getUtcWeekKey();

    const initialXp = Math.min(Math.max(0, parseInt(existingXp, 10) || 0), 1000); // capped initial sync
    const initialLevel = Math.floor(initialXp / 250) + 1;

    const record = {
      studentId,
      secretToken,
      displayName: finalName,
      avatar: avatar || '🚀',
      grade: grade || 'Undergraduate Scholar',
      xp: initialXp,
      level: initialLevel,
      streak: 1,
      badges: ['curious_mind'],
      completedLessons: [],
      activityLog: [],
      dailyXp: { [today]: Math.min(initialXp, 150) },
      weeklyXp: { [thisWeek]: initialXp },
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    };

    this.students.set(studentId, record);
    this.nameToId.set(finalName.toLowerCase(), studentId);
    this.save();

    return {
      studentId: record.studentId,
      secretToken: record.secretToken,
      displayName: record.displayName,
      avatar: record.avatar,
      grade: record.grade,
      xp: record.xp,
      level: record.level,
      streak: record.streak,
      badges: record.badges
    };
  }

  updateProfile(studentId, secretToken, { displayName, avatar, grade }) {
    const student = this.students.get(studentId);
    if (!student) throw new Error('Student profile not found.');
    if (student.secretToken !== secretToken) throw new Error('Unauthorized. Secret token mismatch.');

    if (displayName) {
      const validName = sanitizeDisplayName(displayName);
      if (!validName) {
        throw new Error('Invalid display name. Must be 2-24 characters without offensive words.');
      }
      if (validName.toLowerCase() !== student.displayName.toLowerCase()) {
        let finalName = validName;
        let counter = 2;
        while (this.nameToId.has(finalName.toLowerCase()) && this.nameToId.get(finalName.toLowerCase()) !== studentId) {
          finalName = `${validName}_${counter}`;
          counter++;
        }
        this.nameToId.delete(student.displayName.toLowerCase());
        student.displayName = finalName;
        this.nameToId.set(finalName.toLowerCase(), studentId);
      }
    }

    if (avatar) student.avatar = avatar;
    if (grade) student.grade = grade;
    student.lastActiveAt = new Date().toISOString();

    this.save();

    return {
      studentId: student.studentId,
      displayName: student.displayName,
      avatar: student.avatar,
      grade: student.grade,
      xp: student.xp,
      level: student.level,
      streak: student.streak,
      badges: student.badges
    };
  }

  recordActivity(studentId, secretToken, { activityType, activityId, metadata = {} }) {
    const student = this.students.get(studentId);
    if (!student) throw new Error('Student profile not found.');
    if (student.secretToken !== secretToken) throw new Error('Unauthorized. Secret token mismatch.');

    const uniqueActivityKey = `${activityType}_${activityId}`;
    const today = getUtcDateKey();
    const thisWeek = getUtcWeekKey();

    let earnedXp = 0;

    switch (activityType) {
      case 'lesson_complete': {
        // Only award XP once per unique lesson
        if (student.completedLessons.includes(activityId) || student.activityLog.includes(uniqueActivityKey)) {
          return { success: true, earnedXp: 0, totalXp: student.xp, level: student.level, alreadyCompleted: true };
        }
        earnedXp = 25; // Standard verified lesson completion
        student.completedLessons.push(activityId);
        break;
      }

      case 'quiz_complete': {
        // score is 0-100, correctAnswers count
        const score = Math.max(0, Math.min(100, parseInt(metadata.score, 10) || 0));
        const correctAnswers = Math.max(0, Math.min(30, parseInt(metadata.correctAnswers, 10) || 0));
        // Server formula: 10 XP per correct question + 25 participation XP (max 150)
        earnedXp = Math.min(150, (correctAnswers * 10) + (score === 100 ? 50 : 25));
        break;
      }

      case 'daily_challenge': {
        // Daily challenge can only be completed once per day
        const dayChallengeKey = `${today}_quest_${activityId}`;
        if (student.activityLog.includes(dayChallengeKey)) {
          return { success: true, earnedXp: 0, totalXp: student.xp, level: student.level, alreadyCompleted: true };
        }
        earnedXp = Math.min(75, Math.max(25, parseInt(metadata.xp, 10) || 40));
        student.activityLog.push(dayChallengeKey);
        break;
      }

      case 'flashcard_mastery': {
        const cardKey = `card_${activityId}`;
        if (student.activityLog.includes(cardKey)) {
          return { success: true, earnedXp: 0, totalXp: student.xp, level: student.level, alreadyCompleted: true };
        }
        earnedXp = 10;
        student.activityLog.push(cardKey);
        break;
      }

      case 'tutor_inquiry': {
        // Cap tutor inquiries to 5 rewards per day
        const todayTutorKey = `${today}_tutor_count`;
        const count = student.activityLog.filter(k => k.startsWith(todayTutorKey)).length;
        if (count >= 5) {
          return { success: true, earnedXp: 0, totalXp: student.xp, level: student.level, dailyCapReached: true };
        }
        earnedXp = 15;
        student.activityLog.push(`${todayTutorKey}_${count + 1}`);
        break;
      }

      default:
        throw new Error(`Unsupported activity type: ${activityType}`);
    }

    if (earnedXp > 0) {
      student.activityLog.push(uniqueActivityKey);
      // Keep activityLog bounded
      if (student.activityLog.length > 500) {
        student.activityLog = student.activityLog.slice(-400);
      }

      student.xp += earnedXp;
      student.level = Math.floor(student.xp / 250) + 1;

      // Update daily XP
      student.dailyXp = student.dailyXp || {};
      student.dailyXp[today] = (student.dailyXp[today] || 0) + earnedXp;

      // Update weekly XP
      student.weeklyXp = student.weeklyXp || {};
      student.weeklyXp[thisWeek] = (student.weeklyXp[thisWeek] || 0) + earnedXp;

      student.lastActiveAt = new Date().toISOString();
      this.save();
    }

    return {
      success: true,
      earnedXp,
      totalXp: student.xp,
      level: student.level,
      dailyXpToday: student.dailyXp[today] || 0,
      weeklyXpThisWeek: student.weeklyXp[thisWeek] || 0
    };
  }

  getLeaderboard({ period = 'all', currentStudentId = null, limit = 50 }) {
    const today = getUtcDateKey();
    const thisWeek = getUtcWeekKey();

    const list = Array.from(this.students.values()).map(s => {
      let score = s.xp;
      if (period === 'daily') {
        score = (s.dailyXp && s.dailyXp[today]) || 0;
      } else if (period === 'weekly') {
        score = (s.weeklyXp && s.weeklyXp[thisWeek]) || 0;
      }

      return {
        studentId: s.studentId,
        displayName: s.displayName,
        avatar: s.avatar || '🚀',
        grade: s.grade || 'Scholar',
        xp: score,
        totalXp: s.xp,
        level: s.level,
        streak: s.streak,
        badgesCount: (s.badges || []).length,
        isCurrent: Boolean(currentStudentId && s.studentId === currentStudentId)
      };
    });

    // Sort descending by score, tiebreak by total XP then displayName
    list.sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      if (b.totalXp !== a.totalXp) return b.totalXp - a.totalXp;
      return a.displayName.localeCompare(b.displayName);
    });

    // Assign rank
    const ranked = list.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));

    // Find current student's position if outside the top limit
    let currentStudentEntry = null;
    if (currentStudentId) {
      currentStudentEntry = ranked.find(r => r.studentId === currentStudentId) || null;
    }

    const topList = ranked.slice(0, limit);

    return {
      period,
      totalParticipants: ranked.length,
      leaderboard: topList,
      currentStudent: currentStudentEntry,
      resetTimes: {
        dailyReset: '00:00 UTC',
        weeklyReset: 'Sunday Midnight UTC'
      }
    };
  }
}

export const leaderboardDb = new LeaderboardDatabase();

