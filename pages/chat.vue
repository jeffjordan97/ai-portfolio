<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Header with Avatar -->
    <div
      class="fixed top-0 right-0 left-0 z-50 backdrop-blur-sm"
      :style="{
        background:
          'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 30%, hsl(var(--background) / 0.8) 50%, transparent 100%)',
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
            <div class="max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-sm">
              <p class="text-sm leading-relaxed">{{ latestUserMessage.content }}</p>
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
            <div class="max-w-[80%] rounded-2xl bg-muted px-4 py-3 shadow-sm">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style="animation-delay: 0ms" />
                <div class="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style="animation-delay: 150ms" />
                <div class="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style="animation-delay: 300ms" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed Bottom Bar -->
      <div class="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border/50 px-2 pt-3 md:px-0 md:pb-4">
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
import { HEADER_HEIGHTS } from '~/constants'

const route = useRoute()
const chat = useChat()

// Destructure chat composable
const {
  input,
  loadingSubmit,
  chatContainer,
  isLoading,
  latestUserMessage,
  currentAIMessage,
  hasActiveTool,
  isEmptyState,
  handleSubmitQuery,
  handleSubmit,
  handleStop,
  handleInitialQuery,
} = chat

// Computed properties
const headerHeight = computed(() => {
  return hasActiveTool.value ? HEADER_HEIGHTS.withTool : HEADER_HEIGHTS.withoutTool
})

const initialQuery = computed(() => route.query.query as string | undefined)

// Handle initial query on mount
onMounted(() => {
  handleInitialQuery(initialQuery.value)
})
</script>
