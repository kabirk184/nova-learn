import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Download, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Filter, 
  Layers, 
  Award, 
  Bot, 
  RotateCw, 
  Share2, 
  ChevronRight, 
  ChevronDown, 
  Globe, 
  BookMarked,
  Brain,
  Compass,
  Cpu,
  Orbit,
  BarChart2,
  Activity,
  Zap,
  FlaskConical,
  Users
} from 'lucide-react';
import { 
  taleemSubjects, 
  academicFaculties, 
  academicLevels, 
  resourceTypes, 
  learningPaths 
} from '../data/libraryData';
import { addXp } from '../utils/storage';

// Icon Map helper
const iconMap = {
  GraduationCap,
  Brain,
  Compass,
  Cpu,
  Orbit,
  BarChart2,
  Activity,
  Zap,
  FlaskConical,
  BookOpen,
  Globe,
  Users
};

export default function TaleemLibrary({ 
  onNavigateBack, 
  onAskTutor, 
  onLaunchQuiz 
}) {
  // Navigation & View state
  // selectedSubject: null for library portal hub; subject object for dedicated subject environment
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All'); // 'All' | 'English' | 'Urdu'

  // Live External Search Mode: 'curated' (Nova Learn internal syllabus) | 'wikipedia' (Live Wikipedia MediaWiki REST API)
  const [searchMode, setSearchMode] = useState('curated');
  const [wikiResults, setWikiResults] = useState([]);
  const [wikiLoading, setWikiLoading] = useState(false);
  const [wikiError, setWikiError] = useState(null);

  // Fetch Wikipedia articles via official MediaWiki REST API
  const handleWikiSearch = async (queryText) => {
    const q = (queryText || searchQuery).trim();
    if (!q) {
      setWikiResults([]);
      return;
    }
    setWikiLoading(true);
    setWikiError(null);
    try {
      const endpoint = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(q)}&limit=10`;
      const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Wikipedia API responded with status ${response.status}`);
      }
      const data = await response.json();
      setWikiResults(data.pages || []);
    } catch (err) {
      console.warn('Wikipedia REST search error:', err);
      setWikiError('Could not reach the Wikipedia REST service. Please verify your connection or try again.');
    } finally {
      setWikiLoading(false);
    }
  };

  // Dedicated Subject View local state
  const [subjectLanguageMode, setSubjectLanguageMode] = useState('bilingual'); // 'bilingual' | 'en' | 'urdu'
  const [activeTabSubView, setActiveTabSubView] = useState('notes'); // 'notes' | 'terms' | 'quiz' | 'flashcards' | 'references'
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Practice Quiz local response state in lesson
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Mark lesson as complete & award XP
  const handleCompleteTopic = (topicId) => {
    if (!completedTopicIds.includes(topicId)) {
      const updated = [...completedTopicIds, topicId];
      setCompletedTopicIds(updated);
      try {
        localStorage.setItem('nova_completed_topics', JSON.stringify(updated));
      } catch (err) {
        console.error('Storage error:', err);
      }
      addXp(25);
      alert('🎉 Lesson completed! You earned +25 Academic XP!');
    } else {
      alert('You have already completed this lesson! Great job reviewing.');
    }
  };

  // Open dedicated subject view
  const handleOpenSubject = (subject, preselectTopicId = null) => {
    setSelectedSubject(subject);
    if (preselectTopicId) {
      for (const ch of subject.chapters) {
        const found = ch.topics.find(t => t.id === preselectTopicId);
        if (found) {
          setActiveTopic(found);
          break;
        }
      }
    } else if (subject.chapters[0]?.topics[0]) {
      setActiveTopic(subject.chapters[0].topics[0]);
    }
    setActiveTabSubView('notes');
    setFlashcardFlipped(false);
    setCurrentFlashcardIndex(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered subjects for portal
  const filteredSubjects = useMemo(() => {
    return taleemSubjects.filter(sub => {
      const matchesFaculty = selectedFaculty === 'All' || sub.faculty === selectedFaculty;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesFaculty;

      // Deep search: subject name, overview, topics, terminology
      const nameMatch = sub.name.toLowerCase().includes(query) || sub.urduName.includes(query);
      const overviewMatch = sub.overview.toLowerCase().includes(query);
      
      const topicMatch = sub.chapters.some(ch => 
        ch.topics.some(t => 
          t.title.toLowerCase().includes(query) ||
          t.urduTitle.includes(query) ||
          t.summaryEn.toLowerCase().includes(query) ||
          t.studyNotes.keyTerminology.some(k => k.term.toLowerCase().includes(query) || k.urduTerm.includes(query))
        )
      );

      return matchesFaculty && (nameMatch || overviewMatch || topicMatch);
    });
  }, [searchQuery, selectedFaculty]);

  // Download simulation
  const handleDownload = (filename, size) => {
    alert(`Downloading "${filename}" (${size || '1.2 MB'})\nAuthentic open-access educational document prepared for Nova Learn students.`);
  };

  // ============================================================================
  // RENDER DEDICATED SUBJECT & LESSON VIEW
  // ============================================================================
  if (selectedSubject) {
    const SubjectIcon = iconMap[selectedSubject.icon] || BookOpen;

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px 0 60px 0' }}>
        {/* Top Breadcrumb & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => { setSelectedSubject(null); setActiveTopic(null); }}
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
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              ← Back to Taleem Library Hub
            </button>

            <span className="badge-pill badge-purple" style={{ fontSize: '0.75rem' }}>
              {selectedSubject.faculty}
            </span>
          </div>

          {/* Language Mode Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '4px'
          }}>
            <button
              onClick={() => setSubjectLanguageMode('bilingual')}
              style={{
                background: subjectLanguageMode === 'bilingual' ? 'var(--accent-purple)' : 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Bilingual (اردو + ENG)
            </button>
            <button
              onClick={() => setSubjectLanguageMode('en')}
              style={{
                background: subjectLanguageMode === 'en' ? 'var(--accent-purple)' : 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              English Only
            </button>
            <button
              onClick={() => setSubjectLanguageMode('urdu')}
              style={{
                background: subjectLanguageMode === 'urdu' ? 'var(--accent-purple)' : 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              صرف اردو
            </button>
          </div>
        </div>

        {/* Subject Header Banner */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: 'clamp(18px, 3.5vw, 30px)', 
            borderRadius: 'var(--radius-lg)', 
            marginBottom: '24px',
            background: `linear-gradient(135deg, rgba(20, 15, 55, 0.95), rgba(10, 8, 30, 0.95))`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '800px', flexWrap: 'wrap' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: selectedSubject.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: `0 8px 24px ${selectedSubject.color}40`
              }}>
                <SubjectIcon size={28} color="#ffffff" />
              </div>

              <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 900, color: '#ffffff', wordBreak: 'break-word' }}>
                    {selectedSubject.name}
                  </h1>
                  <span className="urdu-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', color: 'var(--accent-lavender)', fontWeight: 700 }}>
                    {selectedSubject.urduName}
                  </span>
                </div>

                <p style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem', marginTop: '4px', fontWeight: 500 }}>
                  {selectedSubject.tagline}
                </p>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginTop: '8px' }}>
                  {selectedSubject.overview}
                </p>
              </div>
            </div>

            {/* Cross-Module Quick Launchers */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap', width: '100%', maxWidth: '380px' }}>
              <button
                onClick={() => {
                  if (onAskTutor && activeTopic) {
                    onAskTutor(
                      `${selectedSubject.name}: ${activeTopic.title}`,
                      `I am studying "${activeTopic.title}" in ${selectedSubject.name}. Could you explain this concept clearly with an intuitive real-world example?`
                    );
                  }
                }}
                className="btn-secondary"
                style={{ flex: '1 1 140px', justifyContent: 'center', gap: '8px', minHeight: '44px' }}
              >
                <Bot size={16} color="var(--accent-purple)" />
                <span>Ask AI Tutor</span>
              </button>

              <button
                onClick={() => {
                  if (onLaunchQuiz && activeTopic?.practiceQuestions) {
                    onLaunchQuiz({
                      title: `${activeTopic.title} Quiz Challenge`,
                      questions: activeTopic.practiceQuestions.map(q => ({
                        questionEn: q.question,
                        options: q.options,
                        correct: q.correctIndex,
                        explanation: q.explanation
                      }))
                    }, selectedSubject.name);
                  }
                }}
                className="btn-primary"
                style={{ flex: '1 1 140px', justifyContent: 'center', gap: '8px', minHeight: '44px' }}
              >
                <Award size={16} />
                <span>Topic Quiz</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Academic Workspace (Responsive Grid) */}
        <div className="taleem-workspace-grid">
          {/* LEFT: Structured Syllabus Navigator */}
          <div className="glass-panel" style={{ padding: '18px', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--accent-cyan)" />
              <span>Syllabus & Topics</span>
            </h3>

            {selectedSubject.chapters.map((ch) => (
              <div key={ch.chapterNumber} style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '0.78rem', 
                  fontWeight: 700, 
                  color: 'var(--accent-lavender)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  Chapter {ch.chapterNumber}: {ch.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {ch.topics.map((t) => {
                    const isSelected = activeTopic?.id === t.id;
                    const isCompleted = completedTopicIds.includes(t.id);

                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveTopic(t);
                          setActiveTabSubView('notes');
                          setFlashcardFlipped(false);
                          setCurrentFlashcardIndex(0);
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                        }}
                        style={{
                          textAlign: 'left',
                          background: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '10px 12px',
                          color: isSelected ? '#ffffff' : 'var(--text-muted)',
                          fontSize: '0.86rem',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                          {isCompleted ? (
                            <CheckCircle size={15} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                          ) : (
                            <BookOpen size={15} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                          )}
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {t.title}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', flexShrink: 0 }}>
                          {t.readTime}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Learning Objectives box */}
            <div style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.82rem'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Learning Objectives
              </div>
              <ul style={{ paddingLeft: '18px', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>
                {selectedSubject.learningObjectives.map((obj, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{obj}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Active Lesson Interactive Content Workspace */}
          {activeTopic && (
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-md)' }}>
              {/* Lesson Metadata Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-pill badge-purple" style={{ fontSize: '0.72rem' }}>
                      {activeTopic.level}
                    </span>
                    <span className="badge-pill badge-cyan" style={{ fontSize: '0.72rem' }}>
                      {activeTopic.resourceType}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {activeTopic.readTime}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
                    {activeTopic.title}
                  </h2>

                  {(subjectLanguageMode === 'bilingual' || subjectLanguageMode === 'urdu') && (
                    <div className="urdu-text" style={{ fontSize: '1.25rem', color: 'var(--accent-lavender)', marginTop: '4px', fontWeight: 600 }}>
                      {activeTopic.urduTitle}
                    </div>
                  )}
                </div>

                {/* Lesson Completion Button */}
                <button
                  onClick={() => handleCompleteTopic(activeTopic.id)}
                  style={{
                    background: completedTopicIds.includes(activeTopic.id) ? 'rgba(16, 185, 129, 0.2)' : 'var(--gradient-cyan)',
                    border: completedTopicIds.includes(activeTopic.id) ? '1px solid #10b981' : 'none',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: completedTopicIds.includes(activeTopic.id) ? 'none' : 'var(--glow-cyan)'
                  }}
                >
                  <CheckCircle size={16} />
                  <span>{completedTopicIds.includes(activeTopic.id) ? 'Completed (+25 XP)' : 'Mark Lesson Complete (+25 XP)'}</span>
                </button>
              </div>

              {/* Sub-Navigation Tabs inside Lesson */}
              <div style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '12px',
                marginBottom: '24px',
                overflowX: 'auto'
              }}>
                {[
                  { id: 'notes', label: 'Study Notes & Theory', icon: FileText },
                  { id: 'terms', label: 'Key Terminology', icon: BookMarked },
                  { id: 'flashcards', label: `Flashcards (${activeTopic.flashcards?.length || 0})`, icon: RotateCw },
                  { id: 'quiz', label: `Practice Quiz (${activeTopic.practiceQuestions?.length || 0})`, icon: Award },
                  { id: 'references', label: `Verified Sources (${activeTopic.verifiedReferences?.length || 0})`, icon: ExternalLink }
                ].map(tab => {
                  const TabIcon = tab.icon;
                  const isActive = activeTabSubView === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabSubView(tab.id)}
                      style={{
                        background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                        border: isActive ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <TabIcon size={15} color={isActive ? 'var(--accent-cyan)' : 'var(--text-dim)'} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: STUDY NOTES & THEORY */}
              {activeTabSubView === 'notes' && (
                <div>
                  {/* Executive Summary Box */}
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderLeft: '4px solid var(--accent-purple)',
                    padding: '16px 20px',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    marginBottom: '26px'
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Executive Summary
                    </div>
                    {(subjectLanguageMode === 'bilingual' || subjectLanguageMode === 'en') && (
                      <p style={{ color: '#e2e8f0', fontSize: '0.94rem', lineHeight: 1.6, marginTop: '6px' }}>
                        {activeTopic.summaryEn}
                      </p>
                    )}
                    {(subjectLanguageMode === 'bilingual' || subjectLanguageMode === 'urdu') && (
                      <p className="urdu-text" style={{ color: '#f1f5f9', fontSize: '1.08rem', lineHeight: 2.1, marginTop: '8px' }}>
                        {activeTopic.summaryUrdu}
                      </p>
                    )}
                  </div>

                  {/* Introduction */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: '#ffffff' }}>
                      Overview & Historical Context
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.8 }}>
                      {activeTopic.studyNotes.introduction}
                    </p>
                  </div>

                  {/* Main Structured Sections */}
                  {activeTopic.studyNotes.sections.map((sec, i) => (
                    <div key={i} style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '1.08rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                        {sec.heading}
                      </h4>
                      {sec.urduHeading && (
                        <h5 className="urdu-text" style={{ fontSize: '1rem', color: 'var(--accent-lavender)', marginBottom: '6px' }}>
                          {sec.urduHeading}
                        </h5>
                      )}
                      <pre style={{
                        fontFamily: 'var(--font-sans)',
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.94rem',
                        color: '#e2e8f0',
                        lineHeight: 1.75,
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '16px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        {sec.content || sec.bodyEn || (typeof sec === 'string' ? sec : '')}
                      </pre>
                      {sec.bodyUrdu && (
                        <pre className="urdu-text" style={{
                          fontFamily: 'var(--font-urdu)',
                          whiteSpace: 'pre-wrap',
                          fontSize: '1.05rem',
                          color: '#bae6fd',
                          lineHeight: 2.2,
                          background: 'rgba(139, 92, 246, 0.06)',
                          padding: '16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          marginTop: '10px'
                        }}>
                          {sec.bodyUrdu}
                        </pre>
                      )}
                    </div>
                  ))}

                  {/* Practical Real-World Examples */}
                  {activeTopic.studyNotes.practicalExamples && (
                    <div style={{
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                      marginTop: '28px'
                    }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} /> Real-World Case Studies & Practical Applications
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activeTopic.studyNotes.practicalExamples.map((ex, i) => {
                          if (typeof ex === 'object' && ex !== null) {
                            return (
                              <div key={i} style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(6, 182, 212, 0.2)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '14px',
                                color: '#f1f5f9'
                              }}>
                                {ex.scenario && (
                                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.94rem', marginBottom: '6px' }}>
                                    📌 Scenario: {ex.scenario}
                                  </div>
                                )}
                                {ex.solution && (
                                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                                    💡 Solution / Analysis: {ex.solution}
                                  </div>
                                )}
                                {!ex.scenario && !ex.solution && (
                                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                                    {JSON.stringify(ex)}
                                  </div>
                                )}
                              </div>
                            );
                          }
                          return (
                            <div key={i} style={{ color: '#f1f5f9', fontSize: '0.92rem', lineHeight: 1.6 }}>
                              • {ex}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Interactive Cross-Module Bridges */}
                  <div style={{
                    marginTop: '28px',
                    padding: '18px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(56, 189, 248, 0.08))',
                    border: '1px solid var(--border-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#ffffff' }}>
                        Ready to test or deepen your understanding?
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Practice exam questions in Quiz Arena or ask the AI Study Tutor for personalized explanations.
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          if (onLaunchQuiz) {
                            onLaunchQuiz(null, selectedSubject.name);
                          }
                        }}
                        className="btn-cyan"
                        style={{ fontSize: '0.82rem', padding: '8px 16px', minHeight: '38px' }}
                      >
                        <Award size={15} />
                        <span>Take {selectedSubject.name} Quiz</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onAskTutor) {
                            onAskTutor(`Can you explain "${activeTopic.title}" from ${selectedSubject.name} with real-world examples and potential exam questions?`);
                          }
                        }}
                        className="btn-secondary"
                        style={{ fontSize: '0.82rem', padding: '8px 16px', minHeight: '38px' }}
                      >
                        <Bot size={15} />
                        <span>Ask AI Tutor About Topic</span>
                      </button>
                    </div>
                  </div>

                  {/* Download Material Footer */}
                  {activeTopic.downloads?.length > 0 && (
                    <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={15} color="var(--accent-cyan)" /> Verified Study Sheet Available
                      </span>
                      <button
                        onClick={() => handleDownload(activeTopic.downloads[0].name, activeTopic.downloads[0].size)}
                        className="btn-secondary"
                        style={{ fontSize: '0.84rem', padding: '8px 16px' }}
                      >
                        <Download size={15} />
                        <span>Download {activeTopic.downloads[0].name} ({activeTopic.downloads[0].size})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: KEY TERMINOLOGY GLOSSARY */}
              {activeTabSubView === 'terms' && (
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: '#ffffff' }}>
                    Key Definitions & Terminology
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                    {activeTopic.studyNotes.keyTerminology.map((item, idx) => (
                      <div 
                        key={idx}
                        className="glass-panel"
                        style={{
                          padding: '18px',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(15, 12, 38, 0.7)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                            {item.term}
                          </span>
                          {item.urduTerm && (
                            <span className="urdu-text" style={{ fontSize: '1rem', color: 'var(--accent-lavender)' }}>
                              {item.urduTerm}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {item.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: INTERACTIVE FLASHCARDS */}
              {activeTabSubView === 'flashcards' && (
                <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto', padding: '10px 0' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
                    Recall & Memory Flashcards
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', marginBottom: '24px' }}>
                    Click the card to reveal the reverse answer. Reinforces long-term memory retrieval.
                  </p>

                  {activeTopic.flashcards && activeTopic.flashcards.length > 0 ? (
                    <div>
                      {/* 3D Flip Card */}
                      <div
                        onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                        style={{
                          background: flashcardFlipped 
                            ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(15, 23, 42, 0.9))' 
                            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(15, 23, 42, 0.9))',
                          border: flashcardFlipped ? '1px solid var(--accent-cyan)' : '1px solid var(--accent-purple)',
                          borderRadius: 'var(--radius-lg)',
                          minHeight: '220px',
                          padding: '36px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                          marginBottom: '20px'
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: flashcardFlipped ? 'var(--accent-cyan)' : 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                          {flashcardFlipped ? 'Answer / Explanation' : 'Question / Concept Prompt'}
                        </span>
                        <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.6 }}>
                          {flashcardFlipped 
                            ? activeTopic.flashcards[currentFlashcardIndex].back 
                            : activeTopic.flashcards[currentFlashcardIndex].front}
                        </p>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '16px' }}>
                          (Click anywhere to flip)
                        </span>
                      </div>

                      {/* Flashcard navigation controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          onClick={() => {
                            setFlashcardFlipped(false);
                            setCurrentFlashcardIndex(prev => Math.max(0, prev - 1));
                          }}
                          disabled={currentFlashcardIndex === 0}
                          className="btn-secondary"
                          style={{ opacity: currentFlashcardIndex === 0 ? 0.4 : 1 }}
                        >
                          Previous Card
                        </button>

                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          Card {currentFlashcardIndex + 1} of {activeTopic.flashcards.length}
                        </span>

                        <button
                          onClick={() => {
                            setFlashcardFlipped(false);
                            setCurrentFlashcardIndex(prev => Math.min(activeTopic.flashcards.length - 1, prev + 1));
                          }}
                          disabled={currentFlashcardIndex === activeTopic.flashcards.length - 1}
                          className="btn-secondary"
                          style={{ opacity: currentFlashcardIndex === activeTopic.flashcards.length - 1 ? 0.4 : 1 }}
                        >
                          Next Card
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-dim)' }}>No flashcards registered for this topic yet.</p>
                  )}
                </div>
              )}

              {/* TAB 4: PRACTICE QUESTIONS */}
              {activeTabSubView === 'quiz' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                        Lesson Mastery MCQs
                      </h3>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem' }}>
                        Answer the conceptual questions below to test your understanding.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (onLaunchQuiz && activeTopic?.practiceQuestions) {
                          onLaunchQuiz({
                            title: `${activeTopic.title} Full Challenge`,
                            questions: activeTopic.practiceQuestions.map(q => ({
                              questionEn: q.question,
                              options: q.options,
                              correct: q.correctIndex,
                              explanation: q.explanation
                            }))
                          }, selectedSubject.name);
                        }
                      }}
                      className="btn-secondary"
                      style={{ fontSize: '0.82rem', gap: '6px' }}
                    >
                      <Award size={14} /> Open in Timed Quiz Arena
                    </button>
                  </div>

                  {activeTopic.practiceQuestions.map((q, qIndex) => (
                    <div 
                      key={qIndex} 
                      className="glass-panel" 
                      style={{ padding: '22px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}
                    >
                      <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', lineHeight: 1.5 }}>
                        Q{qIndex + 1}. {q.question}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {q.options.map((opt, oIndex) => {
                          const isSelected = quizAnswers[qIndex] === oIndex;
                          let optionStyle = {
                            background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                            color: '#e2e8f0'
                          };

                          if (quizSubmitted) {
                            if (oIndex === q.correctIndex) {
                              optionStyle = {
                                background: 'rgba(16, 185, 129, 0.25)',
                                border: '1px solid #10b981',
                                color: '#a7f3d0'
                              };
                            } else if (isSelected && isSelected !== q.correctIndex) {
                              optionStyle = {
                                background: 'rgba(239, 68, 68, 0.25)',
                                border: '1px solid #ef4444',
                                color: '#fca5a5'
                              };
                            }
                          }

                          return (
                            <button
                              key={oIndex}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [qIndex]: oIndex }))}
                              style={{
                                textAlign: 'left',
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.9rem',
                                cursor: quizSubmitted ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                ...optionStyle
                              }}
                            >
                              <span style={{ 
                                width: '22px', 
                                height: '22px', 
                                borderRadius: '50%', 
                                border: '1px solid var(--border-subtle)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.78rem',
                                fontWeight: 700
                              }}>
                                {String.fromCharCode(65 + oIndex)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div style={{
                          marginTop: '14px',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          background: quizAnswers[qIndex] === q.correctIndex ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          borderLeft: `4px solid ${quizAnswers[qIndex] === q.correctIndex ? '#10b981' : '#ef4444'}`,
                          fontSize: '0.86rem',
                          color: '#e2e8f0',
                          lineHeight: 1.5
                        }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                    {quizSubmitted ? (
                      <button
                        onClick={() => {
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                        }}
                        className="btn-secondary"
                      >
                        Reset Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setQuizSubmitted(true);
                          addXp(15);
                        }}
                        disabled={Object.keys(quizAnswers).length === 0}
                        className="btn-primary"
                        style={{ opacity: Object.keys(quizAnswers).length === 0 ? 0.5 : 1 }}
                      >
                        Check Answers (+15 XP)
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: VERIFIED REFERENCES & ACADEMIC SOURCES */}
              {activeTabSubView === 'references' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                      Verified Academic Citations & Source Documentation
                    </h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem' }}>
                      Nova Learn adheres to rigorous academic verification standards. All concepts are cross-referenced against authoritative university textbooks, peer-reviewed literature, and official national curricula.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {activeTopic.verifiedReferences.map((ref, i) => (
                      <div 
                        key={i} 
                        className="glass-panel" 
                        style={{ padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <span className="badge-pill badge-cyan" style={{ fontSize: '0.72rem' }}>
                            {ref.type}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                            Published {ref.year}
                          </span>
                        </div>

                        <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                          {ref.title}
                        </h4>

                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-lavender)', marginBottom: '4px' }}>
                          Authors: {ref.authors}
                        </div>

                        <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                          Source / Imprint: {ref.source}
                        </div>

                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: 'var(--accent-cyan)',
                            fontSize: '0.82rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            textDecoration: 'none',
                            fontWeight: 600
                          }}
                        >
                          <span>Inspect Original Academic Source</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER MAIN TALEEM FOR ALL LIBRARY PORTAL HUB
  // ============================================================================
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px 0 60px 0' }}>
      {/* Top Breadcrumb */}
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

        <span className="badge-pill badge-cyan">
          Taleem for All • The Complete Knowledge Library
        </span>
      </div>

      {/* Main Hero Header */}
      <div className="glass-panel" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid var(--border-purple)', color: 'var(--accent-lavender)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '14px' }}>
          <GraduationCap size={16} /> Open Educational Resources for Pakistani & Global Scholars
        </div>

        <h1 style={{ fontSize: '2.6rem', fontWeight: 900, marginBottom: '10px' }}>
          Taleem for All
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '720px', margin: '0 auto 26px auto', lineHeight: 1.6 }}>
          A comprehensive, searchable academic repository organizing high-quality lecture notes, formula sheets, Urdu-English explanations, and peer-reviewed citations across 16 core university disciplines.
        </p>

        {/* Mode Selector: Nova Learn Curated Lessons vs Live English Wikipedia REST API */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '16px'
        }}>
          <button
            onClick={() => setSearchMode('curated')}
            style={{
              background: searchMode === 'curated' ? 'var(--accent-purple)' : 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={15} />
            <span>Curated Nova Learn Library</span>
          </button>
          <button
            onClick={() => {
              setSearchMode('wikipedia');
              if (searchQuery && wikiResults.length === 0) {
                handleWikiSearch(searchQuery);
              }
            }}
            style={{
              background: searchMode === 'wikipedia' ? 'linear-gradient(135deg, #0284c7, #06b6d4)' : 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Globe size={15} />
            <span>Live Wikipedia REST API</span>
          </button>
        </div>

        {/* Universal Search Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (searchMode === 'wikipedia') handleWikiSearch(searchQuery);
          }}
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            background: 'rgba(10, 8, 30, 0.95)',
            border: searchMode === 'wikipedia' ? '1px solid #06b6d4' : '1px solid var(--border-cyan)',
            boxShadow: searchMode === 'wikipedia' ? '0 0 20px rgba(6, 182, 212, 0.4)' : 'var(--glow-cyan)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Search size={22} color={searchMode === 'wikipedia' ? '#06b6d4' : 'var(--accent-cyan)'} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
            }}
            placeholder={
              searchMode === 'wikipedia'
                ? "Search global knowledge on Wikipedia (e.g., Quantum Mechanics, Plate Tectonics, Iqbal, Cognitive Dissonance)..."
                : "Search subjects, topics, key terms (e.g., Bloom's, Baddeley, Big-O, Calculus, مطلع)..."
            }
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '12px 0',
              outline: 'none',
              fontSize: '1rem'
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setWikiResults([]);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Clear
            </button>
          )}

          {searchMode === 'wikipedia' && (
            <button
              type="submit"
              disabled={wikiLoading || !searchQuery.trim()}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #06b6d4)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                color: '#ffffff',
                padding: '8px 18px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: wikiLoading || !searchQuery.trim() ? 'not-allowed' : 'pointer',
                opacity: wikiLoading || !searchQuery.trim() ? 0.6 : 1,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {wikiLoading ? 'Searching...' : 'Search Wiki'}
            </button>
          )}
        </form>

        {/* Filter Pills (Shown only when in Curated Library Mode) */}
        {searchMode === 'curated' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '22px' }}>
            {academicFaculties.map((fac) => (
              <button
                key={fac}
                onClick={() => setSelectedFaculty(fac)}
                style={{
                  background: selectedFaculty === fac ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.05)',
                  border: selectedFaculty === fac ? '1px solid var(--accent-lavender)' : '1px solid var(--border-subtle)',
                  color: selectedFaculty === fac ? '#ffffff' : 'var(--text-dim)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {fac}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LIVE WIKIPEDIA REST API SEARCH RESULTS */}
      {searchMode === 'wikipedia' && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#06b6d4', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Globe size={15} /> Official English Wikipedia REST API Search
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                Global Encyclopedia Discoveries {searchQuery ? `for "${searchQuery}"` : ''}
              </h2>
            </div>
            <span className="badge-pill badge-cyan" style={{ fontSize: '0.74rem' }}>
              Source: en.wikipedia.org
            </span>
          </div>

          {wikiLoading && (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid rgba(6, 182, 212, 0.2)', borderTopColor: '#06b6d4', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ marginTop: '14px', color: 'var(--accent-cyan)', fontSize: '0.92rem' }}>
                Querying English Wikipedia REST API for academic sources...
              </p>
            </div>
          )}

          {wikiError && !wikiLoading && (
            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #ef4444' }}>
              <p style={{ color: '#fca5a5', fontSize: '0.92rem' }}>{wikiError}</p>
              <button 
                onClick={() => handleWikiSearch(searchQuery)}
                className="btn-secondary"
                style={{ marginTop: '10px', fontSize: '0.8rem', padding: '6px 14px' }}
              >
                Retry Search
              </button>
            </div>
          )}

          {!wikiLoading && !wikiError && wikiResults.length === 0 && searchQuery && (
            <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                No Wikipedia articles found matching "{searchQuery}". Try a broader academic query or scientific term.
              </p>
            </div>
          )}

          {!wikiLoading && wikiResults.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
              {wikiResults.map((article) => {
                const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.key || article.title)}`;
                const thumbUrl = article.thumbnail?.url 
                  ? (article.thumbnail.url.startsWith('//') ? `https:${article.thumbnail.url}` : article.thumbnail.url)
                  : null;

                return (
                  <div
                    key={article.id || article.key}
                    className="glass-panel glass-panel-hover"
                    style={{
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTop: '3px solid #06b6d4'
                    }}
                  >
                    <div>
                      {/* Top badge & thumbnail */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                        <span className="badge-pill" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', border: '1px solid rgba(6, 182, 212, 0.3)', fontSize: '0.72rem' }}>
                          Wikipedia Article
                        </span>

                        {thumbUrl && (
                          <img
                            src={thumbUrl}
                            alt={article.title}
                            style={{
                              width: '56px',
                              height: '56px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid var(--border-subtle)'
                            }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px', lineHeight: 1.35 }}>
                        {article.title}
                      </h3>

                      {article.description && (
                        <p style={{ fontSize: '0.84rem', color: 'var(--accent-lavender)', fontWeight: 600, marginBottom: '8px' }}>
                          {article.description}
                        </p>
                      )}

                      {article.excerpt && (
                        <p 
                          style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}
                          dangerouslySetInnerHTML={{ 
                            __html: article.excerpt.replace(/<span class="highlight">/g, '<span style="color: #38bdf8; font-weight: 700;">') 
                          }}
                        />
                      )}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Globe size={13} color="#06b6d4" /> Verified External Source
                      </span>

                      <a
                        href={articleUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          color: '#38bdf8',
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Open on Wikipedia</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Featured Learning Paths Carousel (Shown in Curated Mode) */}
      {searchMode === 'curated' && (
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Structured Learning Paths
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem' }}>
              Curated multi-module tracks designed for structured mastery and exam revision.
            </p>
          </div>
          <span className="badge-pill badge-gold" style={{ fontSize: '0.74rem' }}>
            Curriculum Guided
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '16px' }}>
          {learningPaths.map((path) => (
            <div
              key={path.id}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${path.color}`
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: path.color, fontWeight: 700, textTransform: 'uppercase' }}>
                    {path.faculty}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    {path.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.4 }}>
                  {path.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {path.description}
                </p>
              </div>

              <button
                onClick={() => {
                  const targetSub = taleemSubjects.find(s => s.id === path.targetSubjectId);
                  if (targetSub) handleOpenSubject(targetSub);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>Start Learning Track</span>
                <ArrowRight size={14} color={path.color} />
              </button>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* 16 Academic Subjects Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Academic Faculties & Subjects ({filteredSubjects.length})
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem' }}>
              Click any subject to open its syllabus map, verified lecture notes, and bilingual glossary.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredSubjects.map((subject) => {
            const SubjectIcon = iconMap[subject.icon] || BookOpen;
            const totalTopics = subject.chapters.reduce((sum, ch) => sum + ch.topics.length, 0);

            return (
              <div
                key={subject.id}
                onClick={() => handleOpenSubject(subject)}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${subject.color}`
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: subject.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 16px ${subject.color}40`
                    }}>
                      <SubjectIcon size={22} color="#ffffff" />
                    </div>

                    <span className="badge-pill badge-purple" style={{ fontSize: '0.72rem' }}>
                      {subject.faculty}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                    {subject.name}
                  </h3>

                  <div className="urdu-text" style={{ fontSize: '1.02rem', color: 'var(--accent-lavender)', marginBottom: '8px', fontWeight: 600 }}>
                    {subject.urduName}
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {subject.tagline}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <BookOpen size={14} color="var(--accent-cyan)" /> {totalTopics} Verified Topics
                  </span>

                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Open Syllabus</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
            <p style={{ fontSize: '1.1rem' }}>No academic subjects matched your search filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedFaculty('All'); }}
              className="btn-secondary"
              style={{ marginTop: '12px' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
