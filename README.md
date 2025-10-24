# AI Portfolio - Nuxt Edition

![AI Portfolio](public/readme-banner.svg)

**Static portfolios are dead.**
This is an interactive AI-powered portfolio built with Nuxt 3.

Instead of making visitors scroll endlessly, this portfolio adapts to *them*.
Ask a question — the AI avatar replies instantly.

## What can you ask?

- 🧠 **Tech recruiter?** Ask about stack & experience
- 💻 **Developer?** Dive into projects & technical skills
- 🧑‍🤝‍🧑 **Friend or family?** See what's new and interesting

---

This is not a portfolio.
It's a **conversation tailored to your curiosity**.

## Tech Stack

This is a Nuxt 3 implementation of the original [Next.js AI Portfolio](https://github.com/toukoum/portfolio), featuring:

- **Nuxt 3** - The Intuitive Vue Framework
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Utility-First Styling
- **AI SDK** - Vercel AI SDK for chat functionality
- **Multiple LLM Providers** - Support for Anthropic Claude, OpenAI, and Ollama
- **Radix Vue** - Headless UI components
- **VueUse Motion** - Smooth animations

## Features

- ✨ Interactive AI chat interface
- 🎨 Beautiful, responsive design
- 🤖 **Multiple LLM Support** - Choose between Anthropic Claude, OpenAI, or local Ollama models
- 🔄 Easy provider switching via environment variables
- 🌙 Dark mode support (optional)
- 🚀 Fast and optimized
- 📱 Mobile-friendly
- 🎭 Animated UI with VueUse Motion
- 🧰 AI-powered responses with context-aware tools

## Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **pnpm**, or **yarn** package manager
- **LLM Provider** (choose one):
  - **Anthropic API key** (recommended) - [Get it here](https://console.anthropic.com/settings/keys)
  - **OpenAI API key** - [Get it here](https://platform.openai.com/api-keys)
  - **Ollama** (local, free) - [Install from here](https://ollama.ai)

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-portfolio
```

### 2. Install dependencies

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and configure your preferred LLM provider. See [LLM Provider Configuration](#llm-provider-configuration) for detailed setup.

### 4. Run the development server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev
```

### 5. Open your browser

Navigate to `http://localhost:3000`

## LLM Provider Configuration

This portfolio supports **three different LLM providers**. Choose the one that works best for you!

### 🔹 Option 1: Anthropic Claude (Recommended)

Claude provides excellent conversational AI with great context understanding.

**Setup:**
1. Get your API key from [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. In your `.env` file:
```env
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

**Recommended models:**
- `claude-3-5-sonnet-20241022` - Best quality (recommended)
- `claude-3-haiku-20240307` - Fast and cost-effective

### 🔹 Option 2: OpenAI

Use OpenAI's GPT models for powerful AI responses.

**Setup:**
1. Get your API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. In your `.env` file:
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

**Recommended models:**
- `gpt-4o` - Most capable
- `gpt-4o-mini` - Fast and affordable (recommended)
- `gpt-4-turbo` - Previous generation

### 🔹 Option 3: Ollama (Local & Free)

Run AI models locally on your machine - no API keys needed!

**Setup:**
1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull a model:
```bash
ollama pull llama3.2
```
3. In your `.env` file:
```env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

**Popular models:**
- `llama3.2` - Meta's latest (recommended)
- `mistral` - Fast and efficient
- `phi3` - Microsoft's compact model
- `codellama` - Optimized for code

### Switching Between Providers

Simply change the `LLM_PROVIDER` variable in your `.env` file:
```env
LLM_PROVIDER=anthropic  # or 'openai' or 'ollama'
```

Restart your dev server after changing providers.

### Verify Your Configuration

Check which provider is active:
```bash
curl http://localhost:3000/api/llm-info
```

### GitHub Token (Optional)
Generate one at [github.com/settings/tokens](https://github.com/settings/personal-access-tokens) for GitHub integration features

## Customization

### Personalize the Content

1. **Update the system prompt** in `server/api/chat/prompt.ts` with your own information
2. **Modify the AI tools** in `server/api/chat/tools/` to return your actual data
3. **Replace the avatar** - Add your own `landing-memojis.png` in the `public/` folder
4. **Update landing page** in `pages/index.vue` with your name and branding
5. **Customize colors** in `tailwind.config.ts` and `assets/css/main.css`

### Add Your Avatar

Replace `public/landing-memojis.svg` with your own avatar:
- Recommended size: 2000x2000px
- Format: PNG or SVG
- Transparent background works best

You can create your avatar using:
- Apple Memoji (iOS/macOS)
- Bitmoji
- AI-generated avatars
- Custom illustrations

## Project Structure

```
ai-portfolio/
├── assets/
│   └── css/
│       └── main.css          # Global styles
├── components/
│   ├── chat/                 # Chat-related components
│   └── ui/                   # Reusable UI components
├── layouts/
│   └── default.vue           # Default layout
├── lib/
│   └── utils.ts              # Utility functions
├── pages/
│   ├── index.vue             # Landing page
│   └── chat.vue              # Chat page
├── public/                   # Static assets
├── server/
│   ├── api/
│   │   └── chat/             # Chat API routes and tools
│   └── utils/
│       └── llm.ts            # LLM provider configuration
├── .env.example              # Environment variables template
├── nuxt.config.ts            # Nuxt configuration
├── package.json              # Dependencies
└── tailwind.config.ts        # Tailwind configuration
```

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# Generate static site
npm run generate
```

## Troubleshooting

### LLM Provider Issues

**"API key is not configured" error:**
- Make sure you've created a `.env` file from `.env.example`
- Verify your API key is correctly set for your chosen provider
- Restart the development server after changing environment variables

**Chat not responding with Ollama:**
- Ensure Ollama is running: `ollama serve`
- Check the model is downloaded: `ollama list`
- Verify the base URL matches your Ollama installation

**Tool calls not working:**
- This is normal behavior - the AI decides when to use tools based on the conversation
- Tools are triggered automatically when relevant to the user's query

### General Issues

**Port already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Build errors:**
```bash
# Clear the cache and rebuild
rm -rf .nuxt node_modules
npm install
npm run dev
```

## Deployment

This Nuxt app can be deployed to various platforms:

- **Vercel** - Zero config deployment (remember to add environment variables)
- **Netlify** - Simple and fast
- **Node.js Server** - Self-hosted
- **Static Hosting** - Using `nuxt generate` (Note: Chat API won't work in static mode)

### Important for Deployment

When deploying, make sure to:
1. Add all necessary environment variables to your hosting platform
2. Set `LLM_PROVIDER` to your chosen provider
3. Add the corresponding API key (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc.)
4. For Ollama: Deploy your own Ollama instance and update `OLLAMA_BASE_URL`

## License

This project is open source and available under the MIT License.

## Credits

This is a Nuxt 3 port of the original [AI Portfolio by Toukoum](https://github.com/toukoum/portfolio).

Special thanks to the original creator for the innovative concept!

## Tags

`#AIPortfolio` `#Nuxt3` `#Vue3` `#AI` `#WebDevelopment` `#InteractiveResume` `#TechInnovation`

---

Built with ❤️ using Nuxt 3
