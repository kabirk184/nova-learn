import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CosmosViewer from './components/CosmosViewer';
import QuizModal from './components/QuizModal';
import { StudyTutor } from './components/StudyTutor';
import ProfileModal from './components/ProfileModal';
import { subjectsData } from './data/subjects';
import { celestialBodies, cosmicArticles } from './data/cosmosData';
import { getProgress, addXp } from './utils/storage';
import {
  Sparkles,
  Orbit,
  BookOpen,
  Bot,
  Flame,
  Award,
  CheckCircle,
  ArrowRight,
  Clock,
  Languages,
  FileText,
  Compass,
  Trophy,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

import CosmosHomepage from './components/CosmosHomepage';
import QuizArena from './components/QuizArena';
import StudyPrep from './components/StudyPrep';
import TaleemLibrary from './components/TaleemLibrary';
import TutorWorkspace from './components/TutorWorkspace';
import ProgressDashboard from './components/ProgressDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // Default to main hub!
  const [cosmosView, setCosmosView] = useState('portal'); // 'portal' | 'explorer'
  const [progress, setProgress] = useState(getProgress());
  const [activeSubject, setActiveSubject] = useState(subjectsData[0]);
  const [activeModule, setActiveModule] = useState(subjectsData[0].modules[0]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [langPreference, setLangPreference] = useState('bilingual'); // 'en' | 'urdu' | 'bilingual'
  const [tutorInquiry, setTutorInquiry] = useState(null);

  // Sync progress updates
  useEffect(() => {
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('nova_progress_updated', handleUpdate);
    return () => window.removeEventListener('nova_progress_updated', handleUpdate);
  }, []);

  const handleLaunchQuiz = (quiz, subjectName) => {
    setActiveQuiz({ quiz, subjectName });
  };

  // 8 Central Gateway Definitions
  const mainGateways = [
    {
      id: 'subjects',
      title: 'Explore Subjects',
      badge: '11 Academic Hubs',
      badgeColor: 'badge-purple',
      icon: BookOpen,
      iconBg: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      description: 'Undergraduate lecture notes, syllabi, and practice across Psychology, Math, Urdu, CS, Economics, History, and more.'
    },
    {
      id: 'arena',
      title: 'Quiz Arena',
      badge: 'Live Timers & Scoring',
      badgeColor: 'badge-cyan',
      icon: Award,
      iconBg: 'linear-gradient(135deg, #0284c7, #38bdf8)',
      description: 'Customizable testing arena with timed and untimed challenges, difficulty selectors, and solution breakdowns.'
    },
    {
      id: 'prep',
      title: 'Study Preparation',
      badge: 'Exams & Revision',
      badgeColor: 'badge-gold',
      icon: CheckCircle,
      iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
      description: 'Interactive 3D digital flashcard decks, persistent revision checklists, and high-yield concept review.'
    },
    {
      id: 'library',
      title: 'Taleem for All Library',
      badge: '16 Disciplines & Syllabi',
      badgeColor: 'badge-cyan',
      icon: FileText,
      iconBg: 'linear-gradient(135deg, #10b981, #059669)',
      description: 'Comprehensive academic library with verified lecture notes, syllabi, Urdu-English explanations, and peer-reviewed citations.'
    },
    {
      id: 'tutor',
      title: 'AI Study Tutor',
      badge: 'Academic Coach',
      badgeColor: 'badge-purple',
      icon: Bot,
      iconBg: 'linear-gradient(135deg, #6366f1, #a855f7)',
      description: 'Ask conceptual questions, generate practice problems, and adjust explanation depth from simple to advanced.'
    },
    {
      id: 'cosmos',
      title: 'Cosmos: Space & Astronomy',
      badge: 'Cinematic 3D',
      badgeColor: 'badge-cyan',
      icon: Orbit,
      iconBg: 'linear-gradient(135deg, #0369a1, #6366f1)',
      description: 'Cinematic universe portal, interactive 3D Solar System simulation, celestial raycasting, and NASA science insights.'
    },
    {
      id: 'progress',
      title: 'My Progress & Achievements',
      badge: 'XP & Badges',
      badgeColor: 'badge-gold',
      icon: Trophy,
      iconBg: 'linear-gradient(135deg, #eab308, #ca8a04)',
      description: 'Track your XP level progression, unlocked achievement badges, study streaks, and simulated class leaderboard.'
    },
    {
      id: 'challenges',
      title: 'Daily Challenges',
      badge: '175 Daily XP',
      badgeColor: 'badge-purple',
      icon: Flame,
      iconBg: 'linear-gradient(135deg, #f43f5e, #be123c)',
      description: 'Complete daily educational quests across all subjects to boost your streak and earn bonus university scholar badges.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Persistent Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        onOpenProfile={() => setShowProfile(true)}
      />

      {/* Main Content Viewport */}
      <main style={{ flex: 1, maxWidth: 'var(--max-width)', width: '100%', margin: '0 auto', padding: '32px 24px' }}>

        {/* =========================================================
            TAB 1: UNIFIED CENTRAL HUB HOMEPAGE
            ========================================================= */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Welcome Banner */}
            <div className="glass-panel responsive-hero-grid" style={{
              padding: 'clamp(20px, 4vw, 36px)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-glow)',
              boxShadow: 'var(--glow-purple)',
              marginBottom: '32px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span className="badge-pill badge-cyan">
                    <Sparkles size={14} /> Unified Educational Platform
                  </span>
                  <span className="badge-pill badge-purple">
                    Higher Education Suite
                  </span>
                </div>

                <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '12px' }}>
                  Welcome to <span className="gradient-text-cosmic">Nova Learn</span>
                </h1>

                <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.92rem, 1.6vw, 1.02rem)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Your central university academic ecosystem. Select any of the 8 dedicated learning workspaces below to master subjects, practice in the timed Quiz Arena, review digital flashcards, or explore the 3D Cosmos.
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveTab('subjects')}
                    className="btn-cyan"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', minHeight: '44px' }}
                  >
                    <BookOpen size={17} />
                    <span>Explore 11 Subjects</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('arena')}
                    className="btn-secondary"
                    style={{ minHeight: '44px' }}
                  >
                    <Award size={17} />
                    <span>Launch Quiz Arena</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cosmos')}
                    className="btn-primary"
                    style={{ minHeight: '44px' }}
                  >
                    <Orbit size={17} />
                    <span>Open Cosmos Portal</span>
                  </button>
                </div>
              </div>

              {/* Student Quick Status Card */}
              <div style={{
                background: 'rgba(14, 11, 40, 0.85)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(16px, 3vw, 22px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '2rem' }}>{progress.avatar || '🚀'}</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{progress.name}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{progress.grade}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Current Rank</span>
                    <p style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--accent-lavender)' }}>Lvl {progress.level || 1} Scholar</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Daily Streak</span>
                    <p style={{ fontWeight: 800, fontSize: '0.94rem', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Flame size={14} fill="#fb7185" /> {progress.streak || 3} Days
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('progress')}
                  style={{
                    width: '100%',
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid var(--border-glow)',
                    color: 'var(--accent-lavender)',
                    borderRadius: 'var(--radius-full)',
                    padding: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    minHeight: '44px'
                  }}
                >
                  View Full Analytics & Badges →
                </button>
              </div>
            </div>

            {/* 8 INTERACTIVE GATEWAY CARDS GRID */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 900 }}>The 8 Learning Environments</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Each gateway opens a full, dedicated workspace with specialized pedagogical tools.
                </p>
              </div>

              <div className="responsive-gateways-grid">
                {mainGateways.map((g) => {
                  const Icon = g.icon;
                  return (
                    <div
                      key={g.id}
                      className="glass-panel glass-panel-hover"
                      onClick={() => {
                        if (g.id === 'challenges') {
                          // Opens daily quest section or progress
                          setActiveTab('progress');
                        } else {
                          setActiveTab(g.id);
                        }
                      }}
                      style={{
                        padding: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: 'var(--radius-md)',
                        minHeight: '220px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '14px',
                            background: g.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                          }}>
                            <Icon size={22} color="#ffffff" />
                          </div>

                          <span className={`badge-pill ${g.badgeColor}`} style={{ fontSize: '0.72rem' }}>
                            {g.badge}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.18rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
                          {g.title}
                        </h3>

                        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                          {g.description}
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '12px'
                      }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Open Workspace <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: COSMOS — IMMERSIVE SPACE & ASTRONOMY
            ========================================================= */}
        {activeTab === 'cosmos' && (
          <div style={{ margin: '-32px -24px', minHeight: '100vh', position: 'relative' }}>
            <CosmosHomepage
              onEnterCosmos={() => { }}
              onExploreSolarSystem={() => { }}
              onNavigateHome={() => setActiveTab('home')}
              onNavigateSubjects={() => setActiveTab('subjects')}
              onNavigateTutor={() => setActiveTab('tutor')}
              onLaunchQuiz={(quiz, name) => handleLaunchQuiz(quiz, name)}
            />
          </div>
        )}

        {/* =========================================================
            TAB 3: ACADEMIC SUBJECTS & BILINGUAL LIBRARY
            ========================================================= */}
        {activeTab === 'subjects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Academic Subjects & Library</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  In-depth lecture notes with bilingual explanations, key terminology, and printable outlines.
                </p>
              </div>

              {/* Language View Switcher */}
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '4px'
              }}>
                <button
                  onClick={() => setLangPreference('bilingual')}
                  style={{
                    background: langPreference === 'bilingual' ? 'var(--accent-purple)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Bilingual (اردو + ENG)
                </button>
                <button
                  onClick={() => setLangPreference('urdu')}
                  style={{
                    background: langPreference === 'urdu' ? 'var(--accent-purple)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  صرف اردو
                </button>
                <button
                  onClick={() => setLangPreference('en')}
                  style={{
                    background: langPreference === 'en' ? 'var(--accent-purple)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  English Only
                </button>
              </div>
            </div>

            {/* Subject Selector Tabs */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '24px' }}>
              {subjectsData.map((sub) => {
                const isSelected = activeSubject.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveSubject(sub);
                      setActiveModule(sub.modules[0]);
                    }}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(56, 189, 248, 0.16)' : 'var(--bg-glass)',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.name}</span>
                    {sub.id === 'urdu' && (
                      <span className="urdu-text" style={{ fontSize: '0.85rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-dim)' }}>
                        (اردو)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Subject Main Study Workspace */}
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
              {/* Left Modules List */}
              <div className="glass-panel" style={{ padding: '20px', height: 'fit-content', position: 'sticky', top: '90px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Chapter Outline</h3>
                  <span className="badge-pill badge-purple" style={{ fontSize: '0.7rem' }}>
                    {activeSubject.modules.length} Lessons
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '580px', overflowY: 'auto', paddingRight: '6px' }}>
                  {activeSubject.modules.map((mod) => {
                    const isSelected = activeModule.id === mod.id;
                    return (
                      <div
                        key={mod.id}
                        onClick={() => setActiveModule(mod)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-md)',
                          background: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                          border: isSelected ? '1px solid var(--border-glow)' : '1px solid transparent',
                          cursor: 'pointer',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        <h4 style={{ fontSize: '0.9rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#ffffff' : 'var(--text-muted)' }}>
                          {mod.title}
                        </h4>
                        {activeSubject.id === 'urdu' && mod.urduTitle && (
                          <span className="urdu-text" style={{ fontSize: '0.8rem', color: 'var(--accent-lavender)', display: 'block', marginTop: '2px' }}>
                            {mod.urduTitle}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Launch Quiz Button for this subject */}
                {activeSubject.quiz && (
                  <button
                    onClick={() => handleLaunchQuiz(activeSubject.quiz, activeSubject.name)}
                    className="btn-cyan"
                    style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                  >
                    <Award size={18} />
                    <span>Take {activeSubject.name} Quiz</span>
                  </button>
                )}
              </div>

              {/* Right Content Viewer */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                {activeModule && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <span className="badge-pill badge-cyan" style={{ marginBottom: '8px' }}>
                          {activeModule.difficulty}
                        </span>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{activeModule.title}</h2>
                        {activeSubject.id === 'urdu' && activeModule.urduTitle && (
                          <h3 className="urdu-text" style={{ fontSize: '1.3rem', color: 'var(--accent-lavender)', marginTop: '4px' }}>
                            {activeModule.urduTitle}
                          </h3>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                        <Clock size={16} />
                        <span>{activeModule.readTime} read</span>
                      </div>
                    </div>

                    {/* Summary Card */}
                    <div style={{
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid var(--border-cyan)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px 20px',
                      marginBottom: '28px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                        <Sparkles size={15} />
                        <span>Core Concept Summary (خلاصہ)</span>
                      </div>
                      {(langPreference === 'bilingual' || langPreference === 'en') && (
                        <p style={{ fontSize: '0.92rem', color: '#e0f2fe', marginBottom: '8px' }}>
                          {activeModule.summaryEn}
                        </p>
                      )}
                      {(langPreference === 'bilingual' || langPreference === 'urdu') && (
                        <p className="urdu-text" style={{ fontSize: '0.95rem', color: '#bae6fd' }}>
                          {activeModule.summaryUrdu}
                        </p>
                      )}
                    </div>

                    {/* Full Lecture Notes Body */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {(langPreference === 'bilingual' || langPreference === 'en') && (
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '20px'
                        }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            English Academic Notes
                          </span>
                          <pre style={{
                            fontFamily: 'var(--font-sans)',
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.95rem',
                            color: '#e2e8f0',
                            lineHeight: 1.7,
                            marginTop: '10px'
                          }}>
                            {activeModule.contentEn}
                          </pre>
                        </div>
                      )}

                      {(langPreference === 'bilingual' || langPreference === 'urdu') && (
                        <div style={{
                          background: 'rgba(139, 92, 246, 0.07)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '20px'
                        }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-lavender)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            اردو مفہوم و تشریح
                          </span>
                          <pre className="urdu-text" style={{
                            fontFamily: 'var(--font-urdu)',
                            whiteSpace: 'pre-wrap',
                            fontSize: '1.05rem',
                            color: '#f1f5f9',
                            lineHeight: 2.3,
                            marginTop: '10px'
                          }}>
                            {activeModule.contentUrdu}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Navigation between modules & Mark as Completed */}
                    <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {(() => {
                          const currentIndex = activeSubject.modules.findIndex(m => m.id === activeModule.id);
                          const prevModule = currentIndex > 0 ? activeSubject.modules[currentIndex - 1] : null;
                          const nextModule = currentIndex < activeSubject.modules.length - 1 ? activeSubject.modules[currentIndex + 1] : null;
                          return (
                            <>
                              <button
                                disabled={!prevModule}
                                onClick={() => prevModule && setActiveModule(prevModule)}
                                style={{
                                  padding: '8px 16px',
                                  borderRadius: 'var(--radius-md)',
                                  border: '1px solid var(--border-subtle)',
                                  background: prevModule ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                  color: prevModule ? '#ffffff' : 'var(--text-dim)',
                                  cursor: prevModule ? 'pointer' : 'not-allowed',
                                  fontSize: '0.85rem',
                                  fontWeight: 600
                                }}
                              >
                                ← Previous Lesson
                              </button>
                              <button
                                disabled={!nextModule}
                                onClick={() => nextModule && setActiveModule(nextModule)}
                                style={{
                                  padding: '8px 16px',
                                  borderRadius: 'var(--radius-md)',
                                  border: '1px solid var(--border-subtle)',
                                  background: nextModule ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                  color: nextModule ? '#ffffff' : 'var(--text-dim)',
                                  cursor: nextModule ? 'pointer' : 'not-allowed',
                                  fontSize: '0.85rem',
                                  fontWeight: 600
                                }}
                              >
                                Next Lesson →
                              </button>
                            </>
                          );
                        })()}
                      </div>

                      <button
                        onClick={() => {
                          addXp(25);
                          alert('Lesson marked complete! You earned +25 XP!');
                        }}
                        className="btn-primary"
                      >
                        <CheckCircle size={18} />
                        <span>Mark Lesson Complete (+25 XP)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: DEDICATED QUIZ ARENA
            ========================================================= */}
        {activeTab === 'arena' && (
          <QuizArena onNavigateBack={() => setActiveTab('home')} />
        )}

        {/* =========================================================
            TAB 5: STUDY PREPARATION WORKSPACE
            ========================================================= */}
        {activeTab === 'prep' && (
          <StudyPrep
            onNavigateBack={() => setActiveTab('home')}
            onLaunchQuiz={(quiz, name) => handleLaunchQuiz(quiz, name)}
          />
        )}

        {/* =========================================================
            TAB 6: TALEEM FOR ALL — KNOWLEDGE LIBRARY
            ========================================================= */}
        {activeTab === 'library' && (
          <TaleemLibrary
            onNavigateBack={() => setActiveTab('home')}
            onAskTutor={(topic, prompt) => {
              setTutorInquiry({ topic, prompt });
              setActiveTab('tutor');
            }}
            onLaunchQuiz={(quiz, subjectName) => handleLaunchQuiz(quiz, subjectName)}
          />
        )}

        {/* =========================================================
            TAB 7: AI STUDY TUTOR
            ========================================================= */}
        {activeTab === 'tutor' && (
          <TutorWorkspace
            onNavigateBack={() => setActiveTab('home')}
            initialTopic={tutorInquiry?.topic}
            initialPrompt={tutorInquiry?.prompt}
          />
        )}

        {/* =========================================================
            TAB 8: MY PROGRESS & ACHIEVEMENTS
            ========================================================= */}
        {activeTab === 'progress' && (
          <ProgressDashboard
            progress={progress}
            onNavigateBack={() => setActiveTab('home')}
            onLaunchArena={() => setActiveTab('arena')}
          />
        )}
      </main>

      {/* Floating Quiz Modal (Direct launcher from subject views) */}
      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz.quiz}
          subjectName={activeQuiz.subjectName}
          onClose={() => setActiveQuiz(null)}
          onComplete={(score, total, xp) => {
            console.log(`Quiz finished with ${score}/${total}, earned ${xp} XP`);
          }}
        />
      )}

      {/* Profile & Leaderboard Modal */}
      {showProfile && (
        <ProfileModal
          progress={progress}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Footer */}
      <footer style={{
        marginTop: '60px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(6, 5, 23, 0.95)',
        padding: '24px',
        textAlign: 'center',
        color: 'var(--text-dim)',
        fontSize: '0.85rem'
      }}>
        <p>Nova Learn — University Education Platform • Unified Multi-Section Academic Suite</p>
      </footer>
    </div>
  );
}
