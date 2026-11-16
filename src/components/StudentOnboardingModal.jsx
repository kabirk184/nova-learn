import React, { useState } from 'react';
import { Sparkles, User, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { registerStudentOnServer } from '../services/studentService';

const AVATAR_OPTIONS = [
  { emoji: '🚀', label: 'Explorer' },
  { emoji: '🌟', label: 'Scholar' },
  { emoji: '🧠', label: 'Thinker' },
  { emoji: '⚡', label: 'Innovator' },
  { emoji: '📚', label: 'Bookworm' },
  { emoji: '🎓', label: 'Graduate' },
  { emoji: '🌌', label: 'Cosmonaut' },
  { emoji: '🔬', label: 'Scientist' },
  { emoji: '🪐', label: 'Astronomer' },
  { emoji: '🦉', label: 'Sage' }
];

const GRADE_OPTIONS = [
  'BS Computer Science',
  'BS Physics & Astro',
  'BS Mathematics',
  'BS Psychology & Behaviour',
  'BS English Literature',
  'BS Urdu Adab',
  'BS Education & Pedagogy',
  'BS Economics',
  'BS Chemistry',
  'BS Biology & Life Sciences',
  'High School / Intermediate',
  'Independent Lifelong Learner'
];

export default function StudentOnboardingModal({ isOpen, onComplete, defaultName = '' }) {
  const [displayName, setDisplayName] = useState(defaultName || '');
  const [selectedAvatar, setSelectedAvatar] = useState('🚀');
  const [selectedGrade, setSelectedGrade] = useState('BS Computer Science');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const trimmed = displayName.trim();
    if (!trimmed || trimmed.length < 2) {
      setErrorMsg('Display name must be at least 2 characters.');
      return;
    }
    if (trimmed.length > 24) {
      setErrorMsg('Display name cannot exceed 24 characters.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const student = await registerStudentOnServer({
        displayName: trimmed,
        avatar: selectedAvatar,
        grade: selectedGrade
      });
      setLoading(false);
      if (onComplete) {
        onComplete(student);
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleGuestContinue = async () => {
    setLoading(true);
    try {
      const randomGuest = `Guest_${Math.floor(100 + Math.random() * 900)}`;
      const student = await registerStudentOnServer({
        displayName: randomGuest,
        avatar: '🚀',
        grade: 'Independent Lifelong Learner'
      });
      setLoading(false);
      if (onComplete) {
        onComplete(student);
      }
    } catch (err) {
      setLoading(false);
      if (onComplete) onComplete(null);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 4, 18, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '540px',
        width: '100%',
        padding: 'clamp(20px, 4vw, 32px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glow)',
        boxShadow: 'var(--glow-purple)',
        position: 'relative',
        maxHeight: '92vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glow-cyan)',
            marginBottom: '12px'
          }}>
            <Sparkles size={28} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', fontWeight: 800, margin: '0 0 6px 0' }}>
            Welcome to Nova Learn
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Set up your academic profile to track live achievements, rank on the student leaderboard, and preserve your study journey.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#fca5a5',
            fontSize: '0.85rem',
            marginBottom: '18px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Avatar Picker */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Choose Your Scholar Avatar
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              padding: '6px'
            }}>
              {AVATAR_OPTIONS.map((item) => {
                const isSelected = selectedAvatar === item.emoji;
                return (
                  <button
                    key={item.emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(item.emoji)}
                    aria-label={item.label}
                    style={{
                      height: '50px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      fontSize: '1.6rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-smooth)',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)'
                    }}
                  >
                    {item.emoji}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display Name Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Display Name / Student Nickname *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Bilal_Scholar, Sara_Astro"
                maxLength={24}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.75rem',
                color: 'var(--text-dim)'
              }}>
                {displayName.length}/24
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px', margin: '4px 0 0 0' }}>
              Visible on the public leaderboard. Clean and academic characters only.
            </p>
          </div>

          {/* Department / Grade Picker */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Department / Academic Track
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(15, 12, 38, 0.95)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              {GRADE_OPTIONS.map((grade) => (
                <option key={grade} value={grade} style={{ background: '#0e0b29', color: '#ffffff' }}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button
              type="submit"
              disabled={loading || !displayName.trim()}
              className="btn-glow"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: loading || !displayName.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !displayName.trim() ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minHeight: '46px'
              }}
            >
              {loading ? 'Creating Profile...' : (
                <>
                  <span>Begin Learning Journey</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleGuestContinue}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                padding: '8px',
                textAlign: 'center'
              }}
            >
              Skip for now (Continue with temporary Guest ID)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

