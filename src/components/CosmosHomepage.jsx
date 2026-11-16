import React, { useState } from 'react';
import { 
  Orbit, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Layers, 
  Globe2, 
  Menu, 
  X,
  Radio,
  Search,
  BookOpen,
  Award,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Thermometer,
  Rocket,
  Telescope,
  HelpCircle,
  Clock,
  Eye,
  Shield,
  CheckCircle2,
  Share2
} from 'lucide-react';
import CinematicCosmosCanvas from './CinematicCosmosCanvas';
import CosmosViewer from './CosmosViewer';
import { 
  cosmosSolarSystem, 
  cosmosUniverseDeepSpace, 
  cosmosSpaceMissions, 
  cosmosLearnPaths 
} from '../data/cosmosExpandedData';

export default function CosmosHomepage({ 
  onEnterCosmos, 
  onExploreSolarSystem, 
  onNavigateHome, 
  onNavigateSubjects,
  onNavigateTutor,
  onLaunchQuiz
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero'); // 'hero' | 'solar' | 'universe' | 'missions' | 'learn'
  const [selectedPlanet, setSelectedPlanet] = useState(cosmosSolarSystem[3]); // Earth
  const [selectedDeepSpaceArticle, setSelectedDeepSpaceArticle] = useState(cosmosUniverseDeepSpace[0]);
  const [cosmosSearchQuery, setCosmosSearchQuery] = useState('');
  const [show3DSimulator, setShow3DSimulator] = useState(false);

  // Filtered planets or universe topics
  const searchFilter = cosmosSearchQuery.trim().toLowerCase();

  const filteredPlanets = searchFilter 
    ? cosmosSolarSystem.filter(p => p.name.toLowerCase().includes(searchFilter) || p.type.toLowerCase().includes(searchFilter) || p.tags.some(t => t.toLowerCase().includes(searchFilter)))
    : cosmosSolarSystem;

  const filteredMissions = searchFilter
    ? cosmosSpaceMissions.filter(m => m.name.toLowerCase().includes(searchFilter) || m.agency.toLowerCase().includes(searchFilter) || m.objective.toLowerCase().includes(searchFilter))
    : cosmosSpaceMissions;

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#040212',
      color: '#ffffff',
      fontFamily: 'var(--font-body)',
      position: 'relative'
    }}>
      {/* 1. CINEMATIC COSMIC BACKGROUND CANVAS (Keeps fixed behind entire page) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <CinematicCosmosCanvas reducedMotion={reducedMotion} />
        {/* Subtle radial vignette */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 35%, rgba(4, 2, 18, 0.85) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* 2. TOP CINEMATIC TRANSPARENT NAVIGATION BAR */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(4, 2, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
        padding: '16px clamp(16px, 4vw, 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand / Logo */}
        <div 
          onClick={onNavigateHome}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #38bdf8 0%, #8b5cf6 80%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 18px rgba(56, 189, 248, 0.6)'
          }}>
            <Orbit size={20} color="#ffffff" />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              color: '#ffffff'
            }}>
              NOVA LEARN
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.62rem',
              letterSpacing: '0.28em',
              color: 'var(--accent-cyan)',
              textTransform: 'uppercase'
            }}>
              Cosmos Division
            </span>
          </div>
        </div>

        {/* Center Navigation Links (Working Scroll Targets) */}
        <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '28px' }}>
          <button 
            onClick={() => scrollToSection('cosmos-hero')}
            style={navItemStyle}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('section-solar')}
            style={{ ...navItemStyle, color: 'var(--accent-cyan)' }}
          >
            Solar System
          </button>
          <button 
            onClick={() => scrollToSection('section-universe')}
            style={navItemStyle}
          >
            Universe
          </button>
          <button 
            onClick={() => scrollToSection('section-missions')}
            style={navItemStyle}
          >
            Space Missions
          </button>
          <button 
            onClick={() => scrollToSection('section-learn')}
            style={navItemStyle}
          >
            Learn Astronomy
          </button>
        </nav>

        {/* Right Action Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            title="Toggle background particle animation"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 12px',
              color: reducedMotion ? 'var(--accent-gold)' : 'var(--text-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Radio size={12} />
            <span className="hide-on-mobile">{reducedMotion ? 'Static' : 'Motion'}</span>
          </button>

          <button
            onClick={onNavigateHome}
            style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid var(--border-cyan)',
              color: 'var(--accent-cyan)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Main Hub
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'none',
              padding: '6px'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(4, 2, 18, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 45,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderBottom: '1px solid var(--border-glow)'
        }}>
          <button onClick={() => scrollToSection('cosmos-hero')} style={mobileNavItemStyle}>Cosmos Overview</button>
          <button onClick={() => scrollToSection('section-solar')} style={mobileNavItemStyle}>The Solar System (Sun & 8 Planets)</button>
          <button onClick={() => scrollToSection('section-universe')} style={mobileNavItemStyle}>Journey Through the Universe</button>
          <button onClick={() => scrollToSection('section-missions')} style={mobileNavItemStyle}>Historic & Modern Space Missions</button>
          <button onClick={() => scrollToSection('section-learn')} style={mobileNavItemStyle}>Learn Astronomy & Practice Quiz</button>
          <button onClick={onNavigateHome} style={{ ...mobileNavItemStyle, color: 'var(--accent-cyan)' }}>← Return to Nova Learn Hub</button>
        </div>
      )}

      {/* PAGE SCROLLABLE CONTENT BODY */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* =========================================================
            SECTION 1: CINEMATIC HERO (WITH WORKING SCROLL CTAs)
            ========================================================= */}
        <section 
          id="cosmos-hero"
          style={{
            minHeight: 'calc(100vh - 72px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 24px',
            position: 'relative'
          }}
        >
          {/* Subtle Category Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <Sparkles size={13} color="var(--accent-cyan)" />
            <span style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.28em',
              color: 'var(--accent-cyan)',
              textTransform: 'uppercase',
              fontWeight: 700
            }}>
              COSMOS OBSERVATORY & ASTROPHYSICS SUITE
            </span>
          </div>

          {/* Futuristic Hero Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6.5vw, 5.8rem)',
            fontWeight: 900,
            letterSpacing: '0.16em',
            lineHeight: 1.08,
            color: '#ffffff',
            textShadow: '0 0 45px rgba(56, 189, 248, 0.45), 0 0 90px rgba(168, 85, 247, 0.3)',
            marginBottom: '18px',
            textTransform: 'uppercase',
            maxWidth: '1100px'
          }}>
            EXPLORE THE UNIVERSE
          </h1>

          {/* Thin Glowing Divider Line */}
          <div style={{
            width: 'clamp(260px, 50%, 500px)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.8) 25%, #ffffff 50%, rgba(168, 85, 247, 0.8) 75%, transparent 100%)',
            marginBottom: '20px',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.8)'
          }} />

          {/* Subtitle */}
          <h2 style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
            fontWeight: 400,
            letterSpacing: '0.22em',
            color: '#e2e8f0',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Discover the Wonders Beyond Our World
          </h2>

          <p style={{
            fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
            lineHeight: 1.7,
            color: 'rgba(226, 232, 240, 0.85)',
            maxWidth: '680px',
            margin: '0 auto 34px auto'
          }}>
            Journey through planets, stars, galaxies, and distant worlds. Explore the science of the universe through interactive experiences, research-backed lessons, and real-time simulations.
          </p>

          {/* Working CTAs that smoothly scroll down to exploration sections */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => scrollToSection('section-solar')}
              className="cosmos-primary-cta"
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#060517',
                background: '#ffffff',
                padding: '16px 36px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.65), 0 4px 20px rgba(56, 189, 248, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              <span>EXPLORE THE SOLAR SYSTEM</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() => scrollToSection('section-universe')}
              className="cosmos-secondary-cta"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '15px 30px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease'
              }}
            >
              <Compass size={18} color="var(--accent-cyan)" />
              <span>JOURNEY THROUGH UNIVERSE</span>
            </button>
          </div>

          {/* Quick Scroll Indicator */}
          <div 
            onClick={() => scrollToSection('section-solar')}
            style={{
              marginTop: '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--text-dim)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            <span>Scroll Down to Explore</span>
            <ChevronDown size={18} color="var(--accent-cyan)" />
          </div>
        </section>

        {/* =========================================================
            SECTION 2: THE SOLAR SYSTEM & INTERACTIVE 3D PLANETARIUM
            ========================================================= */}
        <section 
          id="section-solar"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '60px 24px',
            scrollMarginTop: '80px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-pill badge-cyan">
                  <Orbit size={14} /> Planetary Science
                </span>
                <span className="badge-pill badge-purple">
                  The Sun & 8 Planets
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900 }}>
                Explore The Solar System
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '680px' }}>
                Inspect physical characteristics, orbital resonances, atmospheric constituents, and scientific facts.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShow3DSimulator(!show3DSimulator)}
                style={{
                  background: show3DSimulator ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-glow)',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Eye size={16} />
                <span>{show3DSimulator ? 'Hide 3D View' : 'Launch 3D WebGL Orbit'}</span>
              </button>
            </div>
          </div>

          {/* Interactive 3D Orbit View (Toggled or embedded) */}
          {show3DSimulator && (
            <div style={{ marginBottom: '36px' }}>
              <CosmosViewer />
            </div>
          )}

          {/* Horizontal Planet Selection Carousel */}
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '14px',
            marginBottom: '32px',
            scrollbarWidth: 'thin'
          }}>
            {cosmosSolarSystem.map((body) => {
              const isSelected = selectedPlanet.id === body.id;
              return (
                <button
                  key={body.id}
                  onClick={() => setSelectedPlanet(body)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(15, 12, 45, 0.85)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    color: isSelected ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    fontWeight: isSelected ? 800 : 500,
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? 'var(--glow-cyan)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>
                    {body.id === 'sun' ? '☀️' : body.id === 'earth' ? '🌍' : body.id === 'mars' ? '🔴' : body.id === 'saturn' ? '🪐' : '🌕'}
                  </span>
                  <span>{body.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Planet Deep-Dive Inspector Card */}
          <div className="glass-panel" style={{
            padding: 'clamp(24px, 4vw, 36px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--glow-purple)',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Left Column: Essential Planetary Profile */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className="badge-pill badge-cyan">{selectedPlanet.type}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Order #{selectedPlanet.order} from Sun</span>
                </div>

                <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '12px' }}>
                  {selectedPlanet.name}
                </h3>

                <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '20px' }}>
                  {selectedPlanet.overview}
                </p>

                <div style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid var(--border-cyan)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Scientific Note (Not to Scale Notice)
                  </span>
                  <p style={{ fontSize: '0.85rem', color: '#bae6fd', marginTop: '4px' }}>
                    {selectedPlanet.notToScaleNotice}
                  </p>
                </div>

                {/* Key Features Bullet List */}
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-lavender)', marginBottom: '8px' }}>
                  Prominent Geological & Atmospheric Features:
                </h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {selectedPlanet.keyFeatures.map((feat, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Key Astrophysical Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={metricBoxStyle}>
                  <span style={metricLabelStyle}>Mean Diameter</span>
                  <span style={metricValueStyle}>{selectedPlanet.diameter}</span>
                </div>
                <div style={metricBoxStyle}>
                  <span style={metricLabelStyle}>Surface Temperature</span>
                  <span style={metricValueStyle}>{selectedPlanet.surfaceTemp}</span>
                </div>
                <div style={metricBoxStyle}>
                  <span style={metricLabelStyle}>Distance from Sun</span>
                  <span style={metricValueStyle}>{selectedPlanet.distanceFromSun}</span>
                </div>
                <div style={metricBoxStyle}>
                  <span style={metricLabelStyle}>Orbital Period (Year)</span>
                  <span style={metricValueStyle}>{selectedPlanet.orbitalPeriod}</span>
                </div>
                <div style={metricBoxStyle}>
                  <span style={metricLabelStyle}>Rotation Period (Day)</span>
                  <span style={metricValueStyle}>{selectedPlanet.rotationPeriod}</span>
                </div>
                <div style={metricBoxStyle}>
                  <span style={metricLabelStyle}>Known Moons</span>
                  <span style={metricValueStyle}>{selectedPlanet.moons}</span>
                </div>
                <div style={{ ...metricBoxStyle, gridColumn: 'span 2' }}>
                  <span style={metricLabelStyle}>Atmospheric Composition</span>
                  <span style={{ ...metricValueStyle, fontSize: '0.9rem', fontWeight: 500, marginTop: '4px' }}>
                    {selectedPlanet.atmosphere}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: JOURNEY THROUGH THE UNIVERSE (DEEP SPACE)
            ========================================================= */}
        <section 
          id="section-universe"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '60px 24px',
            scrollMarginTop: '80px'
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <span className="badge-pill badge-purple" style={{ marginBottom: '8px' }}>
              Beyond The Solar System
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900 }}>
              Journey Through The Universe
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '720px' }}>
              Explore stellar evolution, the Hubble classification of galaxies, gravitational event horizons of black holes, and the cosmic microwave background.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {cosmosUniverseDeepSpace.map((topic) => (
              <div 
                key={topic.id}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '3px solid var(--accent-purple)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge-pill badge-cyan" style={{ fontSize: '0.72rem' }}>
                      {topic.category}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {topic.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: '#ffffff' }}>
                    {topic.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {topic.summary}
                  </p>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px',
                    marginBottom: '16px'
                  }}>
                    <pre style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {topic.content}
                    </pre>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {topic.tags.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '4px', color: 'var(--accent-lavender)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 4: SPACE MISSIONS & EXPLORATION FLEET
            ========================================================= */}
        <section 
          id="section-missions"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '60px 24px',
            scrollMarginTop: '80px'
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <span className="badge-pill badge-cyan" style={{ marginBottom: '8px' }}>
              Human & Robotic Exploration
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900 }}>
              Space Missions & Observatories
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '720px' }}>
              Verified historic and active missions deployed by space agencies to explore the cosmos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {cosmosSpaceMissions.map((mission) => (
              <div 
                key={mission.id}
                className="glass-panel"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge-pill badge-gold" style={{ fontSize: '0.72rem' }}>
                      {mission.agency}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#a7f3d0', fontWeight: 600 }}>
                      {mission.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, marginBottom: '6px' }}>
                    {mission.name}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginBottom: '12px' }}>
                    Target: {mission.destination} • Launch: {mission.launchDate}
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                    <strong>Objective:</strong> {mission.objective}
                  </p>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    fontSize: '0.84rem',
                    color: '#e2e8f0',
                    lineHeight: 1.5,
                    marginBottom: '16px'
                  }}>
                    <strong style={{ color: 'var(--accent-gold)' }}>Milestone:</strong> {mission.notableAchievement}
                  </div>
                </div>

                <a
                  href={mission.officialSource}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: 'var(--accent-cyan)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Official Mission Documentation</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 5: LEARN ASTRONOMY & QUIZ ARENA BRIDGE
            ========================================================= */}
        <section 
          id="section-learn"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '60px 24px 100px 24px',
            scrollMarginTop: '80px'
          }}
        >
          <div className="glass-panel" style={{
            padding: 'clamp(28px, 4vw, 42px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--glow-purple)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <span className="badge-pill badge-gold" style={{ marginBottom: '10px' }}>
                  Educational Pathways
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '12px' }}>
                  Master Astrophysics & Astronomy
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '24px' }}>
                  Take structured undergraduate lessons, test your orbital mechanics in the Quiz Arena, and consult the Nova AI Study Tutor for conceptual breakdowns.
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      if (onLaunchQuiz) {
                        onLaunchQuiz({
                          title: 'Orbital Mechanics & Planetary Motion Challenge',
                          questions: [
                            {
                              questionEn: 'According to Kepler’s Third Law, if planet A has an orbital distance twice that of planet B, how does its period compare?',
                              options: ['P² = a³ (Period increases by 2√2 times)', 'Period is exactly double', 'Period is quadrupled', 'Period remains identical'],
                              correct: 0,
                              explanation: 'P² = a³, so (2)³ = 8, meaning P = √8 = 2√2 ≈ 2.83 times longer.'
                            },
                            {
                              questionEn: 'What is the maximum mass limit for a stable White Dwarf star supported by electron degeneracy pressure?',
                              options: ['1.44 Solar Masses (Chandrasekhar Limit)', '3.0 Solar Masses', '0.08 Solar Masses', '20 Solar Masses'],
                              correct: 0,
                              explanation: 'The Chandrasekhar limit is ~1.44 solar masses.'
                            }
                          ]
                        }, 'Astrophysics & Space Science');
                      }
                    }}
                    className="btn-cyan"
                    style={{ minHeight: '44px' }}
                  >
                    <Award size={16} />
                    <span>Launch Astronomy Quiz</span>
                  </button>

                  <button
                    onClick={onNavigateTutor}
                    className="btn-secondary"
                    style={{ minHeight: '44px' }}
                  >
                    <span>Ask Nova Tutor About Space</span>
                  </button>
                </div>
              </div>

              {/* Right Side Learning Modules Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {cosmosLearnPaths.map((lp) => (
                  <div 
                    key={lp.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        {lp.level}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {lp.duration}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>
                      {lp.title}
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {lp.lessons.map((lesson, lIdx) => (
                        <div key={lIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                          <CheckCircle2 size={14} color="var(--accent-lavender)" />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Embedded Navigation CSS */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
        .cosmos-primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(255, 255, 255, 0.8) !important;
        }
        .cosmos-secondary-cta:hover {
          transform: translateY(-2px);
          border-color: var(--accent-cyan) !important;
          background: rgba(255, 255, 255, 0.15) !important;
        }
      `}</style>
    </div>
  );
}

const navItemStyle = {
  background: 'transparent',
  border: 'none',
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  color: 'rgba(255, 255, 255, 0.75)',
  cursor: 'pointer',
  padding: '6px 0',
  transition: 'color 0.2s ease'
};

const mobileNavItemStyle = {
  background: 'transparent',
  border: 'none',
  color: '#ffffff',
  fontSize: '1.05rem',
  fontWeight: 600,
  textAlign: 'left',
  cursor: 'pointer',
  padding: '8px 0'
};

const metricBoxStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-sm)',
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column'
};

const metricLabelStyle = {
  fontSize: '0.72rem',
  color: 'var(--text-dim)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em'
};

const metricValueStyle = {
  fontSize: '1.05rem',
  fontWeight: 700,
  color: '#ffffff',
  marginTop: '2px'
};
