<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20 bg-gradient-to-b from-background via-background to-muted/20">
    <!-- Big blurred footer word -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
      <div
        class="hidden bg-gradient-to-b from-muted-foreground/10 to-transparent bg-clip-text text-[10rem] font-black leading-none text-transparent select-none sm:block lg:text-[16rem]"
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
      <h2 class="text-muted-foreground mt-1 text-xl font-medium tracking-tight md:text-2xl">
        Hey, I'm Your Name 👋
      </h2>
      <h1 class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
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
        <div class="mx-auto flex items-center rounded-full border border-border bg-card/50 py-2.5 pr-2 pl-6 backdrop-blur-md shadow-sm transition-all hover:border-border/80 hover:shadow-md focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
          <input
            v-model="input"
            type="text"
            placeholder="Ask me anything…"
            class="w-full border-none bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            :disabled="!input.trim()"
            aria-label="Submit question"
            class="flex items-center justify-center rounded-full bg-primary p-2.5 text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </button>
        </div>
      </form>

      <!-- Quick-question grid -->
      <div class="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
        <Button
          v-for="{ key, question, color, icon } in QUESTION_CONFIG"
          :key="key"
          @click="goToChat(question)"
          variant="outline"
          class="group aspect-square w-full cursor-pointer rounded-2xl border border-border bg-card/50 py-8 shadow-sm backdrop-blur-sm transition-all hover:border-border/80 hover:bg-card hover:shadow-md active:scale-95 md:p-10"
        >
          <div class="flex h-full flex-col items-center justify-center gap-2 text-foreground">
            <Icon :name="icon" :style="{ color }" class="h-6 w-6 transition-transform group-hover:scale-110" />
            <span class="text-xs font-medium tracking-tight sm:text-sm">{{ key }}</span>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QUESTIONS, QUESTION_CONFIG } from '~/constants'

const input = ref('')
const router = useRouter()

/**
 * Navigate to chat page with a query
 */
const goToChat = (query: string) => {
  router.push(`/chat?query=${encodeURIComponent(query)}`)
}

/**
 * Handle form submission
 */
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
