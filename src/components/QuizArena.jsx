import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  Filter,
  Flame,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { subjectsData } from '../data/subjects';
import { expandedQuizBank } from '../data/quizBank';
import { addXp, unlockBadge } from '../utils/storage';

export default function QuizArena({ onNavigateBack }) {
  // Setup Options
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjectsData[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [questionCount, setQuestionCount] = useState(5);
  const [isTimed, setIsTimed] = useState(true);
  const [timePerQuestion, setTimePerQuestion] = useState(30); // 30 seconds

  // Arena Runtime State
  const [quizState, setQuizState] = useState('setup'); // 'setup' | 'active' | 'results'
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qIdx]: selectedOptionIndex }
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  // Score & Review
  const [earnedXp, setEarnedXp] = useState(0);

  // Active Subject Reference
  const activeSubject = subjectsData.find(s => s.id === selectedSubjectId) || subjectsData[0];

  // Build questions bank for chosen subject
  const startQuiz = () => {
    // Collect questions from expanded quiz bank first, then fallback to subjectsData
    let pool = [];
    if (expandedQuizBank[selectedSubjectId] && expandedQuizBank[selectedSubjectId].length > 0) {
      pool = [...expandedQuizBank[selectedSubjectId]];
    } else if (activeSubject.quiz && activeSubject.quiz.questions) {
      pool = [...activeSubject.quiz.questions];
    }

    // Filter by difficulty if user selected a tier other than 'All'
    if (selectedDifficulty !== 'All') {
      const filtered = pool.filter(q => q.difficulty === selectedDifficulty);
      if (filtered.length > 0) pool = filtered;
    }

    // Shuffle pool for varied gameplay
    pool = [...pool].sort(() => 0.5 - Math.random());

    let finalQuestions = [];
    while (finalQuestions.length < questionCount && pool.length > 0) {
      finalQuestions = finalQuestions.concat(pool);
    }
    finalQuestions = finalQuestions.slice(0, questionCount);

    setCurrentQuestions(finalQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setSecondsLeft(timePerQuestion);
    setIsPaused(false);
    setQuizState('active');
  };

  // Timer Effect
  useEffect(() => {
    if (quizState !== 'active' || !isTimed || isPaused) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Time expired for current question, auto advance
          handleTimeExpire();
          return timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, isTimed, isPaused, currentIndex]);

  const handleTimeExpire = () => {
    // Move to next question or finish
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex((idx) => idx + 1);
      setSecondsLeft(timePerQuestion);
    } else {
      finishQuiz();
    }
  };

  const handleSelectAnswer = (optionIdx) => {
    if (userAnswers[currentIndex] !== undefined) return; // already answered
    setUserAnswers({ ...userAnswers, [currentIndex]: optionIdx });
  };

  const handleNext = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSecondsLeft(timePerQuestion);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizState('results');

    // Calculate score
    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        correctCount += 1;
      }
    });

    const calculatedXp = Math.round((correctCount / currentQuestions.length) * 120) + 30;
    setEarnedXp(calculatedXp);
    addXp(calculatedXp);

    if (correctCount === currentQuestions.length) {
      unlockBadge({
        id: 'arena_champion',
        title: 'Arena Champion',
        icon: '🏆',
        desc: `Achieved 100% precision in ${activeSubject.name} Arena`
      });
    }

    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const currentQ = currentQuestions[currentIndex];
  const isCurrentAnswered = userAnswers[currentIndex] !== undefined;

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '10px 0 40px 0' }}>
      {/* Top Breadcrumb & Return to Hub */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button
          onClick={onNavigateBack}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '8px 18px',
            color: 'var(--accent-cyan)',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Return to Main Hub
        </button>

        <span className="badge-pill badge-purple">
          Arena Mode • Real-time Scoring
        </span>
      </div>

      {/* =========================================================
          VIEW 1: ARENA SETUP & CUSTOMIZATION
          ========================================================= */}
      {quizState === 'setup' && (
        <div className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 36px)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="badge-pill badge-cyan" style={{ marginBottom: '8px' }}>
              Competitive Testing Arena
            </span>
            <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 900, marginBottom: '8px' }}>
              Quiz Arena Customizer
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.88rem, 1.8vw, 0.98rem)', maxWidth: '600px', margin: '0 auto' }}>
              Configure subject matter, question count, difficulty tier, and working timers to test your undergraduate knowledge.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {/* Subject Picker */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '10px' }}>
                1. Select Academic Subject
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(14, 11, 40, 0.95)',
                  border: '1px solid var(--border-glow)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  cursor: 'pointer',
                  minHeight: '46px'
                }}
              >
                {subjectsData.map((sub) => (
                  <option key={sub.id} value={sub.id} style={{ background: '#0e0c28', color: '#ffffff' }}>
                    {sub.icon} {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Count Picker */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-lavender)', marginBottom: '10px' }}>
                2. Question Count
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[3, 5, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    style={{
                      flex: 1,
                      padding: '11px',
                      borderRadius: 'var(--radius-md)',
                      background: questionCount === num ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
                      border: questionCount === num ? '1px solid var(--accent-lavender)' : '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontWeight: 700,
                      cursor: 'pointer',
                      minHeight: '46px'
                    }}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Mode: Timed vs Untimed */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '10px' }}>
                3. Timing Mode
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsTimed(true)}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: 'var(--radius-md)',
                    background: isTimed ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
                    border: isTimed ? '1px solid var(--accent-lavender)' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    minHeight: '46px'
                  }}
                >
                  Timed (30s)
                </button>
                <button
                  onClick={() => setIsTimed(false)}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: 'var(--radius-md)',
                    background: !isTimed ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
                    border: !isTimed ? '1px solid var(--accent-lavender)' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    minHeight: '46px'
                  }}
                >
                  Untimed Practice
                </button>
              </div>
            </div>

            {/* Difficulty Tier */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '10px' }}>
                4. Academic Difficulty Tier
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'Undergraduate', 'Higher Secondary'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    style={{
                      flex: 1,
                      padding: '11px 8px',
                      borderRadius: 'var(--radius-md)',
                      background: selectedDifficulty === diff ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedDifficulty === diff ? '1px solid var(--accent-lavender)' : '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      minHeight: '46px'
                    }}
                  >
                    {diff === 'Higher Secondary' ? 'Inter / A-Lvl' : diff === 'Undergraduate' ? 'University' : 'All Tiers'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={startQuiz}
              className="btn-cyan"
              style={{ padding: '14px 44px', fontSize: '1.05rem', letterSpacing: '0.04em', minHeight: '48px', width: 'clamp(240px, 80%, 340px)' }}
            >
              <span>Launch Quiz Arena</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW 2: ACTIVE QUESTION RUNTIME
          ========================================================= */}
      {quizState === 'active' && currentQ && (
        <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
          {/* Header Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <span className="badge-pill badge-cyan" style={{ marginBottom: '6px' }}>
                {activeSubject.name} • Arena Challenge
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Question {currentIndex + 1} of {currentQuestions.length}
              </h3>
            </div>

            {/* Timer & Pause Controls */}
            {isTimed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: secondsLeft <= 10 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                  border: secondsLeft <= 10 ? '1px solid #f43f5e' : '1px solid var(--border-cyan)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  color: secondsLeft <= 10 ? '#fda4af' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem'
                }}>
                  <Clock size={16} />
                  <span>{secondsLeft}s left</span>
                </div>

                <button
                  onClick={() => setIsPaused(!isPaused)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-full)',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem'
                  }}
                >
                  {isPaused ? <Play size={14} /> : <Pause size={14} />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', marginBottom: '28px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Question Text */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.5 }}>
              {currentQ.questionEn}
            </h2>
            {/* Show Urdu Question if Urdu subject is explicitly being tested */}
            {activeSubject.id === 'urdu' && currentQ.questionUrdu && (
              <p className="urdu-text" style={{ fontSize: '1.15rem', color: 'var(--accent-lavender)', marginTop: '8px' }}>
                {currentQ.questionUrdu}
              </p>
            )}
          </div>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = userAnswers[currentIndex] === idx;
              let bg = 'rgba(255, 255, 255, 0.03)';
              let border = '1px solid var(--border-subtle)';
              let color = 'var(--text-main)';

              if (isCurrentAnswered) {
                if (idx === currentQ.correct) {
                  bg = 'rgba(16, 185, 129, 0.2)';
                  border = '1px solid #10b981';
                  color = '#a7f3d0';
                } else if (isSelected) {
                  bg = 'rgba(244, 63, 94, 0.2)';
                  border = '1px solid #f43f5e';
                  color = '#fecdd3';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isCurrentAnswered}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: bg,
                    border: border,
                    color: color,
                    fontSize: '0.98rem',
                    textAlign: 'left',
                    fontWeight: 500,
                    cursor: isCurrentAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <span>{opt}</span>
                  {isCurrentAnswered && idx === currentQ.correct && <CheckCircle2 size={18} color="#10b981" />}
                  {isCurrentAnswered && isSelected && idx !== currentQ.correct && <XCircle size={18} color="#f43f5e" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout */}
          {isCurrentAnswered && (
            <div style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid var(--border-cyan)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 18px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>
                <HelpCircle size={16} />
                <span>Concept & Solution Breakdown</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#e2e8f0', marginTop: '6px', lineHeight: 1.5 }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Advance Button */}
          {isCurrentAnswered && (
            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              <span>{currentIndex + 1 < currentQuestions.length ? 'Next Question' : 'Complete Arena & Calculate Score'}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}

      {/* =========================================================
          VIEW 3: RESULTS & SCORE BREAKDOWN
          ========================================================= */}
      {quizState === 'results' && (
        <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: 'var(--glow-badge)'
          }}>
            <Award size={42} color="#ffffff" />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>
            Arena Run Completed!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px' }}>
            Subject: <strong style={{ color: '#ffffff' }}>{activeSubject.name}</strong> • Mode: <strong style={{ color: '#ffffff' }}>{isTimed ? 'Timed Challenge' : 'Untimed'}</strong>
          </p>

          {/* Score Calculation Display */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '32px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 28px'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Accuracy Score</span>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
                {Object.keys(userAnswers).filter(idx => userAnswers[idx] === currentQuestions[idx]?.correct).length} / {currentQuestions.length}
              </h3>
            </div>

            <div style={{
              background: 'rgba(250, 204, 21, 0.12)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 28px'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700 }}>XP Rewarded</span>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '4px' }}>
                +{earnedXp} XP
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button
              onClick={() => setQuizState('setup')}
              className="btn-secondary"
            >
              <RotateCcw size={16} />
              <span>Configure New Run</span>
            </button>
            <button
              onClick={onNavigateBack}
              className="btn-cyan"
            >
              <span>Return to Hub</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
