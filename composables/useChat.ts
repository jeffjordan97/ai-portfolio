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
      let buffer = ''

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: '',
        toolInvocations: [],
      }
      messages.value.push(aiMessage)

      loadingSubmit.value = false

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (!line.trim()) continue

            // Text delta (type 0)
            if (line.startsWith('0:"')) {
              try {
                // Extract string content between quotes, handling escaped quotes
                const content = line.substring(2)
                const parsed = JSON.parse(content)
                aiResponse += parsed
                aiMessage.content = aiResponse
              } catch (e) {
                console.error('Error parsing text delta:', e)
              }
            }
            // Tool call (type 9)
            else if (line.startsWith('9:')) {
              try {
                const toolCall = JSON.parse(line.substring(2))
                if (!aiMessage.toolInvocations) {
                  aiMessage.toolInvocations = []
                }
                aiMessage.toolInvocations.push({
                  state: 'call',
                  toolCallId: toolCall.toolCallId,
                  toolName: toolCall.toolName,
                  args: toolCall.args,
                })
              } catch (e) {
                console.error('Error parsing tool call:', e)
              }
            }
            // Tool result (type a)
            else if (line.startsWith('a:')) {
              try {
                const toolResult = JSON.parse(line.substring(2))
                const invocation = aiMessage.toolInvocations?.find(
                  (t) => t.toolCallId === toolResult.toolCallId
                )
                if (invocation) {
                  invocation.state = 'result'
                  invocation.result = toolResult.result
                }
              } catch (e) {
                console.error('Error parsing tool result:', e)
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
