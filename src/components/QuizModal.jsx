import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle,
  Sparkles 
} from 'lucide-react';
import { addXp, unlockBadge } from '../utils/storage';
import { recordValidatedActivity } from '../services/studentService';

export default function QuizModal({ quiz, subjectName, onClose, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = quiz?.questions?.[currentIndex] || {};
  const totalQ = quiz?.questions?.length || 0;

  const getQuestionText = (q) => q?.questionEn || q?.question || 'Question';
  const getCorrectIndex = (q) => (q?.correct !== undefined ? q.correct : (q?.correctIndex !== undefined ? q.correctIndex : 0));
  const optionsList = Array.isArray(currentQ?.options) ? currentQ.options : [];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === getCorrectIndex(currentQ);
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQ) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz Finished!
      setQuizFinished(true);
      const earnedXp = Math.round((score / totalQ) * 100) + 25;
      addXp(earnedXp);

      // Record in backend student database
      recordValidatedActivity({
        activityType: 'quiz_complete',
        activityId: `module_quiz_${subjectName}_${Date.now()}`,
        metadata: { score, total: totalQ, subjectName }
      }).catch(err => console.warn('Quiz modal activity record notice:', err.message));

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }

      if (onComplete) {
        onComplete(score, totalQ, earnedXp);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 4, 18, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '640px',
        width: '100%',
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glow)',
        boxShadow: 'var(--glow-purple)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <span className="badge-pill badge-purple" style={{ marginBottom: '8px' }}>
              {subjectName} • Quiz Arena
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{quiz.title}</h2>
            {subjectName?.toLowerCase().includes('urdu') && quiz.urduTitle && (
              <p className="urdu-text" style={{ fontSize: '1rem', color: 'var(--accent-lavender)', marginTop: '2px' }}>
                {quiz.urduTitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.4rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {!quizFinished ? (
          <div>
            {/* Progress indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
              <span>Question {currentIndex + 1} of {totalQ}</span>
              <span>Score: {score}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '24px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentIndex + 1) / totalQ) * 100}%`,
                background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Question Text */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>
                {getQuestionText(currentQ)}
              </p>
              {subjectName?.toLowerCase().includes('urdu') && currentQ.questionUrdu && (
                <p className="urdu-text" style={{ fontSize: '1.05rem', color: 'var(--accent-lavender)' }}>
                  {currentQ.questionUrdu}
                </p>
              )}
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {optionsList.map((option, idx) => {
                let border = '1px solid var(--border-subtle)';
                let bg = 'var(--bg-glass)';
                let textColor = 'var(--text-main)';
                const correctIdx = getCorrectIndex(currentQ);

                if (isAnswered) {
                  if (idx === correctIdx) {
                    border = '1px solid #10b981';
                    bg = 'rgba(16, 185, 129, 0.18)';
                    textColor = '#a7f3d0';
                  } else if (idx === selectedOption) {
                    border = '1px solid #f43f5e';
                    bg = 'rgba(244, 63, 94, 0.18)';
                    textColor = '#fecdd3';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: bg,
                      border: border,
                      color: textColor,
                      fontSize: '0.96rem',
                      fontWeight: 500,
                      textAlign: 'left',
                      cursor: isAnswered ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === correctIdx && (
                      <CheckCircle2 size={18} color="#10b981" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== correctIdx && (
                      <XCircle size={18} color="#f43f5e" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswered && (
              <div style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid var(--border-cyan)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <HelpCircle size={15} />
                  <span>Explanation & Context</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#e2e8f0', marginTop: '4px' }}>
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next / Proceed Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                <span>{currentIndex + 1 < totalQ ? 'Next Question' : 'View Quiz Results'}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-gold))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: 'var(--glow-badge)'
            }}>
              <Award size={36} color="#ffffff" />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>Quiz Completed!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
              You answered <strong style={{ color: '#ffffff' }}>{score}</strong> out of <strong style={{ color: '#ffffff' }}>{totalQ}</strong> correctly.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(250, 204, 21, 0.12)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '28px'
            }}>
              <Sparkles size={20} color="var(--accent-gold)" />
              <span style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '1.05rem' }}>
                +{Math.round((score / totalQ) * 100) + 25} XP Earned
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setScore(0);
                  setQuizFinished(false);
                }}
                className="btn-secondary"
              >
                <RotateCcw size={16} />
                <span>Retake Quiz</span>
              </button>
              <button onClick={onClose} className="btn-cyan">
                <span>Continue Learning</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
