<template>
  <div class="flex w-full px-4">
    <div class="max-w-[85%] space-y-3">
      <!-- Text content -->
      <div
        v-if="textContent"
        class="rounded-2xl bg-muted/50 px-4 py-3 shadow-sm backdrop-blur-sm"
      >
        <div class="prose prose-sm dark:prose-invert max-w-none text-foreground">
          <p class="leading-relaxed whitespace-pre-wrap">{{ textContent }}</p>
          <span
            v-if="isLoading"
            class="inline-block h-4 w-1 animate-pulse bg-muted-foreground/60 ml-1"
          />
        </div>
      </div>

      <!-- Tool results -->
      <div v-if="toolResults.length > 0" class="space-y-2">
        <div
          v-for="(tool, index) in toolResults"
          :key="index"
          class="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div class="text-sm font-semibold text-foreground mb-2">
            {{ getToolName(tool.toolName) }}
          </div>
          <div class="text-sm text-muted-foreground leading-relaxed">
            {{ tool.result }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '~/types'
import { TOOL_NAMES } from '~/constants'

interface Props {
  message: ChatMessage
  isLoading?: boolean
}

const props = defineProps<Props>()

/**
 * Extract text content from message
 */
const textContent = computed(() => {
  if (typeof props.message.content === 'string') {
    return props.message.content
  }
  return ''
})

/**
 * Extract tool invocation results
 */
const toolResults = computed(() => {
  const results: any[] = []

  // Check if message has tool invocations
  if (props.message.toolInvocations) {
    for (const tool of props.message.toolInvocations) {
      if (tool.state === 'result') {
        results.push({
          toolName: tool.toolName,
          result: tool.result,
        })
      }
    }
  }

  return results
})

/**
 * Get display name for tool
 */
const getToolName = (toolName: string) => {
  return TOOL_NAMES[toolName] || toolName
}
</script>
