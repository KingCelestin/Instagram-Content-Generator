# TROUBLESHOOTING GUIDE - Based on Real User Issues

## 🚨 CRITICAL ISSUES & SOLUTIONS

### Issue: Token Limits Hit Mid-Build
**Symptoms:** "Usage limit reached" error at 40-50 minutes into build  
**Cause:** 5-hour rolling token caps  
**Solution:**
```bash
# Monitor usage
/usage

# Break into chunks
git commit -m "Checkpoint 1: Basic structure"
# Continue building

# Prune context
/context prune

# Use fast mode
claude --fast-mode
```
**Prevention:** Commit every 20 minutes, monitor /usage regularly

---

### Issue: Vercel Deployment Fails
**Symptoms:** Build fails, "Command failed" errors, 404 on deployed site  
**Cause:** Missing vercel.json, wrong build commands, env var issues  
**Solution:**
```json
// Create vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

```bash
# Test locally FIRST
npx vercel dev

# Check package.json has correct scripts
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```
**Prevention:** Always test with `npx vercel dev` before deploying

---

### Issue: Environment Variables Not Working
**Symptoms:** "API key undefined", 403 errors from Anthropic API  
**Cause:** Wrong variable naming, not set in Vercel dashboard  
**Solution:**
```javascript
// CORRECT: Use VITE_ prefix for Vite projects
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

// In Vercel dashboard:
// Settings → Environment Variables
// Add: VITE_ANTHROPIC_API_KEY = your_key_here
// Must redeploy after adding env vars
```
**Prevention:** Use correct prefix, always create .env.example

---

### Issue: Copy to Clipboard Fails on iOS
**Symptoms:** Works on desktop, broken on iPhone/iPad  
**Cause:** Older iOS versions don't support navigator.clipboard  
**Solution:**
```javascript
async function copyToClipboard(text) {
  // Modern browsers
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Clipboard error:', err)
    }
  }
  
  // Fallback for iOS/older browsers
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
  } catch (err) {
    document.body.removeChild(textarea)
    return false
  }
}
```
**Prevention:** Always include fallback

---

### Issue: CORS Errors with Claude API
**Symptoms:** "CORS policy blocked", "No 'Access-Control-Allow-Origin' header"  
**Cause:** Browser blocking cross-origin requests  
**Solution:**
```javascript
// Add mode: 'cors' to fetch
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  mode: 'cors',  // ← CRITICAL
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({...})
})
```
**Prevention:** Always include `mode: 'cors'` in fetch calls

---

### Issue: Dark Theme Has Poor Contrast
**Symptoms:** Text hard to read, fails WCAG accessibility  
**Cause:** Wrong color choices  
**Solution:**
```css
/* CORRECT contrast ratios */
:root {
  --bg: #121212;          /* Dark enough */
  --card: #1e1e1e;        /* Subtle contrast */
  --border: #2d2d2d;      /* Visible but soft */
  --text: #ffffff;        /* High contrast */
  --text-secondary: #b0b0b0; /* Medium contrast */
}

/* WCAG AA requires 4.5:1 for normal text */
/* Check: https://contrast-ratio.com/ */
```
**Prevention:** Test contrast ratios, use proven color palettes

---

### Issue: Mobile Layout Broken (iPad)
**Symptoms:** Works on phone, broken on tablet  
**Cause:** Missing md breakpoint  
**Solution:**
```jsx
// CORRECT: Cover all breakpoints
<div className="
  p-4 sm:p-6       // Mobile: 16px, Small: 24px
  md:p-8           // Tablet: 32px
  lg:p-12          // Desktop: 48px
  grid grid-cols-1 // Mobile: stack
  md:grid-cols-2   // Tablet: 2 columns
  lg:grid-cols-3   // Desktop: 3 columns
">
```
**Prevention:** Always test at sm (640px), md (768px), lg (1024px)

---

### Issue: API Calls Fail with Rate Limits
**Symptoms:** "429 Too Many Requests", API errors after multiple tests  
**Cause:** Hitting Anthropic rate limits  
**Solution:**
```javascript
// Add delay between requests
async function generateWithRateLimit(review, rating) {
  // Simple rate limit: 100ms delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const response = await fetch(/* ... */)
  return response
}

// Or implement exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000 // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay))
      } else {
        throw error
      }
    }
  }
}
```
**Prevention:** Add 100ms delays, implement retry logic

---

### Issue: Loading State Missing or Ugly
**Symptoms:** App appears frozen during API calls  
**Cause:** No loading indicator  
**Solution:**
```jsx
// GOOD: Skeleton UI
{loading ? (
  <div className="space-y-4">
    <div className="h-8 bg-gray-700 rounded animate-pulse" />
    <div className="h-24 bg-gray-700 rounded animate-pulse" />
    <div className="h-24 bg-gray-700 rounded animate-pulse" />
  </div>
) : (
  <div>{content}</div>
)}

// Or simple spinner
{loading && (
  <div className="flex justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
  </div>
)}
```
**Prevention:** Add loading states to all async operations

---

### Issue: Password Protection is Insecure
**Symptoms:** Password visible in source code  
**Cause:** Client-side only auth  
**Solution:**
```javascript
// For DEMOS only - add warning
const DEMO_PASSWORD_HASH = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' // sha256 of 'reputation2024'

function checkPassword(input) {
  const hash = sha256(input) // Use crypto library
  if (hash === DEMO_PASSWORD_HASH) {
    return true
  }
  return false
}

// CRITICAL: Add warning in UI
<p className="text-yellow-500 text-sm">
  ⚠️ Demo authentication only. Use proper backend auth for production.
</p>
```
**Prevention:** Always warn users about demo-only security

---

### Issue: Error Messages Are Technical Jargon
**Symptoms:** Users see "Fetch failed: TypeError" etc  
**Cause:** Exposing raw error messages  
**Solution:**
```javascript
// BAD
catch (error) {
  setError(error.message) // ← "Failed to fetch" or technical details
}

// GOOD
catch (error) {
  console.error(error) // Log for debugging
  setError("Something went wrong. Please try again.") // ← User-friendly
}

// BETTER
catch (error) {
  console.error(error)
  if (error.status === 429) {
    setError("Too many requests. Please wait a moment and try again.")
  } else if (error.status === 401) {
    setError("API key invalid. Please check your configuration.")
  } else {
    setError("Something went wrong. Please try again.")
  }
}
```
**Prevention:** Always catch and translate errors to user-friendly messages

---

## ⚠️ COMMON PROBLEMS

### Claude Code Adds TypeScript Unprompted
**Why:** Default behavior for "safety"  
**Fix:** Add to first prompt: "Use JavaScript ONLY. NO TypeScript."  
**Prevention:** Include in .claude file

### Context Lost After 10+ Messages
**Why:** Context window fills up  
**Fix:** Use `/context prune` or start new session with working files  
**Prevention:** Git commit frequently, break into sessions

### Refactors Working Code Unnecessarily
**Why:** Claude Code wants to "improve" things  
**Fix:** Say "STOP. Code works. Move to next feature."  
**Prevention:** Add to rules: "If it works, don't refactor"

### Installs Too Many Dependencies
**Why:** Imports libraries for every feature  
**Fix:** "Use only: react, react-dom, @anthropic-ai/sdk, tailwindcss"  
**Prevention:** Specify max 5 packages in rules

---

## 🔧 RECOVERY PLAYBOOK

### Scenario 1: Build Stuck in Loop
**Symptoms:** Same error repeating, no progress  
**Action:**
```bash
# 1. Use /bug with specific error
/bug [paste exact error message]

# 2. If still stuck, restart with working files
mkdir fresh-start
cp [working-files] fresh-start/
cd fresh-start
claude --fast-mode

# 3. Give focused instruction
"Fix ONLY [specific file]: [specific error]. Don't touch other files."
```

### Scenario 2: Token Budget Exceeded
**Symptoms:** "Usage limit reached"  
**Action:**
```bash
# 1. Check current usage
/usage

# 2. Prune context
/context prune

# 3. Save progress
git commit -m "Checkpoint before hitting limits"

# 4. Start new session in ~1 hour (rolling 5-hour window)
# Or use different approach without Claude Code
```

### Scenario 3: Deployment Fails
**Symptoms:** Vercel shows error, site doesn't load  
**Action:**
```bash
# 1. Test locally first
npx vercel dev

# 2. Check logs
vercel logs

# 3. Common fixes:
# - Add vercel.json
# - Fix package.json scripts
# - Set environment variables in Vercel dashboard
# - Ensure build output is in dist/ folder

# 4. Redeploy after fixes
vercel --prod
```

### Scenario 4: Over 45 Minutes, Not Done
**Symptoms:** Approaching time limit, demo not working  
**Action:**
1. **STOP** adding features
2. Test what's built so far
3. Fix only critical bugs
4. Deploy partial version
5. Add missing features later

### Scenario 5: API Integration Not Working
**Symptoms:** 403, 401, CORS errors  
**Action:**
```javascript
// 1. Test API key manually
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"Hi"}]}'

// 2. Check exact error
console.log('API Error:', error)
console.log('Status:', error.status)
console.log('Response:', await error.text())

// 3. Common fixes:
// - Add x-api-key header
// - Include anthropic-version header
// - Set mode: 'cors'
// - Check env var is loaded: import.meta.env.VITE_ANTHROPIC_API_KEY
```

---

## 📊 SUCCESS RATES

Based on Scira research:

**With proper rules/instructions:**
- ✅ 75% success rate for 60-90min builds
- ✅ Average cost: $5-10
- ✅ Most common success pattern: Break into 20min chunks

**Without rules:**
- ⚠️ 40% success rate
- ⚠️ Average cost: $20+ (wasted on failed attempts)
- ⚠️ Common failure: Over-engineering, time overruns

**Takeaway:** Following rules DOUBLES success rate and HALVES costs.

---

## 🎯 PRE-FLIGHT CHECKLIST

Before starting build, confirm:
- [ ] .claude file in project root
- [ ] RULES.md and INSTRUCTIONS.md prepared
- [ ] API key ready (not committed anywhere)
- [ ] Git initialized
- [ ] vercel.json template ready
- [ ] Example data for testing prepared
- [ ] Time blocked (uninterrupted 90 minutes)
- [ ] `/usage` command available to monitor

Before deploying, confirm:
- [ ] `npx vercel dev` passes local test
- [ ] vercel.json exists
- [ ] .env.example created (no secrets)
- [ ] All 3 test examples work
- [ ] Mobile responsive (test in devtools)
- [ ] Copy-to-clipboard works
- [ ] Error handling shows friendly messages
- [ ] Loading states visible
- [ ] Dark theme has good contrast

---

**Most failures are preventable. Follow the rules. Test locally. Monitor tokens. Git commit frequently.**
