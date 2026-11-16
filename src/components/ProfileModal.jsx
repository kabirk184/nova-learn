import React, { useState } from 'react';
import { Award, Flame, Star, Trophy, BookCheck, ShieldCheck, User, Calendar } from 'lucide-react';
import { saveProgress } from '../utils/storage';

export default function ProfileModal({ progress, onClose }) {
  const [activeTab, setActiveTab] = useState('badges'); // 'badges' | 'leaderboard'

  const leaderboardSample = [
    { rank: 1, name: 'Ayesha Siddiqui', xp: 2150, streak: 12, avatar: '🌟', badge: 'Galaxy Master' },
    { rank: 2, name: progress.name || 'Talha Khan', xp: progress.xp || 450, streak: progress.streak || 3, avatar: '🚀', badge: 'Curious Scholar', isCurrent: true },
    { rank: 3, name: 'Hamza Farooq', xp: 390, streak: 4, avatar: '⚡', badge: 'Cosmos Explorer' },
    { rank: 4, name: 'Fatima Zahra', xp: 340, streak: 2, avatar: '📚', badge: 'Adab Pioneer' },
    { rank: 5, name: 'Zubair Ahmed', xp: 280, streak: 1, avatar: '🔬', badge: 'Logic Novice' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 4, 18, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '680px',
        width: '100%',
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glow)',
        boxShadow: 'var(--glow-purple)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.4rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Profile Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.2rem',
            boxShadow: 'var(--glow-cyan)'
          }}>
            {progress.avatar || '🚀'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{progress.name}</h2>
              <span className="badge-pill badge-gold">Level {progress.level || 1}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{progress.grade}</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-lavender)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} color="var(--accent-gold)" /> {progress.xp} Total XP
              </span>
              <span style={{ fontSize: '0.85rem', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={14} fill="#fb7185" /> {progress.streak} Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('badges')}
            style={{
              background: activeTab === 'badges' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
              border: activeTab === 'badges' ? '1px solid var(--border-glow)' : 'none',
              color: activeTab === 'badges' ? '#ffffff' : 'var(--text-muted)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Award size={16} color="var(--accent-gold)" />
            <span>Unlocked Badges ({progress.badges?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            style={{
              background: activeTab === 'leaderboard' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              border: activeTab === 'leaderboard' ? '1px solid var(--border-cyan)' : 'none',
              color: activeTab === 'leaderboard' ? '#ffffff' : 'var(--text-muted)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Trophy size={16} color="var(--accent-cyan)" />
            <span>Class Leaderboard</span>
          </button>
        </div>

        {/* Badges View */}
        {activeTab === 'badges' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', maxHeight: '320px', overflowY: 'auto' }}>
            {progress.badges?.map((badge) => (
              <div
                key={badge.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{badge.icon}</div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>{badge.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{badge.desc}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginTop: '6px' }}>
                  Awarded: {badge.date}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard View */}
        {activeTab === 'leaderboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {leaderboardSample.map((user) => (
              <div
                key={user.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: user.isCurrent ? 'rgba(139, 92, 246, 0.22)' : 'rgba(255, 255, 255, 0.02)',
                  border: user.isCurrent ? '1px solid var(--border-glow)' : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '24px',
                    fontWeight: 800,
                    color: user.rank === 1 ? 'var(--accent-gold)' : user.rank === 2 ? 'var(--accent-lavender)' : 'var(--text-dim)',
                    fontSize: '1rem'
                  }}>
                    #{user.rank}
                  </span>
                  <span style={{ fontSize: '1.3rem' }}>{user.avatar}</span>
                  <div>
                    <h5 style={{ fontSize: '0.92rem', fontWeight: user.isCurrent ? 700 : 500 }}>
                      {user.name} {user.isCurrent && '(You)'}
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{user.badge}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#fb7185', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Flame size={13} fill="#fb7185" /> {user.streak}d
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {user.xp} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
