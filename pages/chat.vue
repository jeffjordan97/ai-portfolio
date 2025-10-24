<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Header with Avatar -->
    <div
      class="fixed top-0 right-0 left-0 z-50"
      :style="{
        background:
          'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
      }"
    >
      <div
        class="transition-all duration-300 ease-in-out"
        :class="hasActiveTool ? 'pt-6 pb-0' : 'py-6'"
      >
        <div class="flex justify-center">
          <div
            :class="[
              'flex items-center justify-center rounded-full transition-all duration-300',
              hasActiveTool ? 'h-20 w-20' : 'h-28 w-28',
            ]"
          >
            <div class="relative cursor-pointer" @click="navigateTo('/')">
              <img
                src="/landing-memojis.svg"
                alt="Avatar"
                class="h-full w-full scale-[1.8] object-contain"
              />
            </div>
          </div>
        </div>

        <!-- Latest User Message -->
        <div
          v-if="latestUserMessage && !currentAIMessage"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :leave="{ opacity: 0, y: 20 }"
          class="mx-auto flex max-w-3xl px-4"
        >
          <div class="flex w-full justify-end">
            <div class="max-w-[80%] rounded-2xl bg-blue-500 px-4 py-2 text-white">
              {{ latestUserMessage.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="container mx-auto flex h-full max-w-3xl flex-col">
      <!-- Scrollable Chat Content -->
      <div
        ref="chatContainer"
        class="flex-1 overflow-y-auto px-2 custom-scrollbar"
        :style="{ paddingTop: `${headerHeight}px` }"
      >
        <!-- Landing (Empty State) -->
        <div
          v-if="isEmptyState"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          class="flex min-h-full items-center justify-center"
        >
          <ChatLanding @submit-query="handleSubmitQuery" />
        </div>

        <!-- AI Response -->
        <div v-else-if="currentAIMessage" class="pb-4">
          <ChatMessage :message="currentAIMessage" :is-loading="isLoading" />
        </div>

        <!-- Loading State -->
        <div
          v-else-if="loadingSubmit"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          class="px-4 pt-18"
        >
          <div class="flex w-full">
            <div class="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0ms" />
                <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 150ms" />
                <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 300ms" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed Bottom Bar -->
      <div class="sticky bottom-0 bg-white px-2 pt-3 md:px-0 md:pb-4">
        <div class="relative flex flex-col items-center gap-3">
          <ChatInput
            v-model="input"
            :is-loading="isLoading"
            :disabled="loadingSubmit"
            @submit="handleSubmit"
            @stop="handleStop"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChat } from 'ai/vue'

const route = useRoute()
const input = ref('')
const loadingSubmit = ref(false)
const autoSubmitted = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const initialQuery = computed(() => route.query.query as string | undefined)

// Use the AI SDK's useChat composable
const {
  messages,
  isLoading,
  append,
  stop,
  reload,
} = useChat({
  api: '/api/chat',
  onResponse: () => {
    loadingSubmit.value = false
  },
  onFinish: () => {
    loadingSubmit.value = false
  },
  onError: (error) => {
    loadingSubmit.value = false
    console.error('Chat error:', error)
  },
})

// Computed properties
const latestUserMessage = computed(() => {
  const userMessages = messages.value.filter((m) => m.role === 'user')
  return userMessages[userMessages.length - 1] || null
})

const currentAIMessage = computed(() => {
  const aiMessages = messages.value.filter((m) => m.role === 'assistant')
  const latestAI = aiMessages[aiMessages.length - 1] || null
  const latestUserIndex = messages.value.findLastIndex((m) => m.role === 'user')
  const latestAIIndex = messages.value.findLastIndex((m) => m.role === 'assistant')

  // Only show AI message if it's after the latest user message
  if (latestAIIndex < latestUserIndex) {
    return null
  }

  return latestAI
})

const hasActiveTool = computed(() => {
  return false // Simplified for now
})

const isEmptyState = computed(() => {
  return !currentAIMessage.value && !latestUserMessage.value && !loadingSubmit.value
})

const headerHeight = computed(() => {
  return hasActiveTool.value ? 100 : 180
})

// Methods
const handleSubmitQuery = async (query: string) => {
  if (!query.trim() || isLoading.value) return

  loadingSubmit.value = true
  input.value = ''

  await append({
    role: 'user',
    content: query,
  })
}

const handleSubmit = () => {
  if (input.value.trim()) {
    handleSubmitQuery(input.value)
  }
}

const handleStop = () => {
  stop()
  loadingSubmit.value = false
}

// Auto-submit initial query
onMounted(() => {
  if (initialQuery.value && !autoSubmitted.value) {
    autoSubmitted.value = true
    handleSubmitQuery(initialQuery.value)
  }
})

// Auto-scroll to bottom
watch(
  () => messages.value.length,
  () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  }
)
</script>
