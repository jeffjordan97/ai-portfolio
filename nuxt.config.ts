// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vueuse/motion/nuxt'
  ],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  app: {
    head: {
      title: 'AI Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'description', content: 'Interactive portfolio with an AI-powered Memoji that answers questions about me, my skills, and my experience' },
        { name: 'keywords', content: 'Portfolio, Developer, AI, Interactive, Memoji, Web Development, Full Stack, Nuxt, Vue' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    githubToken: process.env.GITHUB_TOKEN || '',
    public: {
      apiBase: process.env.API_BASE || ''
    }
  },

  nitro: {
    preset: 'node-server'
  }
})
