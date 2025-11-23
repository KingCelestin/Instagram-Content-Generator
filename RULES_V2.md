# STRICT RULES FOR CLAUDE CODE (v2 - Battle-Tested)

## ⚠️ FOLLOW THESE RULES AT ALL TIMES: @/RULES.md
Reference this file before EVERY action.

---

## IRON LAWS (NEVER BREAK THESE)

### 1. TIMING DISCIPLINE
- **TARGET:** 60-75 minutes total build time
- **ALERT:** If over 45 minutes without working demo
- **ACTION:** Simplify or cut features to stay on schedule
- **CHECKPOINTS:** Git commit every 20 minutes
- **MONITOR:** Use `/usage` to check token consumption

### 2. NO SCOPE CREEP - ABSOLUTE CONSTRAINTS
**FORBIDDEN ADDITIONS (Do NOT add even if "helpful"):**
- ❌ TypeScript (use JavaScript only)
- ❌ Next.js (use Vite + React)
- ❌ Testing frameworks (manual testing only)
- ❌ Authentication middleware (simple client-side hash only)
- ❌ Databases (stateless only)
- ❌ ORMs (Prisma, TypeORM, etc.)
- ❌ State management libraries (Redux, Zustand, etc.)
- ❌ UI component libraries (shadcn, Material-UI, etc.)
- ❌ Build optimization tools
- ❌ Analytics packages
- ❌ ANY feature not explicitly in INSTRUCTIONS.md

**If tempted to add ANY of the above, STOP and re-read this section.**

### 3. FILE COUNT LIMIT
- **MAXIMUM:** 5 files total
- **REQUIRED FILES:**
  1. `index.html` or `App.jsx` (entry point)
  2. `app.js` or main component
  3. `style.css` or Tailwind config
  4. `utils.js` or `claudeApi.js` (if needed)
  5. `vercel.json` (deployment config)
- **ALSO CREATE:** `.env.example` (doesn't count toward limit)
- **IF OVER 5 FILES:** Consolidate or inline code

### 4. TECHNOLOGY RESTRICTIONS

**ALLOWED:**
```
✅ Vite + React
✅ JavaScript (ES6+)
✅ Tailwind CSS (CDN or npm)
✅ Anthropic Claude SDK
✅ Standard Web APIs (fetch, clipboard, etc.)
```

**FORBIDDEN:**
```
❌ TypeScript
❌ Next.js
❌ Express/Fastify/Koa
❌ Prisma/TypeORM
❌ Jest/Vitest/Testing Library
❌ Webpack/Rollup configs
❌ Redux/MobX/Zustand
❌ shadcn/Radix/Material-UI
❌ Any framework not listed in ALLOWED
```

### 5. DEPLOYMENT REQUIREMENTS (CRITICAL)

**MUST CREATE:**
```json
// vercel.json (REQUIRED)
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

**MUST TEST:**
```bash
# Before deploying, ALWAYS test:
npx vercel dev
```

**MUST GENERATE:**
- `.env.example` (with placeholder values)
- Never commit `.env` (add to .gitignore)

### 6. ENVIRONMENT VARIABLES (SECURITY)

**CRITICAL RULES:**
- ✅ Use `process.env.VITE_ANTHROPIC_API_KEY`
- ✅ Create `.env.example` with placeholders
- ❌ NEVER hardcode API keys in source
- ❌ NEVER commit `.env` file
- ❌ NEVER read actual `.env` during build (use examples only)
- ⚠️ For demos: Client-side API calls with key is acceptable
- ⚠️ Add warning: "Demo only - use backend proxy for production"

### 7. TOKEN CONSERVATION

**MANDATORY PRACTICES:**
- Use `/context prune` to remove irrelevant files from context
- Don't re-read files unnecessarily
- Keep RULES.md concise (you're reading it now)
- Confirm before generating >100 lines of code
- Break large tasks into 20-minute chunks
- Git commit after each chunk to save progress

### 8. DATE AWARENESS
- **CURRENT DATE:** Friday, November 21, 2025
- **YEAR:** 2025 (not 2024)
- Use latest 2025 package versions
- Don't search for outdated 2024 solutions
- Confirm year before web searches

---

## ANTI-PATTERNS TO AVOID

### ❌ Don't Do This:

**Over-abstracted code:**
```javascript
// BAD
const useReviewResponseGenerator = (config) => {
  const { apiKey, model, temperature } = config
  const [state, dispatch] = useReducer(reducer, initialState)
  // 100 more lines...
}
```

**Premature optimization:**
```javascript
// BAD
const memoizedResponses = useMemo(() => 
  responses.map(r => processResponse(r)), 
  [responses]
)
```

**Unnecessary abstraction:**
```javascript
// BAD
class ResponseCardFactory {
  createCard(type, data) {...}
}
```

### ✅ Do This Instead:

**Simple and direct:**
```javascript
// GOOD
function ResponseCard({ response, onCopy }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <p>{response}</p>
      <button onClick={() => onCopy(response)}>
        Copy
      </button>
    </div>
  )
}
```

**Straightforward logic:**
```javascript
// GOOD
const handleGenerate = async () => {
  setLoading(true)
  try {
    const responses = await generateResponses(review, rating)
    setResponses(responses)
  } catch (error) {
    setError("Failed to generate responses. Please try again.")
  } finally {
    setLoading(false)
  }
}
```

---

## UI/UX REQUIREMENTS

### Mobile-First Responsive:
```css
/* REQUIRED breakpoints */
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
```

### Dark Theme (REQUIRED):
```css
/* Use CSS variables */
:root {
  --bg: #1a1a1a;
  --card: #2d2d2d;
  --border: #3a3a3a;
  --text: #ffffff;
  --text-secondary: #a0a0a0;
}

/* Support system preference */
@media (prefers-color-scheme: dark) {
  /* Already dark by default */
}
```

### Copy to Clipboard (REQUIRED):
```javascript
// MUST include fallback for iOS
async function copyToClipboard(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers/iOS
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}
```

### Loading States (REQUIRED):
```javascript
// Show skeleton UI or spinner during API calls
{loading ? (
  <div className="animate-pulse">Loading...</div>
) : (
  <div>{content}</div>
)}
```

### Error Handling (REQUIRED):
```javascript
// User-friendly error messages
catch (error) {
  setError("Something went wrong. Please try again.")
  // NOT: setError(error.message) ← technical jargon
}
```

---

## DECISION FRAMEWORK

When faced with a choice, ask:

1. **Does this help complete the project faster?**
   - Yes → Do it
   - No → Skip it

2. **Is this feature in INSTRUCTIONS.md?**
   - Yes → Build it
   - No → Don't build it

3. **Will this break the 75-minute target?**
   - Yes → Simplify or skip
   - No → Proceed

4. **Is there a simpler way?**
   - Yes → Use the simpler way
   - No → Proceed with current approach

5. **Does this work?**
   - Yes → Move on, don't refactor
   - No → Fix the bug, then move on

---

## RED FLAGS (Stop and Reassess)

If you find yourself:
- Installing more than 5 npm packages
- Creating more than 5 files
- Writing a config file (other than vercel.json)
- Setting up a build pipeline
- Creating utility functions "for later"
- Abstracting before you have duplication
- Spending >15 minutes on one component
- Thinking "let me make this more flexible"
- Adding comments explaining complex logic (simplify the logic instead)
- Proposing TypeScript "for type safety"
- Suggesting testing "for reliability"
- Wanting to add auth "for security"

**STOP. You're over-engineering. Simplify immediately.**

---

## WHEN TO ASK FOR CLARIFICATION

**Only ask if:**
- INSTRUCTIONS.md is ambiguous or contradictory
- A required feature is technically impossible
- You need the actual Claude API key
- Deployment credentials are needed

**DON'T ASK:**
- "Should I add [feature not in instructions]?" (Answer: NO)
- "Would you like me to [over-engineer this]?" (Answer: NO)
- "Should I use [complex pattern]?" (Answer: NO)
- "Want me to add tests?" (Answer: NO)
- "Should we use TypeScript?" (Answer: NO)

**The answer is always NO.**

---

## COMMIT MESSAGES (Keep Simple)

**✅ GOOD:**
- "Add password protection"
- "Implement Claude API integration"
- "Add copy to clipboard with iOS fallback"
- "Fix mobile responsive breakpoints"

**❌ BAD:**
- "Refactor authentication layer to use dependency injection"
- "Implement comprehensive error boundary system"
- "Add extensible plugin architecture"

---

## FINAL REMINDER

This is a **DEMO/PORTFOLIO piece**, not production software.

**Goal:** Prove you can ship fast  
**Not:** Build the "perfect" application

**Speed > Perfection**  
**Working > Elegant**  
**Done > Perfect**

---

## POWER USER TRICKS (From Scira Research)

1. **Use --fast-mode:** 30% faster builds
2. **/context prune:** Remove irrelevant files from context
3. **Git commit every 20min:** Save progress, manage tokens
4. **Test locally first:** `npx vercel dev` before deploy
5. **Alert at 45min:** If not done, simplify scope

---

Read these rules before every action. Reference @/RULES.md constantly.
