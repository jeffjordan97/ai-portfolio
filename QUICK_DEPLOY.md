# 🚀 Quick Deploy to Vercel - 5 Minutes

## Option 1: Deploy via Dashboard (Easiest) ⭐

### Step 1: Go to Vercel
👉 **https://vercel.com/new**

### Step 2: Import Repository
- Sign in with GitHub
- Click "Import Project"
- Select: `jeffjordan97/ai-portfolio`
- Branch: `claude/clone-ai-portfolio-nuxt-011CURfNVw6bBNPj2o3WFCas`

### Step 3: Add Environment Variables ⚠️ REQUIRED

**For Anthropic Claude (Recommended):**
```
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

**For OpenAI:**
```
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
```

### Step 4: Deploy
Click "Deploy" button → Wait 2-3 minutes ✅

---

## Option 2: Deploy via CLI

```bash
# 1. Login
vercel login

# 2. Deploy
vercel --prod

# 3. Add environment variables in dashboard
# Then redeploy
```

---

## After Deployment

✅ Your site will be live at: `https://your-project.vercel.app`

Test it:
- Visit the landing page
- Click a quick question
- Chat with the AI

---

## Need Help?

📖 See full guide: `DEPLOYMENT_GUIDE.md`
🐛 Troubleshooting: Check Vercel Dashboard → Logs

---

**Your API Keys:**
- Anthropic: https://console.anthropic.com/settings/keys
- OpenAI: https://platform.openai.com/api-keys
