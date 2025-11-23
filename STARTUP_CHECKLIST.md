# CLAUDE CODE STARTUP CHECKLIST - Tomorrow Morning

## ⏰ BEFORE YOU START (5 minutes)

### 1. Get Your API Key
```bash
# Go to: https://console.anthropic.com/settings/keys
# Create new key or use existing
# Copy it - you'll need it in 10 minutes
```

### 2. Prepare Your Workspace
```bash
# Create project directory
mkdir reputation-guardian
cd reputation-guardian

# Copy instruction files into project
# Put these files in the project root:
# - .claude
# - RULES_V2.md (rename to RULES.md)
# - INSTRUCTIONS.md
# - TROUBLESHOOTING.md
```

### 3. Initialize Git
```bash
git init
git add .claude RULES.md INSTRUCTIONS.md
git commit -m "Add instruction files"
```

---

## 🚀 STARTING CLAUDE CODE (9:00 AM)

### Step 1: Launch with Fast Mode
```bash
claude --fast-mode
```

### Step 2: First Prompt (Copy-Paste This EXACTLY)

```
I need you to build a review response generator web app called "Reputation Guardian".

CRITICAL: Before starting, read these instruction files:
- @/.claude (most important)
- @/RULES.md
- @/INSTRUCTIONS.md

After reading ALL files, confirm you understand:
1. 60-90 minute time limit
2. Max 5 files
3. Vanilla React + JavaScript ONLY (NO TypeScript, NO Next.js)
4. Must create vercel.json
5. Must test with `npx vercel dev` before deploying

Then proceed with Phase 1 from INSTRUCTIONS.md.

Current date: Friday, November 21, 2025
Use --fast-mode for speed.
Use /usage to monitor tokens.
Git commit every 20 minutes.

Ready? Confirm understanding, then start.
```

---

## 📋 CHECKPOINTS (Every 20 Minutes)

### Checkpoint 1 (9:20 AM) - Basic Structure
**Check:**
- [ ] Project initialized (Vite + React)
- [ ] Tailwind CSS configured
- [ ] Password protection component created
- [ ] Dark theme CSS variables set

**Git Commit:**
```bash
git add .
git commit -m "Checkpoint 1: Project structure and auth"
```

**Token Check:**
```bash
/usage
# If >30% used, run: /context prune
```

---

### Checkpoint 2 (9:40 AM) - Core UI
**Check:**
- [ ] Star rating selector works
- [ ] Review textarea styled
- [ ] Three response card placeholders
- [ ] Copy-to-clipboard button (with iOS fallback)
- [ ] Loading state component

**Git Commit:**
```bash
git add .
git commit -m "Checkpoint 2: Core UI components"
```

**If Claude Code is adding unwanted features, say:**
```
STOP. Re-read @/RULES.md section 2.
Remove [unwanted feature].
We're keeping this simple - ONLY what's in INSTRUCTIONS.md.
```

---

### Checkpoint 3 (10:00 AM) - Claude Integration
**Check:**
- [ ] Claude API connection works
- [ ] Generates 3 different responses
- [ ] Responses display in cards
- [ ] Error handling shows user-friendly messages
- [ ] API key from environment variable

**Test with example:**
```
Review: "Waited 45 minutes for food. Steak was cold and overcooked. Waiter was rude."
Rating: 2 stars

Expected: 3 different professional responses
```

**Git Commit:**
```bash
git add .
git commit -m "Checkpoint 3: Claude API integration working"
```

**Token Check:**
```bash
/usage
# Should be <60% used
```

---

### Checkpoint 4 (10:20 AM) - Polish & Deploy Prep
**Check:**
- [ ] Mobile responsive (test at 640px, 768px, 1024px)
- [ ] Dark theme looks professional
- [ ] All 3 test reviews work
- [ ] Copy-to-clipboard tested
- [ ] vercel.json created
- [ ] .env.example created

**CRITICAL: Local Deploy Test**
```bash
# This is the #1 thing that prevents Vercel failures
npx vercel dev

# Open http://localhost:3000
# Test the full workflow
# If it works locally, Vercel will work
```

**Git Commit:**
```bash
git add .
git commit -m "Checkpoint 4: Ready for deployment"
```

---

## 🚢 DEPLOYMENT (10:30 AM - 10 Minutes)

### Step 1: Push to GitHub
```bash
# Create repo on GitHub (in browser)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/reputation-guardian.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
```bash
# Option A: CLI (faster)
npm i -g vercel
vercel login
vercel

# Add environment variable
vercel env add VITE_ANTHROPIC_API_KEY
# Paste your API key
# Select: Production, Preview, Development

# Redeploy with env var
vercel --prod

# Option B: Dashboard (easier)
# Go to https://vercel.com/new
# Import GitHub repo
# Add env var: VITE_ANTHROPIC_API_KEY
# Deploy
```

### Step 3: Test Live Site
- [ ] Visit Vercel URL
- [ ] Enter password: `reputation2024`
- [ ] Test with all 3 example reviews
- [ ] Test on mobile (open on phone)
- [ ] Verify copy-to-clipboard works

---

## 🎬 RECORD DEMO (10:45 AM - 20 Minutes)

### Setup
1. Open incognito browser window
2. Navigate to your Vercel URL
3. Start Loom (screen only, no webcam yet - you'll add sound in December)
4. Record workflow

### Demo Flow (90 seconds)
```
[0:00] Show landing page with password
[0:05] Enter password
[0:10] Show main interface
[0:15] Paste first review (restaurant)
[0:20] Select 2 stars
[0:25] Click "Generate Responses"
[0:30] Show 3 responses appearing
[0:40] Hover over "Copy" button
[0:45] Quick show of second example (service business)
[0:55] Third example (hotel) - fast
[1:10] End on tool interface
```

### Add Text Captions in Loom Editor
```
0:00-0:10: "REPUTATION GUARDIAN - Professional review responses in 10 seconds"
0:10-0:20: "Step 1: Paste any negative review"
0:20-0:30: "Step 2: Select star rating"
0:30-0:40: "Step 3: Generate responses"
0:40-0:55: "AI creates 3 professional responses - Apologetic | Solution-Focused | Empathetic"
0:55-1:05: "Copy your favorite with one click"
1:05-1:20: "Works for any industry"
1:20-1:30: "$1,000 setup + $200/month unlimited use"
"Taking 3 clients in December 2024"
"DM for access"
```

---

## 📱 LINKEDIN POST (11:05 AM - 5 Minutes)

### Post This:
```
Built an AI tool that writes professional review responses in 10 seconds.

Comment if you want to see it work 👇

(Taking 3 clients in December)
```

### For People Who Comment:
```
Thanks! Here's what it does:

- Paste any negative review (Google, Yelp, Facebook)
- AI generates 3 professional responses instantly
- Choose apologetic, solution-focused, or empathetic tone
- Copy and post in seconds

Saves restaurants, hotels, and service businesses hours of stress.

Demo: [LOOM LINK]

$1K setup + $200/mo unlimited use.
Only taking 3 beta clients in December.

DM if interested.
```

---

## 🎯 SUCCESS CRITERIA CHECKLIST

Before calling it done:
- [ ] Tool works end-to-end (password → input → generate → copy)
- [ ] Deployed to Vercel with working URL
- [ ] Tested on mobile and desktop
- [ ] All 3 example reviews generate good responses
- [ ] Copy-to-clipboard works (including iOS fallback)
- [ ] Dark theme looks professional
- [ ] Loading states show during API calls
- [ ] Error messages are user-friendly
- [ ] 90-second Loom demo recorded
- [ ] Text captions added to Loom
- [ ] LinkedIn post published
- [ ] Build completed in under 90 minutes
- [ ] Used less than $15 in Claude Code credits

---

## 🆘 IF THINGS GO WRONG

### Over 45 Minutes, Not Done
```
STOP all new features.
Test what's built.
Fix only critical bugs.
Deploy partial version.
Add features later.
```

### Token Limit Hit
```bash
/usage
/context prune
git commit -m "Save progress"
# Wait 1 hour, then continue
```

### Deployment Fails
```bash
# Check these in order:
1. Does `npx vercel dev` work locally?
2. Is vercel.json present?
3. Are env vars set in Vercel dashboard?
4. Check Vercel logs: vercel logs
```

### Claude Code Ignoring Rules
```
STOP.
Re-read @/.claude file.
Re-read @/RULES.md section [X].
Remove [unwanted feature].
Continue with ONLY what's in INSTRUCTIONS.md.
```

---

## 💰 BUDGET TRACKING

Expected costs:
- **Checkpoint 1:** ~$2-3
- **Checkpoint 2:** ~$2-3
- **Checkpoint 3:** ~$3-5 (API integration)
- **Checkpoint 4:** ~$1-2 (polish)
- **Total:** $8-13

**If exceeding $15 by Checkpoint 3:**
- You're over-engineering
- /context prune immediately
- Simplify remaining work

---

## ✅ DONE!

By 11:10 AM you should have:
1. ✅ Working web app deployed to Vercel
2. ✅ 90-second Loom demo with captions
3. ✅ LinkedIn post live
4. ✅ Tool in portfolio
5. ✅ Under $15 in costs
6. ✅ Under 90 minutes build time

**Tomorrow you can build the other 2 tools (Ad Generator, Lead Enrichment).**

**In December when you have time, you'll already have 3 demo tools to show prospects.**

---

## 📞 EMERGENCY CONTACT

If completely stuck:
1. Check TROUBLESHOOTING.md
2. Search exact error on Reddit r/ClaudeAI
3. Ask specific question in our next chat

**But you won't need it - you have battle-tested instructions now. Just follow them.**

---

**Set alarm for 9:00 AM. Get coffee. Open this file. Execute. Ship by 11:00 AM. 🚀**
