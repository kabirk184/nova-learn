import React, { useState } from 'react';
import { Award, Flame, Star, Trophy, BookCheck, ShieldCheck, User, Calendar, Edit3, Check, X } from 'lucide-react';
import { getStoredStudent, updateStudentOnServer } from '../services/studentService';

const AVATAR_LIST = ['🚀', '🌟', '🧠', '⚡', '📚', '🎓', '🌌', '🔬', '🪐', '🦉'];

export default function ProfileModal({ progress, onClose, onNavigateToLeaderboard }) {
  const [activeTab, setActiveTab] = useState('badges'); // 'badges' | 'edit'
  const [editing, setEditing] = useState(false);
  const currentStudent = getStoredStudent() || {};
  
  const [editName, setEditName] = useState(currentStudent.displayName || progress.name || 'Scholar');
  const [editAvatar, setEditAvatar] = useState(currentStudent.avatar || progress.avatar || '🚀');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    if (!editName.trim() || editName.trim().length < 2) {
      setMsg('Name must be at least 2 characters.');
      return;
    }
    setSaving(true);
    setMsg('');
    try {
      await updateStudentOnServer({
        displayName: editName.trim(),
        avatar: editAvatar
      });
      setSaving(false);
      setEditing(false);
      setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setSaving(false);
      setMsg(err.message || 'Update failed.');
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
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '680px',
        width: '100%',
        padding: 'clamp(20px, 4vw, 32px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glow)',
        boxShadow: 'var(--glow-purple)',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Profile Modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.4rem',
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1
          }}
        >
          ✕
        </button>

        {/* Profile Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.2rem',
            boxShadow: 'var(--glow-cyan)',
            flexShrink: 0
          }}>
            {currentStudent.avatar || progress.avatar || '🚀'}
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                {currentStudent.displayName || progress.name}
              </h2>
              <span className="badge-pill badge-gold">Level {currentStudent.level || progress.level || 1}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 8px 0' }}>
              {currentStudent.grade || progress.grade || 'Scholar'}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-lavender)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} color="var(--accent-gold)" /> {currentStudent.xp || progress.xp || 0} Total XP
              </span>
              <span style={{ fontSize: '0.85rem', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={14} fill="#fb7185" /> {currentStudent.streak || progress.streak || 1} Day Streak
              </span>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="btn-glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              minHeight: '40px'
            }}
          >
            <Edit3 size={14} />
            <span>{editing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {msg && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid var(--border-cyan)',
            color: 'var(--accent-cyan)',
            fontSize: '0.85rem',
            marginBottom: '18px'
          }}>
            {msg}
          </div>
        )}

        {/* Inline Edit Form */}
        {editing && (
          <form onSubmit={handleSaveProfile} className="glass-panel" style={{ padding: '16px', marginBottom: '20px', border: '1px solid var(--border-glow)' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 700 }}>Customize Scholar Profile</h4>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Pick Avatar</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {AVATAR_LIST.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setEditAvatar(emoji)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: editAvatar === emoji ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: editAvatar === emoji ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      fontSize: '1.4rem',
                      cursor: 'pointer'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Display Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={24}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={saving || !editName.trim()}
                className="btn-glow"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Check size={14} />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn-glass"
                style={{ padding: '8px 14px', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

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
          {onNavigateToLeaderboard && (
            <button
              onClick={() => {
                onClose();
                onNavigateToLeaderboard();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-cyan)',
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
              <span>Open Global Leaderboard →</span>
            </button>
          )}
        </div>

        {/* Badges View */}
        {activeTab === 'badges' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', maxHeight: '340px', overflowY: 'auto' }}>
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
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{badge.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{badge.desc}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginTop: '6px' }}>
                  Awarded: {badge.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
