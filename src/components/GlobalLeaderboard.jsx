import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Star, 
  Calendar, 
  Sparkles, 
  Clock, 
  ArrowRight,
  TrendingUp,
  RefreshCw,
  User,
  Medal,
  Award,
  Zap
} from 'lucide-react';
import { fetchGlobalLeaderboard, getStoredStudent } from '../services/studentService';

export default function GlobalLeaderboard({ onNavigateBack, onLaunchArena, onOpenProfile }) {
  const [period, setPeriod] = useState('all'); // 'daily' | 'weekly' | 'all'
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentStudentEntry, setCurrentStudentEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const currentLocalStudent = getStoredStudent();

  const loadLeaderboard = async (selectedPeriod = period) => {
    setLoading(true);
    const data = await fetchGlobalLeaderboard(selectedPeriod);
    setLeaderboardData(data);
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    // Check if current user is in the list
    if (currentLocalStudent && currentLocalStudent.studentId) {
      const match = data.find(item => item.id === currentLocalStudent.studentId);
      if (match) {
        setCurrentStudentEntry(match);
      } else {
        // Compute hypothetical position
        setCurrentStudentEntry({
          id: currentLocalStudent.studentId,
          displayName: currentLocalStudent.displayName || 'You',
          avatar: currentLocalStudent.avatar || '🚀',
          grade: currentLocalStudent.grade || 'Scholar',
          xp: currentLocalStudent.xp || 0,
          streak: currentLocalStudent.streak || 1,
          level: currentLocalStudent.level || 1,
          rank: '50+'
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLeaderboard(period);
  }, [period]);

  const top3 = leaderboardData.slice(0, 3);
  const restList = leaderboardData.slice(3);

  // Podium order: 2nd place (left), 1st place (center), 3rd place (right)
  const podiumOrder = [
    top3[1] ? { ...top3[1], place: 2, color: '#94a3b8', label: 'Silver' } : null,
    top3[0] ? { ...top3[0], place: 1, color: '#fbbf24', label: 'Gold' } : null,
    top3[2] ? { ...top3[2], place: 3, color: '#d97706', label: 'Bronze' } : null
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: 'clamp(20px, 4vw, 32px)',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border-glow)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }} className="badge-pill badge-gold">
              <Trophy size={14} />
              <span>Verified Academic Standings</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, margin: '4px 0 8px 0', letterSpacing: '-0.02em' }}>
              Global Student Leaderboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '580px', margin: 0 }}>
              Real-time educational achievements ranked by verified study XP, quiz arena mastery, and continuous daily learning streaks.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => loadLeaderboard(period)}
              className="btn-glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.85rem',
                minHeight: '40px',
                cursor: 'pointer'
              }}
              title="Refresh Leaderboard"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="btn-glow"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  fontSize: '0.85rem',
                  minHeight: '40px',
                  cursor: 'pointer'
                }}
              >
                <User size={14} />
                <span>My Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Time Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'daily', label: 'Daily (Today)', icon: Clock },
            { id: 'weekly', label: 'Weekly (This Week)', icon: Calendar },
            { id: 'all', label: 'All-Time Champions', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = period === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPeriod(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--border-glow)' : '1px solid transparent',
                  background: isActive ? 'rgba(139, 92, 246, 0.22)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <Icon size={14} color={isActive ? 'var(--accent-cyan)' : 'var(--text-dim)'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
          alignItems: 'end'
        }}>
          {podiumOrder.map((entry) => {
            if (!entry) return null;
            const isFirst = entry.place === 1;
            const isUser = currentLocalStudent?.studentId === entry.id;

            return (
              <div
                key={entry.id || entry.place}
                className="glass-panel"
                style={{
                  padding: isFirst ? '28px 20px' : '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: isFirst ? '2px solid rgba(251, 191, 36, 0.5)' : '1px solid var(--border-subtle)',
                  background: isFirst 
                    ? 'linear-gradient(180deg, rgba(251, 191, 36, 0.12) 0%, rgba(13, 10, 36, 0.9) 100%)' 
                    : 'var(--bg-glass)',
                  textAlign: 'center',
                  position: 'relative',
                  boxShadow: isFirst ? '0 0 24px rgba(251, 191, 36, 0.25)' : 'none',
                  order: entry.place === 1 ? 2 : entry.place === 2 ? 1 : 3
                }}
              >
                {/* Crown / Medal Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: entry.place === 1 ? '#fbbf24' : entry.place === 2 ? '#94a3b8' : '#d97706',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {entry.place === 1 ? <Crown size={12} /> : <Medal size={12} />}
                  <span>#{entry.place} {entry.label}</span>
                </div>

                {/* Avatar */}
                <div style={{
                  width: isFirst ? '72px' : '60px',
                  height: isFirst ? '72px' : '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isFirst ? '2.4rem' : '1.8rem',
                  margin: '8px 0 12px 0',
                  boxShadow: `0 0 16px ${entry.color}44`,
                  border: `2px solid ${entry.color}`
                }}>
                  {entry.avatar || '🎓'}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 4px 0' }}>
                  {entry.displayName}
                  {isUser && <span style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', marginLeft: '6px' }}>(You)</span>}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0 0 12px 0' }}>
                  {entry.grade || 'Scholar'}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Star size={14} />
                    <span>{entry.xp} XP</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fb7185', fontWeight: 600, fontSize: '0.85rem' }}>
                    <Flame size={14} />
                    <span>{entry.streak || 1}d</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Leaderboard Table / Card List */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Ranked Scholars ({leaderboardData.length} Active Students)
          </span>
          {lastUpdated && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Updated at {lastUpdated}
            </span>
          )}
        </div>

        {/* Current Student Highlight Row (if outside top 3) */}
        {currentStudentEntry && currentStudentEntry.rank > 3 && (
          <div style={{
            padding: '14px 20px',
            background: 'rgba(56, 189, 248, 0.12)',
            borderBottom: '2px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                #{currentStudentEntry.rank}
              </div>
              <div style={{ fontSize: '1.4rem' }}>{currentStudentEntry.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{currentStudentEntry.displayName}</span>
                  <span className="badge-pill badge-cyan" style={{ fontSize: '0.65rem' }}>Your Live Rank</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{currentStudentEntry.grade}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} /> {currentStudentEntry.xp} XP
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                  {currentStudentEntry.streak} day streak
                </span>
              </div>
            </div>
          </div>
        )}

        {/* List of Scholars */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {leaderboardData.map((student, idx) => {
            const rank = idx + 1;
            const isCurrentUser = currentLocalStudent?.studentId === student.id;

            return (
              <div
                key={student.id || idx}
                style={{
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  background: isCurrentUser ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                  <span style={{
                    width: '28px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: rank === 1 ? '#fbbf24' : rank === 2 ? '#94a3b8' : rank === 3 ? '#d97706' : 'var(--text-dim)',
                    flexShrink: 0
                  }}>
                    #{rank}
                  </span>

                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{student.avatar || '🎓'}</span>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontWeight: isCurrentUser ? 800 : 600,
                        fontSize: '0.95rem',
                        color: isCurrentUser ? 'var(--accent-cyan)' : '#ffffff',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {student.displayName}
                      </span>
                      {isCurrentUser && (
                        <span className="badge-pill badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                          You
                        </span>
                      )}
                      <span className="badge-pill badge-purple" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                        Lvl {student.level || 1}
                      </span>
                    </div>
                    <span style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.78rem',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {student.grade || 'Scholar'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <Star size={13} />
                      <span>{student.xp} XP</span>
                    </div>
                    <div style={{ color: '#fb7185', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
                      <Flame size={12} />
                      <span>{student.streak || 1}d</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer Call to Action */}
      <div style={{
        marginTop: '24px',
        padding: '20px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(56, 189, 248, 0.15))',
        border: '1px solid var(--border-glow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>Want to climb the ranks?</h4>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Complete chapters (+25 XP), finish Quiz Arena rounds (+50 XP), or study with Nova AI Tutor (+10 XP).
          </p>
        </div>
        {onLaunchArena && (
          <button
            onClick={onLaunchArena}
            className="btn-glow"
            style={{
              padding: '10px 18px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '44px'
            }}
          >
            <span>Play Quiz Arena</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
