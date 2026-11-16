import fs from 'fs';
import path from 'path';

// Load lessons across all 15 subjects
import { psychologyLessons } from '../src/data/lessons/psychologyLessons.js';
import { educationLessons } from '../src/data/lessons/educationLessons.js';
import { mathLessons } from '../src/data/lessons/mathLessons.js';
import { englishLessons } from '../src/data/lessons/englishLessons.js';
import { urduLessons } from '../src/data/lessons/urduLessons.js';
import { economicsLessons } from '../src/data/lessons/economicsLessons.js';
import { literatureLessons } from '../src/data/lessons/literatureLessons.js';
import { csLessons } from '../src/data/lessons/csLessons.js';
import { historyLessons } from '../src/data/lessons/historyLessons.js';
import { geographyLessons } from '../src/data/lessons/geographyLessons.js';
import { spaceLessons } from '../src/data/lessons/spaceLessons.js';
import { biologyLessons } from '../src/data/lessons/biologyLessons.js';
import { physicsLessons } from '../src/data/lessons/physicsLessons.js';
import { chemistryLessons } from '../src/data/lessons/chemistryLessons.js';
import { sociologyLessons } from '../src/data/lessons/sociologyLessons.js';

export const allLessonModules = [
  ...psychologyLessons.map(l => ({ ...l, subject: 'Psychology' })),
  ...educationLessons.map(l => ({ ...l, subject: 'Education' })),
  ...mathLessons.map(l => ({ ...l, subject: 'Mathematics' })),
  ...englishLessons.map(l => ({ ...l, subject: 'English & Grammar' })),
  ...urduLessons.map(l => ({ ...l, subject: 'Urdu Literature & Linguistics' })),
  ...economicsLessons.map(l => ({ ...l, subject: 'Economics' })),
  ...literatureLessons.map(l => ({ ...l, subject: 'Literature & Novels' })),
  ...csLessons.map(l => ({ ...l, subject: 'Computer Science' })),
  ...historyLessons.map(l => ({ ...l, subject: 'History' })),
  ...geographyLessons.map(l => ({ ...l, subject: 'Geography' })),
  ...spaceLessons.map(l => ({ ...l, subject: 'Space & Astronomy' })),
  ...biologyLessons.map(l => ({ ...l, subject: 'Biology' })),
  ...physicsLessons.map(l => ({ ...l, subject: 'Physics' })),
  ...chemistryLessons.map(l => ({ ...l, subject: 'Chemistry' })),
  ...sociologyLessons.map(l => ({ ...l, subject: 'Sociology & Criminology' }))
];

const STOP_WORDS = new Set([
  'what', 'is', 'the', 'of', 'and', 'a', 'in', 'to', 'for', 'with', 'about', 'on', 'that', 'this',
  'between', 'give', 'me', 'explain', 'detail', 'detailed', 'create', 'show', 'working', 'step', 'by',
  'how', 'can', 'you', 'are', 'from', 'tell'
]);

/**
 * Enhanced semantic keyword scoring for lesson retrieval
 */
export function findRelevantLessons(query, currentSubject = null, limit = 3) {
  if (!query) return [];
  
  // Clean tokens
  const qTokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));

  if (qTokens.length === 0) return [];

  const scored = allLessonModules.map(lesson => {
    let score = 0;
    const titleLower = lesson.title.toLowerCase();
    const contentLower = (lesson.contentEn || lesson.content || '').toLowerCase();
    const summaryLower = (lesson.summaryEn || lesson.summary || '').toLowerCase();
    const subjectLower = lesson.subject.toLowerCase();

    // Subject bias if provided
    if (currentSubject && subjectLower.includes(currentSubject.toLowerCase())) {
      score += 15;
    }

    qTokens.forEach(token => {
      // Exact word boundary matches in title
      if (titleLower.includes(token)) {
        score += 20;
      }
      if (summaryLower.includes(token)) {
        score += 8;
      }
      if (contentLower.includes(token)) {
        score += 3;
      }
      if (subjectLower.includes(token)) {
        score += 6;
      }
    });

    return { lesson, score };
  });

  return scored
    .filter(item => item.score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.lesson);
}
