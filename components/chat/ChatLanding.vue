<template>
  <div class="flex flex-col items-center gap-6 px-4 py-8">
    <h2 class="text-2xl font-bold text-center md:text-3xl">
      What would you like to know?
    </h2>
    <p class="text-center text-muted-foreground max-w-md">
      Ask me anything about my experience, projects, skills, or just chat!
    </p>

    <div class="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="$emit('submitQuery', suggestion)"
        class="rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CHAT_SUGGESTIONS } from '~/constants'

const emit = defineEmits<{
  submitQuery: [query: string]
}>()

const suggestions = CHAT_SUGGESTIONS
</script>
