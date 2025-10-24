<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
    <!-- Big blurred footer word -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
      <div
        class="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] font-black leading-none text-transparent select-none sm:block lg:text-[16rem]"
        style="margin-bottom: -2.5rem"
      >
        Portfolio
      </div>
    </div>

    <!-- Header -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -60 }"
      :enter="{ opacity: 1, y: 0, transition: { type: 'ease', duration: 800 } }"
      class="z-1 mt-24 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12"
    >
      <h2 class="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
        Hey, I'm Your Name 👋
      </h2>
      <h1 class="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
        AI Portfolio
      </h1>
    </div>

    <!-- Center memoji -->
    <div class="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72">
      <img
        src="/landing-memojis.svg"
        alt="Hero memoji"
        class="translate-y-14 scale-[2] object-cover"
      />
    </div>

    <!-- Input + quick buttons -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 80 }"
      :enter="{ opacity: 1, y: 0, transition: { type: 'ease', duration: 800, delay: 200 } }"
      class="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
    >
      <!-- Free-form question -->
      <form
        @submit.prevent="submitQuery"
        class="relative w-full max-w-lg"
      >
        <div class="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
          <input
            v-model="input"
            type="text"
            placeholder="Ask me anything…"
            class="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
          />
          <button
            type="submit"
            :disabled="!input.trim()"
            aria-label="Submit question"
            class="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </button>
        </div>
      </form>

      <!-- Quick-question grid -->
      <div class="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
        <Button
          v-for="{ key, color, icon } in questionConfig"
          :key="key"
          @click="goToChat(questions[key])"
          variant="outline"
          class="border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 shadow-none backdrop-blur-lg active:scale-95 md:p-10"
        >
          <div class="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
            <Icon :name="icon" :style="{ color }" class="h-5.5 w-5.5" />
            <span class="text-xs font-medium sm:text-sm">{{ key }}</span>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const input = ref('')
const router = useRouter()

const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: 'What\'s the craziest thing you\'ve ever done? What are your hobbies?',
  Contact: 'How can I contact you?',
} as const

const questionConfig = [
  { key: 'Me', color: '#329696', icon: 'lucide:laugh' },
  { key: 'Projects', color: '#3E9858', icon: 'lucide:briefcase-business' },
  { key: 'Skills', color: '#856ED9', icon: 'lucide:layers' },
  { key: 'Fun', color: '#B95F9D', icon: 'lucide:party-popper' },
  { key: 'Contact', color: '#C19433', icon: 'lucide:user-round-search' },
] as const

const goToChat = (query: string) => {
  router.push(`/chat?query=${encodeURIComponent(query)}`)
}

const submitQuery = () => {
  if (input.value.trim()) {
    goToChat(input.value.trim())
  }
}

// Preload assets
onMounted(() => {
  const img = new Image()
  img.src = '/landing-memojis.svg'
})
</script>
