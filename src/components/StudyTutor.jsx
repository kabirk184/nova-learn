import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  HelpCircle, 
  Compass, 
  Check, 
  Copy 
} from 'lucide-react';
import { addXp } from '../utils/storage';

const KNOWLEDGE_RESPONSES = [
  {
    triggers: ['psychology', 'memory', 'baddeley', 'یادداشت', 'mind'],
    topic: 'Cognitive Psychology: Memory Models',
    answerEn: 'Memory is best understood through the Baddeley-Hitch Working Memory Model. Instead of a passive memory box, your working memory consists of a Central Executive (the director), a Phonological Loop (inner voice/language), and a Visuo-Spatial Sketchpad (mind\'s eye). For students, spaced repetition and active recall are proven to consolidate these into long-term synaptic connections.',
    answerUrdu: 'نفسیات میں یادداشت کو سمجھنے کے لیے ورکنگ میموری ماڈل سب سے جدید ہے۔ یہ کوئی ساکت الماری نہیں بلکہ ایک متحرک عمل ہے۔ اس میں ایگزیکٹو ڈائریکٹر، اندرونی آواز اور تصویری پردہ مل کر کام کرتے ہیں۔ تعلیمی کامیابی کے لیے فاصلاتی دہرائی (Spaced Repetition) معلومات کو مستقل یادداشت میں بدل دیتی ہے۔',
    followUp: ['How can I apply spaced repetition in my exam revision?', 'Explain Piaget\'s stages of child cognitive growth.']
  },
  {
    triggers: ['cosmos', 'space', 'black hole', 'planet', 'solar', 'سیارے', 'خلائی'],
    topic: 'Astronomy & The Cosmos',
    answerEn: 'Our Solar System formed approximately 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud. The Sun accounts for 99.86% of the system\'s mass. Beyond Neptune lies the Kuiper belt and the Oort Cloud. When massive stars 20+ times larger than our Sun run out of nuclear fuel, their cores collapse catastrophically to form stellar-mass Black Holes.',
    answerUrdu: 'ہمارا نظام شمسی تقریباً ساڑھے چار ارب سال قبل گیس اور گرد کے بادلوں کے کشش ثقل سے سکڑنے سے بنا۔ سورج اکیلا ۹۹.۸۶ فیصد کمیت کا مالک ہے۔ جب بہت بڑے ستارے اپنا ایندھن ختم کر لیتے ہیں تو کشش ثقل ان کے مرکز کو توڑ کر بلیک ہول میں تبدیل کر دیتی ہے۔',
    followUp: ['Why is Venus hotter than Mercury even though Mercury is closer?', 'How does the James Webb Telescope look back in time?']
  },
  {
    triggers: ['urdu', 'ghazal', 'غزل', 'قافیہ', 'ردیف', 'ادب'],
    topic: 'اردو ادب و شاعری کے فنی لوازمات',
    answerEn: 'In Urdu poetics, the Ghazal is considered the crown of eastern literature. It consists of independent couplets (Ashaar). The first couplet is the Matla (مطلع) where both lines share identical Qafia (rhyme words) and Radeef (refrain). The final couplet with the poet\'s pen name is the Maqta (مقطع).',
    answerUrdu: 'اردو شاعری میں غزل کو اصنافِ سخن کی ملکہ کہا جاتا ہے۔ غزل کا ہر شعر اپنے مفہوم میں خود مختار اکائی ہوتا ہے۔ پہلے ہم قافیہ و ہم ردیف شعر کو مطلع، قافیہ ردیف سے پہلے آنے والے ہم وزن الفاظ کو، اور آخری شعر جس میں شاعر تخلص لائے، مقطع کہتے ہیں۔',
    followUp: ['میر تقی میر اور غالب کے اندازِ بیاں میں کیا فرق ہے؟', 'حسنِ مطلع کسے کہا جاتا ہے؟']
  },
  {
    triggers: ['math', 'calculus', 'derivative', 'ریاضی', 'مشتق'],
    topic: 'Calculus: Derivatives & Intuition',
    answerEn: 'A derivative fundamentally answers: "At this exact microsecond, how fast is this quantity changing?" Think of a car speedometer—it doesn\'t tell you your average speed over 2 hours; it tells you your instantaneous rate of change at that single moment. Mathematically: f\'(x) = lim(h->0) [f(x+h) - f(x)]/h.',
    answerUrdu: 'ڈیریویٹو کا بنیادی مطلب لمحاتی رفتار ہے۔ گاڑی کا اسپیڈومیٹر آپ کو دو گھنٹے کی اوسط نہیں بلکہ اسی ایک سیکنڈ کی صحیح رفتار بتاتا ہے۔ ریاضی میں یہ کسی بھی چیز میں تبدیلی کی شرح ناپنے کا سب سے بنیادی ہتھیار ہے۔',
    followUp: ['What is the physical meaning of an Integral in calculus?', 'How is calculus used in modern Artificial Intelligence?']
  }
];

export const StudyTutor = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      textEn: 'Hello! I am your Nova Digital Study Tutor. Ask me any conceptual question about Psychology, Mathematics, Cosmos, Urdu Literature, or Computer Science!',
      textUrdu: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = (queryText) => {
    const q = queryText || input;
    if (!q.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', textEn: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Reward XP for asking thoughtful study questions
    addXp(15);

    setTimeout(() => {
      const lower = q.toLowerCase();
      const isUrduQuery = lower.includes('urdu') || lower.includes('ghazal') || lower.includes('غزل') || lower.includes('ادب');
      const matched = KNOWLEDGE_RESPONSES.find(k => 
        k.triggers.some(t => lower.includes(t))
      );

      let botReply;
      if (matched) {
        botReply = {
          sender: 'bot',
          topic: matched.topic,
          textEn: matched.answerEn,
          textUrdu: isUrduQuery ? matched.answerUrdu : null,
          followUp: matched.followUp
        };
      } else {
        botReply = {
          sender: 'bot',
          topic: 'Academic Exploration',
          textEn: `Great question regarding "${q}". In university academics, exploring this involves breaking down foundational principles, formulating hypotheses, and validating with empirical evidence. Review the subject modules in the Academic Hub for detailed lecture guides and worksheets.`,
          textUrdu: null,
          followUp: ['Tell me about Memory in Psychology', 'Explain the 3D Solar System & Planets', 'Explain Urdu Ghazal rules']
        };
      }

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="glass-panel" style={{
      maxWidth: '850px',
      margin: '0 auto',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-glow)',
      boxShadow: 'var(--glow-purple)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        background: 'rgba(26, 21, 59, 0.9)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
          }}>
            <Bot size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Nova Study Tutor</h3>
              <span className="badge-pill badge-cyan" style={{ fontSize: '0.7rem' }}>
                AI Academic Companion
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Interactive academic explanations and conceptual coaching
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
          <Sparkles size={14} />
          <span>+15 XP per question</span>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div style={{
        height: '420px',
        overflowY: 'auto',
        padding: '20px 24px',
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
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '85%',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              background: msg.sender === 'user'
                ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-violet))'
                : 'rgba(18, 14, 48, 0.9)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}>
              {msg.topic && (
                <span className="badge-pill badge-purple" style={{ marginBottom: '8px', fontSize: '0.72rem' }}>
                  {msg.topic}
                </span>
              )}
              <p style={{ fontSize: '0.94rem', color: '#ffffff', lineHeight: 1.6 }}>
                {msg.textEn}
              </p>
              {msg.textUrdu && (
                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="urdu-text" style={{ fontSize: '0.95rem', color: 'var(--accent-lavender)' }}>
                    {msg.textUrdu}
                  </p>
                </div>
              )}
            </div>

            {/* Quick follow up prompts */}
            {msg.followUp && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {msg.followUp.map((fu, fIdx) => (
                  <button
                    key={fIdx}
                    onClick={() => handleAsk(fu)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid var(--border-cyan)',
                      color: 'var(--accent-cyan)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Lightbulb size={12} />
                    <span>{fu}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            <Bot size={16} />
            <span>Nova Tutor is synthesizing explanation...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{
        padding: '16px 20px',
        background: 'rgba(14, 11, 40, 0.95)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '12px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Ask a question about Psychology, Math, Urdu, Cosmos, or CS..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '12px 20px',
            color: '#ffffff',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleAsk()}
          disabled={!input.trim()}
          className="btn-primary"
          style={{ padding: '0 20px', borderRadius: 'var(--radius-full)' }}
        >
          <Send size={18} />
          <span>Ask</span>
        </button>
      </div>
    </div>
  );
};
