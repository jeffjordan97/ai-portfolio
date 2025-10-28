import { ref, computed, watch, nextTick } from 'vue'
import type { ChatMessage } from '~/types'

/**
 * Simple composable for managing chat state
 * Implements basic chat functionality without external dependencies
 */
export function useChat() {
  const input = ref('')
  const messages = ref<ChatMessage[]>([])
  const loadingSubmit = ref(false)
  const isLoading = ref(false)
  const autoSubmitted = ref(false)
  const chatContainer = ref<HTMLElement | null>(null)

  /**
   * Get the latest user message
   */
  const latestUserMessage = computed<ChatMessage | null>(() => {
    const userMessages = messages.value.filter((m) => m.role === 'user')
    return userMessages[userMessages.length - 1] || null
  })

  /**
   * Get the current AI message
   */
  const currentAIMessage = computed<ChatMessage | null>(() => {
    const aiMessages = messages.value.filter((m) => m.role === 'assistant')
    const latestAI = aiMessages[aiMessages.length - 1] || null
    const latestUserIndex = messages.value.findLastIndex((m) => m.role === 'user')
    const latestAIIndex = messages.value.findLastIndex((m) => m.role === 'assistant')

    if (latestAIIndex < latestUserIndex) {
      return null
    }

    return latestAI
  })

  /**
   * Check if there's an active tool invocation
   */
  const hasActiveTool = computed(() => {
    if (!currentAIMessage.value) return false
    return (
      currentAIMessage.value.toolInvocations?.some(
        (tool) => tool.state === 'result'
      ) || false
    )
  })

  /**
   * Check if we're in the empty state
   */
  const isEmptyState = computed(() => {
    return !currentAIMessage.value && !latestUserMessage.value && !loadingSubmit.value
  })

  /**
   * Submit a query to the chat API
   */
  const handleSubmitQuery = async (query: string) => {
    if (!query.trim() || isLoading.value) return

    loadingSubmit.value = true
    isLoading.value = true
    input.value = ''

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
    }
    messages.value.push(userMessage)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.value.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiResponse = ''

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: '',
      }
      messages.value.push(aiMessage)

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const data = JSON.parse(line.substring(2))
                if (data) {
                  aiResponse += data
                  aiMessage.content = aiResponse
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      loadingSubmit.value = false
      isLoading.value = false
    }
  }

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (input.value.trim()) {
      handleSubmitQuery(input.value)
    }
  }

  /**
   * Stop the current generation (placeholder)
   */
  const handleStop = () => {
    isLoading.value = false
    loadingSubmit.value = false
  }

  /**
   * Auto-scroll to bottom
   */
  const scrollToBottom = () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  }

  /**
   * Handle initial query from URL
   */
  const handleInitialQuery = (query: string | undefined) => {
    if (query && !autoSubmitted.value) {
      autoSubmitted.value = true
      handleSubmitQuery(query)
    }
  }

  /**
   * Reload last message (placeholder)
   */
  const reload = () => {
    // Implement if needed
  }

  // Watch for new messages and auto-scroll
  watch(
    () => messages.value.length,
    () => {
      scrollToBottom()
    }
  )

  return {
    // State
    input,
    loadingSubmit,
    chatContainer,
    messages,
    isLoading,

    // Computed
    latestUserMessage,
    currentAIMessage,
    hasActiveTool,
    isEmptyState,

    // Methods
    handleSubmitQuery,
    handleSubmit,
    handleStop,
    handleInitialQuery,
    reload,
  }
}
