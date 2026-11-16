# Nova Learn — Deployment & Security Guide

This guide details how to securely publish **Nova Learn** to GitHub and deploy it to production hosting platforms without exposing API keys, personal credentials, or exhausting free-tier AI quotas.

---

## 1. Architectural Security Model

Nova Learn uses a decoupled, secure client-proxy architecture:

```
┌──────────────────────────────────────┐
│  Client Browser (Vite / React 19)    │
│  - Zero API credentials in code      │
│  - No secret environment variables   │
└──────────────────┬───────────────────┘
                   │ HTTPS POST /api/tutor/chat
                   ▼
┌──────────────────────────────────────┐
│  Nova Backend Proxy (Node.js)        │
│  - Rate Limiting (10 req/min/IP)     │
│  - Input validation (max 1500 chars) │
│  - Knowledge Engine (315 lessons)    │
│  - Multi-provider AI router          │
└──────────────────┬───────────────────┘
                   │ Server-to-Server API (HTTPS)
                   ▼
┌──────────────────────────────────────┐
│  AI Provider API                     │
│  - Google Gemini 1.5 Flash (Free)    │
│  - Groq / OpenAI / Anthropic         │
└──────────────────────────────────────┘
```

### Key Security Principles:
1. **Zero Secret Exposure**: Frontend client bundles NEVER contain AI keys. All requests to AI providers are routed exclusively through the server.
2. **Environment Isolation**: Local secrets reside strictly in `.env`, which is permanently excluded in `.gitignore`. A sanitized template is provided in `.env.example`.
3. **Server-Side Abuse Prevention**: The Node.js backend enforces per-IP sliding-window rate limiting, a global burst limiter, payload size limits (64KB), and input length sanitization.

---

## 2. Investigation: Free & Anonymous AI Endpoints

When preparing a public website demonstration, finding free AI compute is a common goal. Here are the verified findings:

| Provider | Authentication | Free Usage Limits | Suitability for Public Sites | Terms & Data Privacy |
| :--- | :--- | :--- | :--- | :--- |
| **Google Gemini (gemini-1.5-flash)** | API Key required | **15 RPM**, 1,000,000 TPM, 1,500 RPD | **High** (Best choice for educational demos) | Free tier prompts may be reviewed by human evaluators to improve Google models. |
| **Groq Cloud (Llama-3.3-70B)** | API Key required | **30 RPM**, 6,000 TPM, 14,400 RPD | **High** (Ultra-fast inference) | Developer terms apply. Very fast responses. |
| **OpenAI (gpt-4o-mini)** | API Key required | Paid (pay-as-you-go, ~$0.15/1M tokens) | High | Enterprise-grade privacy. |
| **Anonymous / Keyless Public Endpoints** | None | Unofficial / Reverse Proxies | **UNSUITABLE & HAZARDOUS** | Third-party unauthenticated endpoints violate provider TOS, fail constantly, and pose security/privacy risks. |

### Important Demonstration Notice:
- **There is no legitimate, unauthenticated "unlimited free AI" API**.
- To run a public demonstration, generate a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey) and configure it in your **cloud hosting provider's private dashboard**.
- The built-in rate limiter will protect your free tier from being drained by bot traffic or single users.

---

## 3. Deployment Instructions

### Option A: Render.com (Recommended Full-Stack)

Render allows you to host both the Node.js backend proxy and the React frontend static site.

#### Step 1: Deploy Backend Web Service
1. Log in to [Render](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Name**: `nova-learn-api`
   - **Root Directory**: `.`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
5. Scroll down to **Environment Variables** and add:
   - `GEMINI_API_KEY`: *(paste your key from Google AI Studio)*
   - `PORT`: `3001`
   - `NODE_ENV`: `production`
6. Click **Create Web Service**. Note your backend URL (e.g., `https://nova-learn-api.onrender.com`).

#### Step 2: Deploy Frontend Static Site
1. Click **New +** > **Static Site**.
2. Connect the same repository.
3. Set configuration:
   - **Name**: `nova-learn`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. In **Environment Variables**, add:
   - `VITE_API_URL`: `https://nova-learn-api.onrender.com`
5. Click **Create Static Site**.

---

### Option B: Railway / Fly.io / VPS

On platforms that run containers or Node.js servers, you can build Vite and serve it alongside the backend:
```bash
# 1. Install dependencies
npm install

# 2. Build frontend
npm run build

# 3. Set environment variable in host dashboard
export GEMINI_API_KEY="your_private_key"
export PORT=3001

# 4. Start server
node server/index.js
```

---

## 4. Git History & Credential Exposure Remediation

### Repository Audit Status
- The local repository at `c:\Users\DELL\OneDrive\Desktop\edu web` was freshly initialized and audited.
- **Zero API keys, private passwords, or identity documents exist in Git history.**
- `.gitignore` is configured to block `.env`, `.env.*`, `node_modules/`, credentials, and certificates.

### What to Do If a Secret Is Ever Accidental Exposed:
If you or a collaborator ever accidentally commit an API key to a public GitHub repository:

1. **Immediate Revocation (Priority 1)**:
   - Do NOT just delete the file in a new commit. The key remains in the Git commit history.
   - Go directly to the provider dashboard:
     - [Google AI Studio API Keys](https://aistudio.google.com/app/apikey) -> Delete the compromised key immediately.
     - [OpenAI API Keys](https://platform.openai.com/api-keys) -> Revoke the compromised key.
     - [Groq Keys](https://console.groq.com/keys) -> Delete the key.
   - Once revoked, the key becomes useless to scanners.
2. **Purge Commit History**:
   - Use `git filter-repo` to permanently erase the secret from all branches:
     ```bash
     pip install git-filter-repo
     git filter-repo --invert-paths --path .env
     git push origin --force --all
     ```
3. **Enable GitHub Secret Scanning**:
   - In your GitHub repository, navigate to **Settings** > **Code security and analysis**.
   - Enable **Secret scanning** and **Push protection** to automatically block commits containing recognized API key formats.

---

## 5. Pre-Flight Checklist Before `git push`

Before publishing your repository to GitHub, verify each item:

- [x] Run `git status` — confirm `.env` is NOT listed under untracked or staged files.
- [x] Check `.env.example` — confirm it only contains empty placeholder values.
- [x] Run `npm run build` — confirm clean production build with 0 errors.
- [x] Backend proxy has rate limiting active (10 req/min/IP).
- [x] AI keys are stored exclusively in cloud host environment variables.
