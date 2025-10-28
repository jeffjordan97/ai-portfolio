# 🚀 Vercel Deployment Guide

This guide will help you deploy your AI Portfolio to Vercel.

---

## 📋 Prerequisites

- ✅ Vercel CLI installed (already done)
- ✅ GitHub repository ready (already done)
- ⏳ Vercel account (free)
- ⏳ API key for your chosen LLM provider

---

## 🎯 Quick Deployment (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Import Project"
   - Select your repository: `jeffjordan97/ai-portfolio`
   - Branch: `claude/clone-ai-portfolio-nuxt-011CURfNVw6bBNPj2o3WFCas`

3. **Configure Project**
   - Framework Preset: **Nuxt.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.output/public` (auto-detected)

4. **Add Environment Variables** (IMPORTANT!)

   Click "Environment Variables" and add:

   **For Anthropic Claude (Recommended):**
   ```
   LLM_PROVIDER=anthropic
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
   ```

   **For OpenAI:**
   ```
   LLM_PROVIDER=openai
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```

   **For Ollama (requires custom setup):**
   ```
   LLM_PROVIDER=ollama
   OLLAMA_BASE_URL=your_ollama_instance_url
   OLLAMA_MODEL=llama3.2
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your app will be live at `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

**Step 1: Login to Vercel**
```bash
vercel login
```
This will open your browser for authentication.

**Step 2: Deploy**
```bash
# Deploy to preview
vercel

# Or deploy to production
vercel --prod
```

**Step 3: Add Environment Variables**
```bash
# For Anthropic Claude
vercel env add LLM_PROVIDER
# Enter: anthropic

vercel env add ANTHROPIC_API_KEY
# Enter: your_api_key_here

vercel env add ANTHROPIC_MODEL
# Enter: claude-3-5-sonnet-20241022
```

**Step 4: Redeploy with Environment Variables**
```bash
vercel --prod
```

---

### Option 3: Deploy with Token (CI/CD)

If you have a Vercel token:

```bash
vercel --token YOUR_VERCEL_TOKEN --prod --yes
```

Get your token from: https://vercel.com/account/tokens

---

## 🔧 Project Configuration

### Files Already Configured

✅ **vercel.json** - Vercel configuration
```json
{
  "buildCommand": "npm run build",
  "framework": "nuxtjs",
  "outputDirectory": ".output/public"
}
```

✅ **nuxt.config.ts** - Nuxt configuration with runtime config
✅ **package.json** - Dependencies and scripts
✅ **.gitignore** - Proper exclusions

---

## 🔐 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `LLM_PROVIDER` | Which LLM to use | `anthropic`, `openai`, or `ollama` |

### Anthropic Claude Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | `sk-ant-api03-...` |
| `ANTHROPIC_MODEL` | Model to use | `claude-3-5-sonnet-20241022` |

### OpenAI Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `OPENAI_MODEL` | Model to use | `gpt-4o-mini` |

### Ollama Variables (Advanced)

| Variable | Description | Example |
|----------|-------------|---------|
| `OLLAMA_BASE_URL` | Ollama instance URL | `https://your-ollama.com` |
| `OLLAMA_MODEL` | Model to use | `llama3.2` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GITHUB_TOKEN` | For GitHub integrations | `ghp_...` |

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads at your Vercel URL
- [ ] Landing page displays correctly
- [ ] Can navigate to chat page
- [ ] Chat interface loads
- [ ] AI responds to messages
- [ ] AI tools trigger correctly (ask questions that would use tools)
- [ ] Mobile responsive design works
- [ ] No console errors

### Test Your Deployment

1. **Visit your deployed site**
   - URL will be: `https://[your-project].vercel.app`

2. **Test basic functionality**
   ```
   - Click on quick question buttons
   - Try custom queries
   - Test AI responses
   ```

3. **Check API endpoint**
   ```bash
   curl https://your-project.vercel.app/api/llm-info
   ```
   Should return your LLM configuration.

4. **Monitor logs**
   - Go to Vercel Dashboard → Your Project → Logs
   - Check for any errors

---

## 🔄 Redeployment

### Automatic Redeployment

Vercel automatically redeploys when you push to your GitHub branch:

```bash
git add .
git commit -m "Update: your changes"
git push
```

### Manual Redeployment

```bash
vercel --prod
```

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
# Ensure all dependencies are in package.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Environment variable not found"**
- Check that all required environment variables are set in Vercel Dashboard
- Go to: Settings → Environment Variables
- Add missing variables
- Redeploy

### Runtime Errors

**Error: "API key is not configured"**
- Verify environment variables are set correctly
- Check variable names match exactly
- Redeploy after adding variables

**Error: "Failed to fetch"**
- Check API endpoint is accessible
- Verify CORS settings if needed
- Check Vercel function logs

### Performance Issues

**Slow response times**
- Consider upgrading Vercel plan
- Optimize API calls
- Implement caching

---

## 📊 Monitoring

### Vercel Analytics

1. Go to your project in Vercel Dashboard
2. Click "Analytics" tab
3. View:
   - Page views
   - Performance metrics
   - Top pages

### Error Tracking

1. Go to "Logs" tab in Vercel Dashboard
2. Filter by errors
3. Set up integrations (Sentry, etc.)

---

## 🎨 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 💰 Pricing

**Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN
- Serverless Functions

**Pro Tier ($20/month):**
- 1TB bandwidth
- Better performance
- Team collaboration
- Priority support

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Nuxt 3 on Vercel](https://nuxt.com/deploy/vercel)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)

---

## 🎉 Success!

Once deployed, your AI Portfolio will be:
- ✅ Live on the internet
- ✅ Automatically updated with git pushes
- ✅ Served via global CDN
- ✅ HTTPS enabled
- ✅ Optimized for performance

Share your portfolio: `https://your-project.vercel.app`

---

*Generated by Claude Code*
*Last Updated: 2025-10-28*
