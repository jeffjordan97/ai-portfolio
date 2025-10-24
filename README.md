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
- **OpenAI** - GPT-4 powered conversations
- **Radix Vue** - Headless UI components
- **VueUse Motion** - Smooth animations

## Features

- ✨ Interactive AI chat interface
- 🎨 Beautiful, responsive design
- 🌙 Dark mode support (optional)
- 🚀 Fast and optimized
- 📱 Mobile-friendly
- 🎭 Animated UI with VueUse Motion
- 🤖 AI-powered responses with context-aware tools

## Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **pnpm**, or **yarn** package manager
- **OpenAI API key** (for AI chat functionality)

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

Then edit `.env` and add your API keys:

```env
OPENAI_API_KEY=your_openai_api_key_here
GITHUB_TOKEN=your_github_token_here
```

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

## Getting Your Tokens

### OpenAI API Key
Get it from [platform.openai.com](https://platform.openai.com/api-keys)

### GitHub Token (Optional)
Generate one at [github.com/settings/tokens](https://github.com/settings/personal-access-tokens)

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
│   └── api/
│       └── chat/             # Chat API routes and tools
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

## Deployment

This Nuxt app can be deployed to various platforms:

- **Vercel** - Zero config deployment
- **Netlify** - Simple and fast
- **Node.js Server** - Self-hosted
- **Static Hosting** - Using `nuxt generate`

## License

This project is open source and available under the MIT License.

## Credits

This is a Nuxt 3 port of the original [AI Portfolio by Toukoum](https://github.com/toukoum/portfolio).

Special thanks to the original creator for the innovative concept!

## Tags

`#AIPortfolio` `#Nuxt3` `#Vue3` `#AI` `#WebDevelopment` `#InteractiveResume` `#TechInnovation`

---

Built with ❤️ using Nuxt 3
