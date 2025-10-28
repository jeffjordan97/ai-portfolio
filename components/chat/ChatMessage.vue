<template>
  <div class="flex w-full px-4">
    <div class="max-w-[80%] space-y-2">
      <!-- Text content -->
      <div
        v-if="textContent"
        class="rounded-2xl bg-gray-100 dark:bg-gray-800 px-4 py-2"
      >
        <div class="prose prose-sm dark:prose-invert max-w-none">
          {{ textContent }}
          <span
            v-if="isLoading"
            class="inline-block h-4 w-1 animate-pulse bg-gray-400"
          />
        </div>
      </div>

      <!-- Tool results -->
      <div v-if="toolResults.length > 0" class="space-y-2">
        <div
          v-for="(tool, index) in toolResults"
          :key="index"
          class="rounded-xl border border-border bg-card p-4"
        >
          <div class="text-sm font-medium text-muted-foreground mb-2">
            {{ getToolName(tool.toolName) }}
          </div>
          <div class="text-sm">
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
