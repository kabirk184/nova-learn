import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Star, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Lock,
  Compass,
  Zap,
  BarChart2,
  Calendar
} from 'lucide-react';
import { ALL_AVAILABLE_BADGES, completeDailyChallenge } from '../utils/storage';

export default function ProgressDashboard({ progress, onNavigateBack, onLaunchArena, onNavigateTab }) {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'challenges' | 'badges' | 'leaderboard'

  // Dynamic Leaderboard dynamically sorting student by current XP
  const basePeers = [
    { id: 'p1', name: 'Ayesha Siddiqui', xp: 2150, streak: 12, avatar: '🌟', badge: 'Galaxy Master', department: 'BS Physics' },
    { id: 'p2', name: 'Hamza Farooq', xp: 680, streak: 5, avatar: '⚡', badge: 'Cosmos Explorer', department: 'BS CS' },
    { id: 'p3', name: 'Fatima Zahra', xp: 480, streak: 4, avatar: '📚', badge: 'Urdu Scholar', department: 'BS Urdu' },
    { id: 'p4', name: 'Zubair Ahmed', xp: 320, streak: 2, avatar: '🔬', badge: 'Logic Novice', department: 'BS Psychology' },
    { id: 'p5', name: 'Maryam Noor', xp: 190, streak: 1, avatar: '🎨', badge: 'Freshman Learner', department: 'BS Education' }
  ];

  // Insert current user and sort dynamically
  const currentUserEntry = {
    id: 'user_current',
    name: progress.name || 'Talha Khan',
    xp: progress.xp || 450,
    streak: progress.streak || 3,
    avatar: progress.avatar || '🚀',
    badge: `Level ${progress.level || 1} Scholar`,
    department: progress.grade || 'BS Education',
    isCurrent: true
  };

  const dynamicLeaderboard = [...basePeers, currentUserEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const currentLevel = progress.level || 1;
  const currentXp = progress.xp || 0;
  const nextLevelXp = currentLevel * 250;
  const xpInCurrentLevel = currentXp % 250;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / 250) * 100));

  const unlockedBadgeIds = new Set((progress.badges || []).map(b => b.id));

  const handleClaimChallenge = (chId) => {
    const res = completeDailyChallenge(chId);
    if (res.success) {
      alert(`🎉 Daily quest completed! You were awarded +${res.xp} XP!`);
    }
  };

  const dailyQuests = progress.dailyQuests || [];
  const completedQuestsCount = dailyQuests.filter(q => q.completed).length;

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '10px 0 40px 0' }}>
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
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

        <span className="badge-pill badge-gold">
          Academic Analytics & Gamified Progress
        </span>
      </div>

      {/* Main Workspace Frame */}
      <div className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 36px)', borderRadius: 'var(--radius-lg)' }}>
        {/* Header Summary */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              boxShadow: 'var(--glow-cyan)',
              flexShrink: 0
            }}>
              {progress.avatar || '🚀'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.9rem)', fontWeight: 900 }}>{progress.name}</h1>
                <span className="badge-pill badge-gold">Level {currentLevel} Scholar</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
                {progress.grade} • Registered University Learner
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                  <Star size={15} color="var(--accent-gold)" /> {currentXp} Lifetime XP
                </span>
                <span style={{ fontSize: '0.88rem', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                  <Flame size={15} fill="#fb7185" /> {progress.streak} Day Active Streak
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                  <Award size={15} color="var(--accent-cyan)" /> {progress.badges?.length || 0} Badges Earned
                </span>
              </div>
            </div>
          </div>

          <button onClick={onLaunchArena} className="btn-cyan" style={{ minHeight: '44px' }}>
            <span>Play Quiz Arena</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Level Progression Progress Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '20px 24px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-lavender)' }}>
              Progress to Level {currentLevel + 1} Scholar
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {xpInCurrentLevel} / 250 XP ({levelProgressPercent}%)
            </span>
          </div>
          <div style={{ height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${levelProgressPercent}%`,
              background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Workspace Subtabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveSubTab('overview')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              background: activeSubTab === 'overview' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
              border: activeSubTab === 'overview' ? '1px solid var(--border-glow)' : '1px solid transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <BarChart2 size={16} />
            <span>Overview & Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveSubTab('challenges')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              background: activeSubTab === 'challenges' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
              border: activeSubTab === 'challenges' ? '1px solid var(--border-glow)' : '1px solid transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Flame size={16} fill={activeSubTab === 'challenges' ? '#fb7185' : 'none'} color="#fb7185" />
            <span>Daily Challenges ({completedQuestsCount}/{dailyQuests.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('badges')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              background: activeSubTab === 'badges' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
              border: activeSubTab === 'badges' ? '1px solid var(--border-glow)' : '1px solid transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Award size={16} color="var(--accent-gold)" />
            <span>Achievement Badges ({progress.badges?.length || 0}/{ALL_AVAILABLE_BADGES.length})</span>
          </button>
        </div>

        {/* =========================================================
            VIEW 1: OVERVIEW & CLASS LEADERBOARD
            ========================================================= */}
        {activeSubTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Left: Quick Snapshot Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={20} color="var(--accent-cyan)" />
                <span>Academic Mastery Summary</span>
              </h3>

              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Daily Quests</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '4px' }}>
                      {completedQuestsCount} / {dailyQuests.length}
                    </h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Current Rank</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '4px' }}>
                      #{dynamicLeaderboard.find(p => p.isCurrent)?.rank || 1}
                    </h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Completed Topics</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a7f3d0', marginTop: '4px' }}>
                      {progress.completedLessons?.length || 3}
                    </h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Active Streak</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fb7185', marginTop: '4px' }}>
                      {progress.streak || 3} Days
                    </h4>
                  </div>
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '8px' }}>Recent Unlocked Badges</h4>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {progress.badges?.slice(0, 3).map((b) => (
                      <span key={b.id} className="badge-pill badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span>{b.icon}</span>
                        <span>{b.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Dynamic Peer Leaderboard */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={20} color="var(--accent-gold)" />
                  <span>University Class Leaderboard</span>
                </h3>
                {onNavigateTab ? (
                  <button
                    onClick={() => onNavigateTab('leaderboard')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Full Leaderboard</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <span className="badge-pill badge-cyan" style={{ fontSize: '0.7rem' }}>Live Standings</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {dynamicLeaderboard.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: user.isCurrent ? 'rgba(139, 92, 246, 0.22)' : 'rgba(255, 255, 255, 0.02)',
                      border: user.isCurrent ? '1px solid var(--border-glow)' : '1px solid transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontWeight: 900,
                        color: user.rank === 1 ? 'var(--accent-gold)' : user.rank === 2 ? '#e2e8f0' : user.rank === 3 ? '#d97706' : 'var(--text-dim)',
                        fontSize: '0.98rem',
                        width: '24px'
                      }}>
                        #{user.rank}
                      </span>
                      <span style={{ fontSize: '1.3rem' }}>{user.avatar}</span>
                      <div>
                        <h5 style={{ fontSize: '0.92rem', fontWeight: user.isCurrent ? 800 : 600, color: user.isCurrent ? '#ffffff' : '#e2e8f0' }}>
                          {user.name} {user.isCurrent && <span style={{ color: 'var(--accent-cyan)' }}>(You)</span>}
                        </h5>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{user.department}</span>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                      {user.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            VIEW 2: DAILY CHALLENGES / QUESTS
            ========================================================= */}
        {activeSubTab === 'challenges' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
                Daily Academic Quests
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Complete daily study objectives to maintain your streak and earn up to 215 XP per day.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 24px',
                    borderRadius: 'var(--radius-md)',
                    background: quest.completed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: quest.completed ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border-subtle)',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: quest.completed ? '#10b981' : 'rgba(255, 255, 255, 0.06)',
                      border: quest.completed ? '1px solid #10b981' : '1px solid var(--border-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {quest.completed ? <CheckCircle2 size={20} color="#ffffff" /> : <Flame size={18} color="var(--accent-gold)" />}
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                        {quest.title}
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {quest.desc}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span className="badge-pill badge-gold" style={{ fontSize: '0.82rem', fontWeight: 800 }}>
                      +{quest.xp} XP
                    </span>

                    {!quest.completed ? (
                      <button
                        onClick={() => handleClaimChallenge(quest.id)}
                        className="btn-cyan"
                        style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                      >
                        Complete Quest
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={16} /> Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            VIEW 3: ALL ACHIEVEMENT BADGES CATALOG
            ========================================================= */}
        {activeSubTab === 'badges' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
                Scholar Achievements & Medals
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Unlocked badges demonstrate academic mastery across diverse higher education faculties.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {ALL_AVAILABLE_BADGES.map((b) => {
                const isUnlocked = unlockedBadgeIds.has(b.id);
                const userBadge = progress.badges?.find(x => x.id === b.id);

                return (
                  <div
                    key={b.id}
                    style={{
                      background: isUnlocked ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                      border: isUnlocked ? '1px solid var(--border-glow)' : '1px dashed rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                      textAlign: 'center',
                      opacity: isUnlocked ? 1 : 0.65,
                      boxShadow: isUnlocked ? 'var(--glow-purple)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '10px', filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>
                      {b.icon}
                    </div>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: isUnlocked ? '#ffffff' : 'var(--text-dim)' }}>
                        {b.title}
                      </h4>
                      {!isUnlocked && <Lock size={13} color="var(--text-dim)" />}
                    </div>

                    <span className="badge-pill badge-purple" style={{ fontSize: '0.68rem', display: 'inline-block', marginBottom: '8px' }}>
                      {b.category}
                    </span>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {b.desc}
                    </p>

                    <span style={{ fontSize: '0.72rem', color: isUnlocked ? 'var(--accent-cyan)' : 'var(--text-dim)', display: 'block', marginTop: '10px', fontWeight: 600 }}>
                      {isUnlocked ? `Unlocked: ${userBadge?.date || 'Earned'}` : 'Locked (Complete requirement)'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
