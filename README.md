# Nova Learn 🚀 — University Educational Platform & AI Study Suite

> A modern, gamified higher-education ecosystem featuring 15 comprehensive academic subjects with 315 verified lessons, an interactive 3D Cosmos planetary simulator, competitive Quiz Arena, digital flashcard revision suite, and a multi-provider AI Study Tutor.

![Nova Learn Banner](public/vite.svg)

---

## 🌟 Core Features

- 🏛️ **15 Comprehensive Academic Subjects**: Complete undergraduate curriculum covering Psychology, Educational Pedagogy, Mathematics, English & Grammar, Urdu Literature & Linguistics, Economics, Literature & Novels, Computer Science, History, Geography, Space & Astronomy, Biology, Physics, Chemistry, and Sociology & Criminology.
- 📚 **315 Verified University-Level Lessons**: Detailed study notes, theoretical frameworks, conceptual diagrams, practical examples, and academic citations.
- 🤖 **AI Study Tutor**: Multi-provider AI tutor (Google Gemini 1.5 Flash, Groq Llama-3.3, OpenAI, Anthropic) equipped with a localized RAG Knowledge Engine, dynamic explanation depth, rate limiting, and zero client-side credential exposure.
- 🌌 **Cinematic 3D Cosmos Explorer**: Interactive Three.js celestial simulation with real-time orbital mechanics, factsheets, and NASA deep-space insights.
- ⚡ **Competitive Quiz Arena**: Configurable testing arena featuring timed and untimed challenges, difficulty selectors, and question solution breakdowns.
- 🗂️ **Study Preparation & Flashcards**: 3D interactive flashcards, Pomodoro focus study blocks, and persistent revision checklists.
- 🏆 **Gamified Progress Tracking**: XP levels, continuous study streaks, customizable scholar avatars, and achievement badges saved locally.

---

## 🔒 Security & Privacy Model

Nova Learn is engineered from the ground up for safe public deployment on GitHub:

- **Zero Client-Side Credentials**: Browser code never handles or stores secret API keys.
- **Backend AI Proxy**: All inference requests pass through a lightweight Node.js proxy server.
- **Server-Side Rate Limiting**: Built-in sliding-window limiter prevents quota exhaustion and bot abuse (10 requests/min/IP).
- **Strict Input Validation**: Payloads are capped at 64KB with a 1,500-character maximum per question.
- **Git Protection**: Sensitive `.env` files are permanently excluded in `.gitignore`. A clean template is provided in `.env.example`.

For detailed cloud hosting configuration, refer to [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone repository
git clone https://github.com/your-username/nova-learn.git
cd nova-learn

# Install dependencies
npm install
```

### 3. Environment Setup (Optional for AI Tutor)
```bash
# Copy example environment configuration
cp .env.example .env
```
Open `.env` and add your preferred free API key (e.g., from [Google AI Studio](https://aistudio.google.com/app/apikey)):
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```
*(Note: If no API key is provided, the platform functions normally and displays a helpful 1-minute configuration guide inside the AI Tutor workspace).*

### 4. Run Development Servers
Open two terminal tabs:

**Terminal 1 — Frontend (Vite):**
```bash
npm run dev
# Opens on http://localhost:5173
```

**Terminal 2 — Backend Proxy (AI Tutor):**
```bash
npm run server
# Listening on http://localhost:3001
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Three.js, Lucide Icons, Canvas Confetti
- **Backend**: Node.js HTTP Server, Multi-Provider AI Engine (Gemini, Groq, OpenAI, Anthropic), Vector-like Token Scorer
- **Design System**: Midnight Cosmic Palette, Glassmorphism, CSS Custom Properties, KaTeX Math Formatting
- **Quality & Linting**: Oxlint

---

## 🌐 Production Deployment

Refer to the complete [Deployment & Security Guide](DEPLOYMENT.md) for step-by-step instructions on deploying to **Render**, **Railway**, **Vercel**, or **Fly.io**.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
