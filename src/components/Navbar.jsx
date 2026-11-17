import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Orbit,
  BookOpen,
  Bot,
  Flame,
  Award,
  CheckCircle2,
  FileText,
  Menu,
  X,
  Trophy
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, progress, onOpenProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { id: 'home',        label: 'Home Hub',       icon: Sparkles,     path: '/' },
    { id: 'subjects',    label: 'Subjects',        icon: BookOpen,     path: '/subjects' },
    { id: 'arena',       label: 'Quiz Arena',      icon: Award,        path: '/quiz-arena' },
    { id: 'prep',        label: 'Study Prep',      icon: CheckCircle2, path: '/study-prep' },
    { id: 'library',     label: 'Taleem Library',  icon: FileText,     path: '/library' },
    { id: 'tutor',       label: 'Nova Tutor',      icon: Bot,          path: '/tutor',       badge: 'AI Mode' },
    { id: 'cosmos',      label: 'Cosmos',          icon: Orbit,        path: '/cosmos',      badge: '3D Space' },
    { id: 'leaderboard', label: 'Leaderboard',     icon: Trophy,       path: '/leaderboard' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(8, 7, 26, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 clamp(12px, 3vw, 24px)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Identity */}
        <div 
          onClick={() => handleNavClick('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', zIndex: 101 }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(139, 92, 246, 0.5)',
            flexShrink: 0
          }}>
            <Orbit size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>NOVA</span>
              <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 800, color: 'var(--accent-cyan)' }}>LEARN</span>
            </div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Education Suite
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links — NavLink for automatic active state */}
        <nav className="desktop-nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.id}
                to={link.path}
                end={link.path === '/'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--border-cyan)' : '1px solid transparent',
                  background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  minHeight: '40px',
                  textDecoration: 'none',
                })}
              >
                <Icon size={16} />
                <span>{link.label}</span>
                {link.badge && (
                  <span style={{
                    fontSize: '0.64rem',
                    padding: '1px 5px',
                    borderRadius: '8px',
                    background: link.id === 'cosmos' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(168, 85, 247, 0.25)',
                    color: link.id === 'cosmos' ? '#7dd3fc' : '#e9d5ff',
                    fontWeight: 700
                  }}>
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Student Gamification Status & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Streak Counter */}
          <div 
            title="Daily Learning Streak"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              padding: '5px 10px',
              borderRadius: 'var(--radius-full)',
              color: '#fb7185',
              fontSize: '0.8rem',
              fontWeight: 700,
              minHeight: '36px'
            }}
          >
            <Flame size={15} fill="#fb7185" />
            <span>{progress?.streak || 3}d</span>
          </div>

          {/* Level & XP Pill */}
          <div 
            onClick={onOpenProfile}
            title="Click to view full achievements & stats"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid var(--border-subtle)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              minHeight: '36px'
            }}
          >
            <Award size={15} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-lavender)' }}>
              Lvl {progress?.level || 1}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>•</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
              {progress?.xp || 0} XP
            </span>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Navigation
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              8 Active Hubs
            </span>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  minHeight: '48px',
                  outline: 'none',
                  boxShadow: 'none',
                  textDecoration: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} color={isActive ? 'var(--accent-cyan)' : 'var(--accent-lavender)'} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="badge-pill badge-purple" style={{ fontSize: '0.72rem' }}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
              className="btn-primary"
              style={{ width: '100%', minHeight: '46px', gap: '8px' }}
            >
              <span>{progress?.avatar || '🚀'} View Student Achievements</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

