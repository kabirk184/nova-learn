# Nova Learn — Deployment, Dual-Provider AI & Security Guide

This guide details how to securely publish **Nova Learn** to GitHub and deploy it to production hosting platforms with a dual-provider AI setup (Groq Cloud + Google Gemini) sized for **60 students** without incurring any costs or exposing credentials.

---

## 1. Architectural Security & Dual-Provider Model

Nova Learn features an intelligent, multi-provider backend router with automatic fallback:

```
┌────────────────────────────────────────────────────────┐
│           Client Browser (Vite / React 19)             │
│  - Zero API credentials in frontend code               │
│  - Real-time provider indicator & status monitoring    │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS POST /api/tutor/chat
                            ▼
┌────────────────────────────────────────────────────────┐
│           Nova Backend Proxy (Node.js)                 │
│  - Rate Limiting (10 req/min, 45 req/hr per student)   │
│  - Global Burst Limiter (28 req/min for 60 students)   │
│  - Input validation (max 1,500 chars, 64KB payload)    │
│  - Knowledge Engine RAG (315 lessons across 15 hubs)   │
│  - Automatic Fallback Router                           │
└───────────────┬────────────────────────┬───────────────┘
                │ 1. Try Primary         │ 2. Automatic Fallback
                ▼                        ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│  Groq Cloud (Primary)        │ │  Google Gemini (Secondary)   │
│  - llama-3.3-70b-versatile   │ │  - gemini-1.5-flash          │
│  - 30 RPM, 1,000 RPD (Free)  │ │  - 15 RPM, 1,500 RPD (Free)  │
│  - Ultra-fast token latency  │ │  - 1M TPM context buffer     │
└──────────────────────────────┘ └──────────────────────────────┘
```

### Automatic Fallback Rules:
1. **Primary Provider (Groq Cloud)**: When `GROQ_API_KEY` is configured, inquiries are routed first to Groq’s high-performance `llama-3.3-70b-versatile` model.
2. **Seamless Fallback (Google Gemini)**: If Groq hits a temporary rate limit (HTTP 429), capacity limit, or network error, the router automatically switches to Google Gemini without the student experiencing failure.
3. **Daily Quota Ceilings**:
   - Groq safe ceiling: **900 requests/day** (100-request buffer under Groq's 1,000 free tier cap).
   - Gemini safe ceiling: **1,400 requests/day** (100-request buffer under Gemini's 1,500 free tier cap).
   - **Combined daily capacity: 2,300+ free queries/day**.
4. **Zero Billing Guarantee**: The application strictly interfaces with free-tier endpoints. It will **never** automatically enable paid billing or charge a credit card.

---

## 2. 60-Student Capacity & Realistic Usage Modeling

Nova Learn's rate limits and daily quotas are mathematically calibrated for a cohort of **60 students**:

### Daily Activity Scenarios:

| Activity Profile | Active Students (out of 60) | Questions per Student | Total Daily Requests | System State |
| :--- | :--- | :--- | :--- | :--- |
| **Typical Study Day** | ~25 students | 3–5 questions | **75 – 125 reqs** | Handled 100% by Groq Cloud (leaves 85%+ headroom) |
| **High Assignment Activity** | ~40 students | 8–10 questions | **320 – 400 reqs** | Handled 100% by Groq Cloud (leaves 55%+ headroom) |
| **Exam Cramming Week** | ~55 students | 15–20 questions | **825 – 1,100 reqs** | Groq handles first 900; Gemini seamlessly absorbs remaining 200+ |
| **Simultaneous Peak Burst** | 15 students at once | 1 question simultaneously | **15 reqs/min** | Well within Groq's 30 RPM and backend's 28 RPM burst limit |

### Quota Safety Margins:
- **Available capacity**: 2,300 queries / 60 students = **~38 questions per student per day**.
- **Per-student fair-use guardrails**:
  - Max **10 questions per minute** (prevents rapid clicking / double submissions).
  - Max **45 questions per hour** (prevents a single user from consuming the cohort's quota).

---

## 3. Comparative Model Evaluation for Educational Use

| Metric | Groq (`llama-3.3-70b-versatile`) | Google Gemini (`gemini-1.5-flash`) |
| :--- | :--- | :--- |
| **Inference Speed** | **Ultra-Fast (~300–450 tokens/sec)** | Fast (~80–120 tokens/sec) |
| **Undergraduate Notes** | Outstanding conceptual synthesis, strong markdown structure | Excellent depth, expansive explanations |
| **Mathematics & Step-by-Step** | Very accurate chain-of-thought derivation for calculus and algebra | High precision with KaTeX formatting |
| **Urdu Language Quality** | Eloquent Urdu prose and poetic breakdown | Fluent conversational Urdu |
| **MCQs & Practice Tests** | Excellent distractor generation and explanation of wrong options | Strong analytical breakdown |
| **Free Tier Quotas** | **30 RPM / 1,000 RPD** | **15 RPM / 1,500 RPD / 1M TPM** |
| **Role in Nova Learn** | **Preferred Primary Provider** | **Secondary Fallback Provider** |

---

## 4. Cloud Deployment Instructions

### Option A: Render.com (Recommended Full-Stack)

#### Step 1: Deploy Backend Web Service
1. In the [Render Dashboard](https://dashboard.render.com), click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `nova-learn-api`
   - **Root Directory**: `.`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
4. Under **Environment Variables**, add:
   - `GROQ_API_KEY`: *(paste your key from [Groq Console](https://console.groq.com/keys))*
   - `GEMINI_API_KEY`: *(paste your key from [Google AI Studio](https://aistudio.google.com/app/apikey))*
   - `PORT`: `3001`
   - `NODE_ENV`: `production`
5. Click **Create Web Service**. Note your backend URL (e.g., `https://nova-learn-api.onrender.com`).

#### Step 2: Deploy Frontend Static Site
1. Click **New +** > **Static Site**.
2. Connect the same repository.
3. Configure:
   - **Name**: `nova-learn`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://nova-learn-api.onrender.com`
5. Click **Create Static Site**.

---

### Option B: Railway / Fly.io / VPS

```bash
# 1. Install dependencies
npm install

# 2. Build frontend
npm run build

# 3. Configure environment variables in host dashboard
export GROQ_API_KEY="gsk_..."
export GEMINI_API_KEY="AIzaSy..."
export PORT=3001

# 4. Start proxy server
node server/index.js
```

---

## 5. Security & Accidental Exposure Remediation

- **No Secrets in Repo**: Verified that `.env` is permanently excluded via `.gitignore`.
- **In Case of Secret Exposure**:
  1. Revoke the key immediately at [Groq Console](https://console.groq.com/keys) or [Google AI Studio](https://aistudio.google.com/app/apikey).
  2. Generate a fresh replacement key and update it in your cloud host's Environment Variables dashboard.
  3. Purge historical git records using `git filter-repo` if a secret was ever pushed.
