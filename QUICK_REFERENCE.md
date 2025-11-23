# QUICK REFERENCE CARD - Tomorrow Morning

## 🎯 THE FORMULA

`.claude` file + `--fast-mode` + git commits every 20min + `npx vercel dev` = SUCCESS

---

## ⚡ FIRST PROMPT (Copy-Paste at 9:00 AM)

```
Build Reputation Guardian review response generator.

Read these FIRST: @/.claude @/RULES.md @/INSTRUCTIONS.md

Current date: Friday, November 21, 2025.

Confirm: 60-90min, max 5 files, NO TypeScript/Next.js, create vercel.json, test with npx vercel dev.

Start Phase 1.
```

---

## 📋 EVERY 20 MINUTES

```bash
git add .
git commit -m "Checkpoint X"
/usage
```

---

## 🚨 IF THINGS GO WRONG

| Problem | Solution |
|---------|----------|
| Token limit | `/context prune` + git commit + wait 1hr |
| Over-engineering | "STOP. Re-read @/.claude. Remove [feature]." |
| Deployment fails | `npx vercel dev` + check vercel.json + check env vars |
| Over 45min | STOP new features, deploy what works |
| Ignoring rules | "Re-read @/RULES.md section [X]" |

---

## ✅ BEFORE DEPLOYING

- [ ] `npx vercel dev` works
- [ ] vercel.json exists
- [ ] .env.example created (no secrets)
- [ ] Tested all 3 examples
- [ ] Mobile responsive
- [ ] Under 75 minutes

---

## 🎬 DEMO SCRIPT (90 seconds)

0:00 - Password screen  
0:15 - Paste review  
0:25 - Click generate  
0:30 - 3 responses appear  
0:45 - Copy button  
1:00 - Second example  
1:20 - Call to action  

---

## 📱 LINKEDIN POST

```
Built an AI tool that writes professional review responses in 10 seconds.

Comment if you want to see it work 👇

(Taking 3 clients in December)
```

---

## 💰 EXPECTED COSTS

- Checkpoints 1-2: $4-6
- Checkpoint 3: $3-5  
- Checkpoint 4: $1-2
- **Total: $8-13**

---

## ⏰ TIMELINE

9:00 - Start  
9:20 - Checkpoint 1  
9:40 - Checkpoint 2  
10:00 - Checkpoint 3  
10:20 - Checkpoint 4  
10:30 - Deploy  
10:45 - Record demo  
11:00 - LinkedIn post  
**11:05 - DONE ✅**

---

## 🔥 POWER COMMANDS

```bash
claude --fast-mode  # Start
/usage              # Monitor
/context prune      # Clean
/plan               # Preview
npx vercel dev      # Test
```

---

## 🎯 SUCCESS = 

Working tool + Live URL + Loom demo + LinkedIn post + Under 2hrs + Under $15

---

**Print this. Put it next to your keyboard. Execute tomorrow.**
