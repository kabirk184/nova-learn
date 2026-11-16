import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Lightbulb, 
  Key, 
  ShieldAlert, 
  CheckCircle, 
  BookOpen, 
  Cpu, 
  RotateCcw, 
  Copy, 
  Check, 
  AlertCircle, 
  HelpCircle,
  ExternalLink,
  BookMarked,
  ArrowRight
} from 'lucide-react';
import { addXp } from '../utils/storage';
import { checkTutorStatus, sendChatMessage } from '../services/tutorApi';

const SUGGESTED_PROMPTS = [
  "Explain what is educational psychology in detail",
  "Explain the major theories of learning with examples",
  "What is the difference between classical and operant conditioning?",
  "Create 10 university-level MCQs about biological factors of deviance",
  "Explain photosynthesis step by step",
  "Solve a calculus derivative problem and show every step of working",
  "Give me detailed notes on the functions of education in society"
];

export default function TutorWorkspace({ onNavigateBack, initialPrompt = null, initialTopic = null }) {
  const [messages, setMessages] = useState(() => [
    {
      sender: 'bot',
      topic: 'Nova AI Assistant',
      content: "Hello! I'm your Nova Learn AI Study Tutor. Ask me anything about your subjects, request detailed notes, explore difficult concepts, or prepare for your exams."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [explanationDepth, setExplanationDepth] = useState('detailed'); // 'simple' | 'detailed'
  const [selectedSubject, setSelectedSubject] = useState(initialTopic || 'All Subjects');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  const chatBottomRef = useRef(null);

  // Check server and AI provider status on mount
  useEffect(() => {
    checkTutorStatus().then(status => {
      setServerStatus(status);
    });
  }, []);

  // Handle initial inquiry navigation from other sections (e.g. library)
  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (queryText) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    setErrorMessage(null);
    const userMessage = { sender: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage({
        messages: updatedMessages,
        explanationDepth,
        currentSubject: selectedSubject !== 'All Subjects' ? selectedSubject : null
      });

      const botReply = {
        sender: 'bot',
        topic: selectedSubject !== 'All Subjects' ? selectedSubject : 'AI Study Tutor',
        content: result.response,
        provider: result.provider,
        usedFallback: result.usedFallback,
        relevantLessons: result.relevantLessons || [],
        followUps: result.suggestedFollowUps || []
      };

      setMessages([...updatedMessages, botReply]);
      addXp(10); // Reward active learning engagement
    } catch (err) {
      console.error('Tutor Workspace Error:', err);
      const friendlyError = err.message || 'Unable to connect to Nova AI Tutor proxy.';
      setErrorMessage(friendlyError);

      const errorBotMessage = {
        sender: 'bot',
        topic: 'System Notice',
        content: `⚠️ ${friendlyError}\n\nTroubleshooting:\n• Ensure the backend server is running (\`node server/index.js\` on port 3001)\n• Verify your free GROQ_API_KEY or GEMINI_API_KEY in \`.env\`\n• If your daily free quota is exhausted, questions will automatically resume upon quota reset.`,
        isError: true
      };
      setMessages([...updatedMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'bot',
        topic: 'Nova AI Assistant',
        content: "Hello! I'm your Nova Learn AI Study Tutor. Ask me anything about your subjects, request detailed notes, explore difficult concepts, or prepare for your exams."
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '10px 0 40px 0' }}>
      {/* Top Header & Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {onNavigateBack && (
          <button
            onClick={onNavigateBack}
            className="btn-glass"
            style={{
              padding: '8px 16px',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              fontSize: '0.86rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '40px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            ← Return to Main Hub
          </button>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginLeft: 'auto'
        }}>
          {/* Active AI Status Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: serverStatus?.hasApiKey ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: serverStatus?.hasApiKey ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
            padding: '5px 12px',
            borderRadius: 'var(--radius-full)',
            color: serverStatus?.hasApiKey ? '#34d399' : '#fbbf24',
            fontSize: '0.78rem',
            fontWeight: 700,
            minHeight: '36px'
          }}>
            <Cpu size={14} style={{ flexShrink: 0 }} />
            <span>
              {serverStatus?.hasApiKey 
                ? `${serverStatus.primaryProvider || serverStatus.provider}${serverStatus.fallbackConfigured ? ' (+Fallback)' : ''}`
                : 'API Key Needed'}
            </span>
          </div>

          <button
            onClick={() => setShowConfigModal(!showConfigModal)}
            className="btn-glass"
            style={{
              padding: '6px 14px',
              color: 'var(--accent-lavender)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              minHeight: '36px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <Key size={14} style={{ flexShrink: 0 }} />
            <span>Setup Instructions</span>
          </button>

          <button
            onClick={handleClearChat}
            title="Start new conversation"
            className="btn-glass"
            style={{
              padding: '6px 12px',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '36px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <RotateCcw size={14} style={{ flexShrink: 0 }} />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* AI Key Configuration Guide Drawer */}
      {showConfigModal && (
        <div style={{
          background: 'rgba(18, 14, 48, 0.98)',
          border: '1px solid var(--accent-purple)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(16px, 3vw, 24px)',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
              <Sparkles size={20} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Connecting a Free Real AI Model</h3>
            </div>
            <button
              onClick={() => setShowConfigModal(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '1.2rem', padding: '4px' }}
            >
              ✕
            </button>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: '16px' }}>
            Nova Learn runs an isolated local proxy server (running on <code>http://localhost:3001</code>) that processes student prompts server-side without exposing API keys to client browsers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px'
            }}>
              <span className="badge-pill badge-cyan" style={{ marginBottom: '8px' }}>Option A: Groq Cloud (Recommended Primary)</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
                Fast inference model on official free tier (no credit card or billing required).
              </p>
              <ol style={{ fontSize: '0.78rem', color: '#cbd5e1', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li>Get a free key from <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>Groq Console</a></li>
                <li><strong>Local:</strong> Add <code>GROQ_API_KEY=your_key</code> in <code>.env</code></li>
                <li><strong>Cloud:</strong> Add in your hosting provider's Environment Variables</li>
              </ol>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px'
            }}>
              <span className="badge-pill badge-purple" style={{ marginBottom: '8px' }}>Option B: Google Gemini (Secondary Fallback)</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
                Instant automatic fallback provider if Groq is temporarily busy or rate-limited.
              </p>
              <ol style={{ fontSize: '0.78rem', color: '#cbd5e1', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li>Get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-lavender)' }}>Google AI Studio</a></li>
                <li><strong>Local:</strong> Add <code>GEMINI_API_KEY=your_key</code> in <code>.env</code></li>
                <li><strong>Dual-Provider:</strong> Adding both provides seamless automatic failover</li>
              </ol>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span>🔒 <strong>Zero Billing Risk:</strong> Only free-tier endpoints are utilized. No credit cards required.</span>
            <span>🎓 <strong>60-Student Capacity:</strong> Server-side daily quotas protect and buffer rate limits.</span>
          </div>
        </div>
      )}

      {/* Main Tutor Chat Panel */}
      <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {/* Controls Bar */}
        <div style={{
          padding: 'clamp(14px, 2.5vw, 18px) clamp(16px, 3vw, 24px)',
          background: 'rgba(26, 21, 59, 0.9)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}>
          {/* Tutor Title & Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
              flexShrink: 0
            }}>
              <Bot size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Nova AI Study Tutor</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Intelligent academic coach across all 15 university subjects
              </p>
            </div>
          </div>

          {/* Controls: Subject Focus & Explanation Depth */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            width: 'auto'
          }}>
            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                background: 'rgba(15, 12, 38, 0.95)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none',
                cursor: 'pointer',
                minHeight: '36px',
                maxWidth: '100%'
              }}
            >
              <option value="All Subjects" style={{ background: '#120e30' }}>Focus: All Subjects</option>
              <option value="Psychology" style={{ background: '#120e30' }}>Psychology</option>
              <option value="Education" style={{ background: '#120e30' }}>Education & Pedagogy</option>
              <option value="Mathematics" style={{ background: '#120e30' }}>Mathematics</option>
              <option value="English" style={{ background: '#120e30' }}>English & Grammar</option>
              <option value="Urdu" style={{ background: '#120e30' }}>Urdu Literature</option>
              <option value="Economics" style={{ background: '#120e30' }}>Economics</option>
              <option value="Biology" style={{ background: '#120e30' }}>Biology</option>
              <option value="Physics" style={{ background: '#120e30' }}>Physics</option>
              <option value="Chemistry" style={{ background: '#120e30' }}>Chemistry</option>
              <option value="Computer Science" style={{ background: '#120e30' }}>Computer Science</option>
              <option value="History" style={{ background: '#120e30' }}>History</option>
              <option value="Geography" style={{ background: '#120e30' }}>Geography</option>
              <option value="Sociology" style={{ background: '#120e30' }}>Sociology & Criminology</option>
              <option value="Space & Astronomy" style={{ background: '#120e30' }}>Space & Astronomy</option>
            </select>

            {/* Depth Selector */}
            <div style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '2px',
              minHeight: '36px',
              alignItems: 'center'
            }}>
              <button
                type="button"
                onClick={() => setExplanationDepth('simple')}
                style={{
                  background: explanationDepth === 'simple' ? 'var(--accent-purple)' : 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '30px'
                }}
              >
                Simple
              </button>
              <button
                type="button"
                onClick={() => setExplanationDepth('detailed')}
                style={{
                  background: explanationDepth === 'detailed' ? 'var(--accent-purple)' : 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '30px'
                }}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>

        {/* Chat Feed */}
        <div style={{
          minHeight: '360px',
          maxHeight: '560px',
          overflowY: 'auto',
          padding: 'clamp(14px, 3vw, 24px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              <div style={{
                maxWidth: 'min(92%, 760px)',
                width: 'fit-content',
                padding: 'clamp(12px, 2.5vw, 18px) clamp(14px, 3vw, 22px)',
                borderRadius: 'var(--radius-md)',
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-violet))'
                  : msg.isError
                    ? 'rgba(239, 68, 68, 0.12)'
                    : 'rgba(18, 14, 48, 0.95)',
                border: msg.sender === 'user' ? 'none' : msg.isError ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                position: 'relative',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {msg.topic && (
                      <span className={`badge-pill ${msg.isError ? 'badge-coral' : 'badge-purple'}`} style={{ fontSize: '0.7rem' }}>
                        {msg.topic}
                      </span>
                    )}
                    {msg.provider && (
                      <span style={{
                        fontSize: '0.68rem',
                        color: msg.usedFallback ? '#fbbf24' : '#38bdf8',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: 600
                      }}>
                        {msg.provider}
                      </span>
                    )}
                  </div>

                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleCopy(msg.content, i)}
                      title="Copy response"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedIndex === i ? 'var(--accent-cyan)' : 'var(--text-dim)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.74rem',
                        padding: '4px'
                      }}
                    >
                      {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedIndex === i ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>

                <div style={{
                  fontSize: 'clamp(0.88rem, 1.8vw, 0.95rem)',
                  color: '#ffffff',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'var(--font-sans)'
                }}>
                  {msg.content}
                </div>

                {/* Connected Library Lessons Links */}
                {msg.relevantLessons && msg.relevantLessons.length > 0 && (
                  <div style={{
                    marginTop: '14px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                      <BookOpen size={13} />
                      <span>Referenced from Nova Learn Library:</span>
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {msg.relevantLessons.map((l, lIdx) => (
                        <div
                          key={lIdx}
                          style={{
                            background: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid var(--border-cyan)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '4px 10px',
                            fontSize: '0.78rem',
                            color: '#e0f2fe'
                          }}
                        >
                          <strong>{l.subject}:</strong> {l.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up question chips */}
              {msg.followUps && msg.followUps.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '8px',
                  maxWidth: 'min(92%, 760px)'
                }}>
                  {msg.followUps.map((fu, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => handleSend(fu)}
                      style={{
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid var(--border-cyan)',
                        color: 'var(--accent-cyan)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.76rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        textAlign: 'left'
                      }}
                    >
                      <Lightbulb size={12} style={{ flexShrink: 0 }} />
                      <span>{fu}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              background: 'rgba(18, 14, 48, 0.7)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              width: 'fit-content',
              color: 'var(--accent-cyan)',
              fontSize: '0.85rem'
            }}>
              <Bot size={18} className="animate-spin" />
              <span>Nova AI Tutor is synthesizing comprehensive response...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Prompts Shelf */}
        <div style={{
          padding: '10px 16px',
          background: 'rgba(10, 8, 30, 0.8)',
          borderTop: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          display: 'flex',
          gap: '8px',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'thin'
        }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '4px', flexShrink: 0 }}>
            Suggestions:
          </span>
          {SUGGESTED_PROMPTS.map((p, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(p)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '5px 12px',
                color: 'var(--text-muted)',
                fontSize: '0.76rem',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(14, 11, 40, 0.95)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={input}
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything (e.g. explain theories, solve equations)..."
            style={{
              flex: 1,
              minWidth: 0,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 16px',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="btn-primary"
            style={{
              padding: '0 20px',
              borderRadius: 'var(--radius-full)',
              minHeight: '42px',
              flexShrink: 0
            }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
