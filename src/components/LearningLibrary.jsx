import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Download, 
  Filter, 
  BookOpen, 
  Layers, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  Tag
} from 'lucide-react';
import { subjectsData } from '../data/subjects';

export default function LearningLibrary({ onNavigateBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  // Comprehensive Resource Library Catalog
  const libraryItems = [
    {
      id: 'res-1',
      title: 'Baddeley-Hitch Working Memory Architecture Guide',
      subject: 'Psychology',
      subjectId: 'psychology',
      level: 'Undergraduate',
      type: 'Lecture Summary & Diagram Sheet',
      size: '1.4 MB',
      description: 'Comprehensive breakdown of Central Executive, Phonological Loop, and Visuo-Spatial Sketchpad mechanisms.'
    },
    {
      id: 'res-2',
      title: 'Calculus Limit Definitions & Derivatives Quick Reference',
      subject: 'Mathematics',
      subjectId: 'mathematics',
      level: 'College / Undergrad',
      type: 'Formula Sheet & Solved Proofs',
      size: '2.1 MB',
      description: 'Step-by-step differentiation formulas, quotient rules, and real-world kinematic applications.'
    },
    {
      id: 'res-3',
      title: 'اردو غزل کے ارکان و تشریح نوٹس (Urdu Ghazal Elements)',
      subject: 'Urdu',
      subjectId: 'urdu',
      level: 'Higher Secondary',
      type: 'Urdu Literary Guide',
      size: '1.8 MB',
      description: 'مطلع، مقطع، قافیہ اور ردیف کی مکمل سائنسی و ادبی تعریفیں مع مشہور اساتذہ کے اشعار۔'
    },
    {
      id: 'res-4',
      title: 'Algorithms & Big-O Time Complexity Master Chart',
      subject: 'Computer Science',
      subjectId: 'computer-science',
      level: 'Undergraduate',
      type: 'Cheat Sheet & Code Snippets',
      size: '950 KB',
      description: 'Comparison of Search (Linear, Binary) and Sorting (Merge, Quick, Heap) algorithms with spatial footprints.'
    },
    {
      id: 'res-5',
      title: 'Microeconomics: Supply, Demand & Elasticity Curves',
      subject: 'Economics',
      subjectId: 'economics',
      level: 'Undergraduate',
      type: 'Worksheet & Case Studies',
      size: '1.2 MB',
      description: 'Price elasticity coefficients, consumer surplus matrices, and market equilibrium graphs.'
    },
    {
      id: 'res-6',
      title: 'Classical Narrative Structures & Freytag\'s Pyramid',
      subject: 'Literature and Novels',
      subjectId: 'literature-novels',
      level: 'Undergraduate',
      type: 'Critical Essay Outline',
      size: '1.1 MB',
      description: 'Exposition, climax, and denouement analysis templates for classic 19th and 20th century novels.'
    },
    {
      id: 'res-7',
      title: 'Indus Valley Urban Civilizations Archeological Survey',
      subject: 'History',
      subjectId: 'history',
      level: 'Higher Secondary',
      type: 'Historical Map & Notes',
      size: '3.2 MB',
      description: 'Harappa and Mohenjo-Daro urban architecture, drainage systems, and social organization summaries.'
    },
    {
      id: 'res-8',
      title: 'Plate Tectonics & Continental Boundary Dynamics',
      subject: 'Geography',
      subjectId: 'geography',
      level: 'College',
      type: 'Cartography & Notes',
      size: '2.4 MB',
      description: 'Detailed study of lithospheric subduction zones, convergent fault lines, and Himalayan orogeny.'
    },
    {
      id: 'res-9',
      title: 'Kepler\'s Laws of Orbital Mechanics & Gravitational Math',
      subject: 'Space and Astronomy',
      subjectId: 'space-astronomy',
      level: 'Undergraduate',
      type: 'Astrophysics Study Module',
      size: '2.8 MB',
      description: 'Mathematical derivation of elliptical orbits, orbital period calculations, and planetary telemetry.'
    },
    {
      id: 'res-10',
      title: 'Bloom\'s Revised Taxonomy Lesson Planning Framework',
      subject: 'Educational Pedagogy',
      subjectId: 'education-pedagogy',
      level: 'University Education',
      type: 'Teacher Training Guide',
      size: '1.6 MB',
      description: 'Practical instructional rubrics mapped from lower-order recall to higher-order synthesis and creation.'
    }
  ];

  // Filtering Logic
  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'All' || item.level.toLowerCase().includes(selectedClass.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || item.subjectId === selectedSubject;

    return matchesSearch && matchesClass && matchesSubject;
  });

  const handleDownload = (item) => {
    alert(`Downloading "${item.title}" (${item.size})\nSample open-access educational document prepared for Nova Learn.`);
  };

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '10px 0 40px 0' }}>
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
          Taleem for All • Open Educational Resources
        </span>
      </div>

      {/* Main Workspace Frame */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '6px' }}>
            Free Learning Library
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '640px', margin: '0 auto' }}>
            Free class-wise notes, downloadable worksheets, lecture summaries, and bilingual study guides curated for college and university students.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '14px',
          background: 'rgba(14, 11, 40, 0.9)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '32px'
        }}>
          {/* Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-sm)', padding: '0 14px' }}>
            <Search size={18} color="var(--accent-cyan)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or subject..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '12px 0',
                outline: 'none',
                fontSize: '0.92rem'
              }}
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                color: '#ffffff',
                outline: 'none',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="All" style={{ background: '#0e0c28' }}>All Academic Subjects</option>
              {subjectsData.map(s => (
                <option key={s.id} value={s.id} style={{ background: '#0e0c28' }}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Class / Level Filter */}
          <div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                color: '#ffffff',
                outline: 'none',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="All" style={{ background: '#0e0c28' }}>All Education Levels</option>
              <option value="Undergraduate" style={{ background: '#0e0c28' }}>Undergraduate</option>
              <option value="Higher Secondary" style={{ background: '#0e0c28' }}>Higher Secondary (College)</option>
              <option value="Secondary" style={{ background: '#0e0c28' }}>Secondary (Matric / O-Level)</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '20px' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge-pill badge-purple" style={{ fontSize: '0.72rem' }}>
                    {item.subject}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {item.level}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.4 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FileText size={14} color="var(--accent-cyan)" /> {item.size}
                </span>

                <button
                  onClick={() => handleDownload(item)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid var(--border-cyan)',
                    color: 'var(--accent-cyan)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
            <p style={{ fontSize: '1.1rem' }}>No learning resources matched your search filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedSubject('All'); setSelectedClass('All'); }}
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
