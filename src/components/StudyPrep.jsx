import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Layers, 
  BookOpen, 
  FileText, 
  Sparkles, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Bookmark,
  Award,
  Filter
} from 'lucide-react';
import { subjectsData } from '../data/subjects';
import { addXp, unlockBadge } from '../utils/storage';

export default function StudyPrep({ onNavigateBack, onLaunchQuiz }) {
  const [activeTab, setActiveTab] = useState('flashcards'); // 'flashcards' | 'checklist' | 'pomodoro'
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');

  // Comprehensive Flashcard Collection across disciplines
  const allFlashcards = [
    {
      id: 'fc-1',
      subject: 'Psychology',
      subjectId: 'psychology',
      front: 'What are the 3 core subsystems in Baddeley & Hitch’s Working Memory Model?',
      back: '1. Central Executive: Controls attention & coordinates tasks.\n2. Phonological Loop: Manages speech, sound, and the inner voice.\n3. Visuo-Spatial Sketchpad: Handles spatial relationships & the mind’s eye.\n*Supplemented by the Episodic Buffer for chronological synthesis.',
      hint: 'Executive control paired with sensory scratchpads.'
    },
    {
      id: 'fc-2',
      subject: 'Psychology',
      subjectId: 'psychology',
      front: 'Define Piaget\'s concept of "Object Permanence" and when it emerges.',
      back: 'The cognitive understanding that objects continue to exist even when they cannot be directly seen, heard, or touched.\n\nTypically acquired between 4 to 8 months during the Sensorimotor Stage.',
      hint: 'Peak-a-boo comprehension milestone.'
    },
    {
      id: 'fc-3',
      subject: 'Mathematics',
      subjectId: 'mathematics',
      front: 'What is the limit definition of a Derivative f\'(x)?',
      back: 'f\'(x) = lim (h -> 0) [f(x + h) - f(x)] / h\n\nGeometrically, it represents the exact gradient of the tangent line to the curve at point x.',
      hint: 'Difference quotient as increment h vanishes toward zero.'
    },
    {
      id: 'fc-4',
      subject: 'Mathematics',
      subjectId: 'mathematics',
      front: 'State the Fundamental Theorem of Calculus (Part 1).',
      back: 'If f is continuous on [a, b] and F is defined by F(x) = ∫[a to x] f(t) dt, then F is differentiable on (a, b) and:\nF\'(x) = f(x).\n\nIntegration and differentiation are inverse operations.',
      hint: 'The link connecting derivatives and integrals.'
    },
    {
      id: 'fc-5',
      subject: 'Urdu Literature',
      subjectId: 'urdu',
      front: 'In Urdu Ghazal, what is the precise distinction between Qafia and Radeef?',
      back: 'قافیہ (Qafia): ہم وزن اور ہم آواز الفاظ جو ردیف سے پہلے آتے ہیں (جیسے: نام، جام، کام)۔\n\nردیف (Radeef): وہ مستقل الفاظ جو ہر شعر کے آخر میں من و عن دہرائے جاتے ہیں (جیسے: "ہوتے تو کیا ہوتا")۔',
      hint: 'One rhymes rhythmically; the other repeats verbatim.'
    },
    {
      id: 'fc-6',
      subject: 'Computer Science',
      subjectId: 'computer-science',
      front: 'Compare the average vs worst-case time complexity of Quick Sort.',
      back: 'Average Case: O(n log n) with balanced partitioning.\n\nWorst Case: O(n²) when the chosen pivot consistently yields maximally skewed partitions (e.g. already sorted array without random pivot).',
      hint: 'Divide-and-conquer recursion depth.'
    },
    {
      id: 'fc-7',
      subject: 'Computer Science',
      subjectId: 'computer-science',
      front: 'What is the difference between a Process and a Thread in Operating Systems?',
      back: 'A Process is an executing instance of a program with its own private address space and isolated system resources.\n\nA Thread is a lightweight dispatch unit within a process that shares code, data, and open files with sibling threads.',
      hint: 'Isolated memory space vs shared execution threads.'
    },
    {
      id: 'fc-8',
      subject: 'Space & Astronomy',
      subjectId: 'space-astronomy',
      front: 'State Kepler\'s Three Laws of Planetary Motion.',
      back: '1. Law of Ellipses: Orbits are ellipses with the Sun at one focus.\n2. Law of Equal Areas: Equal areas swept in equal time intervals.\n3. Harmonic Law: P² = a³ (square of orbital period proportional to cube of semi-major axis).',
      hint: 'Ellipses, equal area velocity, and P² = a³.'
    },
    {
      id: 'fc-9',
      subject: 'Economics',
      subjectId: 'economics',
      front: 'What is the formula and interpretation of Price Elasticity of Demand (PED)?',
      back: 'PED = (% Change in Quantity Demanded) / (% Change in Price)\n\n• |PED| > 1: Elastic (consumers sensitive, substitutes exist)\n• |PED| < 1: Inelastic (necessities, insulin, staple grains)\n• |PED| = 1: Unitary elasticity',
      hint: 'Percentage responsiveness of quantity to price.'
    },
    {
      id: 'fc-10',
      subject: 'Educational Pedagogy',
      subjectId: 'education-pedagogy',
      front: 'List the 6 tiers of Bloom\'s Revised Taxonomy from lowest to highest.',
      back: '1. Remembering (Recall facts)\n2. Understanding (Explain concepts)\n3. Applying (Use information in new situations)\n4. Analyzing (Draw connections among ideas)\n5. Evaluating (Justify a stance or decision)\n6. Creating (Produce new or original work)',
      hint: 'R-U-A-A-E-C cognitive progression.'
    }
  ];

  // Filtered Deck
  const activeDeck = selectedSubjectFilter === 'All' 
    ? allFlashcards 
    : allFlashcards.filter(c => c.subjectId === selectedSubjectFilter);

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState(new Set());

  // Revision Checklist State
  const [checklist, setChecklist] = useState([
    { id: 'c1', text: 'Master Working Memory Model (Baddeley-Hitch)', subject: 'Psychology', done: true },
    { id: 'c2', text: 'Derive Limit Definition for Differential Calculus', subject: 'Mathematics', done: true },
    { id: 'c3', text: 'Memorize Urdu Ghazal anatomical elements (Matla, Maqta, Qafia)', subject: 'Urdu', done: false },
    { id: 'c4', text: 'Review Big-O complexities for Binary Search & Quick Sort', subject: 'Computer Science', done: false },
    { id: 'c5', text: 'Analyze Price Elasticity of Demand (PED) formulations', subject: 'Economics', done: false },
    { id: 'c6', text: 'Review Indus Valley Civilizations & Harappan Grid Planning', subject: 'History', done: false },
    { id: 'c7', text: 'Review Bloom\'s Revised Taxonomy Cognitive Tiers', subject: 'Pedagogy', done: false },
    { id: 'c8', text: 'Understand Plate Tectonics & Continental Convergent Boundaries', subject: 'Geography', done: false }
  ]);

  // Pomodoro Study Timer State
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState('focus'); // 'focus' (25m) | 'shortBreak' (5m) | 'longBreak' (15m)
  const [completedSessions, setCompletedSessions] = useState(0);

  // Pomodoro Tick Effect
  useEffect(() => {
    let interval = null;
    if (isPomoRunning) {
      interval = setInterval(() => {
        if (pomoSeconds > 0) {
          setPomoSeconds(prev => prev - 1);
        } else if (pomoMinutes > 0) {
          setPomoMinutes(prev => prev - 1);
          setPomoSeconds(59);
        } else {
          // Timer finished!
          setIsPomoRunning(false);
          if (pomoMode === 'focus') {
            setCompletedSessions(prev => prev + 1);
            addXp(50);
            unlockBadge({
              id: 'pomodoro_scholar',
              title: 'Deep Focus Master',
              icon: '⏳',
              desc: 'Completed a 25-minute deep focus study session'
            });
            alert('🎉 Outstanding focus! 25-minute study block finished. Earned +50 XP!');
            setPomoMode('shortBreak');
            setPomoMinutes(5);
            setPomoSeconds(0);
          } else {
            alert('Break complete! Ready to start your next study interval?');
            setPomoMode('focus');
            setPomoMinutes(25);
            setPomoSeconds(0);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoMinutes, pomoSeconds, pomoMode]);

  const setTimerPreset = (mode) => {
    setIsPomoRunning(false);
    setPomoMode(mode);
    if (mode === 'focus') {
      setPomoMinutes(25);
      setPomoSeconds(0);
    } else if (mode === 'shortBreak') {
      setPomoMinutes(5);
      setPomoSeconds(0);
    } else if (mode === 'longBreak') {
      setPomoMinutes(15);
      setPomoSeconds(0);
    }
  };

  // Safe Indexing for filtered deck
  const safeIndex = cardIndex >= activeDeck.length ? 0 : cardIndex;
  const currentCard = activeDeck[safeIndex] || allFlashcards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((idx) => (idx + 1) % activeDeck.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((idx) => (idx - 1 + activeDeck.length) % activeDeck.length);
  };

  const markMastered = () => {
    const updated = new Set(masteredCards);
    updated.add(currentCard.id);
    setMasteredCards(updated);
    addXp(15);
    handleNextCard();
  };

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.done;
        if (nextState) addXp(15);
        return { ...item, done: nextState };
      }
      return item;
    }));
  };

  const completedCount = checklist.filter(c => c.done).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '10px 0 40px 0' }}>
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
          Study Preparation & Revision Suite
        </span>
      </div>

      {/* Main Workspace Frame */}
      <div className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 36px)', borderRadius: 'var(--radius-lg)' }}>
        {/* Workspace Subtabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('flashcards')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'flashcards' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
              border: activeTab === 'flashcards' ? '1px solid var(--border-glow)' : '1px solid transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Layers size={18} />
            <span>Flashcards ({activeDeck.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'checklist' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
              border: activeTab === 'checklist' ? '1px solid var(--border-glow)' : '1px solid transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckSquare size={18} />
            <span>Revision Checklist ({progressPercent}%)</span>
          </button>

          <button
            onClick={() => setActiveTab('pomodoro')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'pomodoro' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
              border: activeTab === 'pomodoro' ? '1px solid var(--border-glow)' : '1px solid transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Clock size={18} />
            <span>Deep Focus Pomodoro</span>
          </button>
        </div>

        {/* =========================================================
            TAB 1: DIGITAL FLASHCARD DECK
            ========================================================= */}
        {activeTab === 'flashcards' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Subject Filter Bar */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter Deck:</span>
                <select
                  value={selectedSubjectFilter}
                  onChange={(e) => {
                    setSelectedSubjectFilter(e.target.value);
                    setCardIndex(0);
                    setIsFlipped(false);
                  }}
                  style={{
                    background: 'rgba(14, 11, 40, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '6px 12px',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="All">All Disciplines ({allFlashcards.length} cards)</option>
                  <option value="psychology">Psychology</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="urdu">Urdu Literature</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="space-astronomy">Space & Astronomy</option>
                  <option value="economics">Economics</option>
                  <option value="education-pedagogy">Educational Pedagogy</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Card {safeIndex + 1} of {activeDeck.length}</span>
                <span className="badge-pill badge-cyan">{currentCard.subject}</span>
                {masteredCards.has(currentCard.id) && (
                  <span className="badge-pill badge-gold" style={{ fontSize: '0.7rem' }}>✓ Mastered</span>
                )}
              </div>
            </div>

            {/* Flip Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                width: '100%',
                maxWidth: '680px',
                minHeight: '300px',
                background: isFlipped 
                  ? 'linear-gradient(135deg, rgba(39, 32, 88, 0.95), rgba(18, 14, 48, 0.95))'
                  : 'linear-gradient(135deg, rgba(26, 21, 59, 0.9), rgba(14, 11, 40, 0.9))',
                border: isFlipped ? '1px solid var(--border-cyan)' : '1px solid var(--border-glow)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isFlipped ? 'var(--glow-cyan)' : 'var(--glow-purple)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: isFlipped ? 'var(--accent-cyan)' : 'var(--accent-lavender)', fontWeight: 700 }}>
                  {isFlipped ? 'Concept Breakdown & Solution (Click to flip back)' : 'Conceptual Prompt (Click anywhere to flip)'}
                </span>

                <div style={{ marginTop: '16px' }}>
                  {!isFlipped ? (
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.5 }}>
                      {currentCard.front}
                    </h3>
                  ) : (
                    <pre style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.02rem',
                      color: '#e0f2fe',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {currentCard.back}
                    </pre>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginTop: '20px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  {!isFlipped ? `Hint: ${currentCard.hint}` : 'Review this concept or advance to the next card.'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RotateCw size={14} /> Flip Card
                </span>
              </div>
            </div>

            {/* Navigation and mastery buttons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={handlePrevCard} className="btn-secondary" style={{ padding: '10px 20px' }}>
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>
              <button 
                onClick={markMastered}
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#a7f3d0',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 22px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={16} />
                <span>I Know This (+15 XP)</span>
              </button>
              <button 
                onClick={() => { addXp(10); handleNextCard(); }} 
                className="btn-primary" 
                style={{ padding: '10px 24px' }}
              >
                <span>Next Card (+10 XP)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: PERSISTENT REVISION CHECKLIST
            ========================================================= */}
        {activeTab === 'checklist' && (
          <div>
            {/* Progress Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                  Undergraduate Exam Preparedness
                </span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  {completedCount} / {checklist.length} Completed ({progressPercent}%)
                </span>
              </div>

              <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>

            {/* Checklist items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: item.done ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: item.done ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: item.done ? '1px solid #10b981' : '1px solid var(--border-glow)',
                      background: item.done ? '#10b981' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.done && <CheckCircle2 size={16} color="#ffffff" />}
                    </div>
                    <span style={{
                      fontSize: '0.94rem',
                      color: item.done ? '#a7f3d0' : '#ffffff',
                      textDecoration: item.done ? 'line-through' : 'none',
                      fontWeight: 500
                    }}>
                      {item.text}
                    </span>
                  </div>

                  <span className="badge-pill badge-purple" style={{ fontSize: '0.72rem' }}>
                    {item.subject}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: DEEP FOCUS POMODORO TIMER
            ========================================================= */}
        {activeTab === 'pomodoro' && (
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto', padding: '10px 0' }}>
            <span className="badge-pill badge-cyan" style={{ marginBottom: '12px' }}>
              Pomodoro Cognitive Technique
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px' }}>
              Deep Focus Study Sessions
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
              Study in structured 25-minute uninterrupted intervals followed by short mental rests to maximize synaptic retention.
            </p>

            {/* Mode selection buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px' }}>
              <button
                onClick={() => setTimerPreset('focus')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: pomoMode === 'focus' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.04)',
                  border: pomoMode === 'focus' ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Deep Study (25m)
              </button>
              <button
                onClick={() => setTimerPreset('shortBreak')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: pomoMode === 'shortBreak' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.04)',
                  border: pomoMode === 'shortBreak' ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => setTimerPreset('longBreak')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: pomoMode === 'longBreak' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
                  border: pomoMode === 'longBreak' ? '1px solid #facc15' : '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Big Timer Display */}
            <div style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(14, 11, 40, 0.9) 70%)',
              border: '3px solid var(--border-glow)',
              boxShadow: isPomoRunning ? 'var(--glow-purple)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px auto',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ fontSize: '3.6rem', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                {String(pomoMinutes).padStart(2, '0')}:{String(pomoSeconds).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                {pomoMode === 'focus' ? 'Focus Interval' : 'Rest & Refresh'}
              </span>
            </div>

            {/* Timer Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
              <button
                onClick={() => setIsPomoRunning(!isPomoRunning)}
                className="btn-cyan"
                style={{ padding: '12px 32px', fontSize: '1rem', minHeight: '46px' }}
              >
                {isPomoRunning ? <Pause size={18} /> : <Play size={18} />}
                <span>{isPomoRunning ? 'Pause Session' : 'Start Focus Session'}</span>
              </button>
              <button
                onClick={() => setTimerPreset(pomoMode)}
                className="btn-secondary"
                style={{ padding: '12px 20px', minHeight: '46px' }}
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 18px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
              <Award size={16} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Sessions Completed Today: <strong style={{ color: '#ffffff' }}>{completedSessions}</strong> (+{completedSessions * 50} XP)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
