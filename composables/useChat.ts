import { useChat as useAIChat } from 'ai/vue'
import type { ChatMessage } from '~/types'

/**
 * Composable for managing chat state and interactions
 * Wraps the AI SDK's useChat with custom logic
 */
export function useChat() {
  const input = ref('')
  const loadingSubmit = ref(false)
  const autoSubmitted = ref(false)
  const chatContainer = ref<HTMLElement | null>(null)

  const {
    messages,
    isLoading,
    append,
    stop,
    reload,
  } = useAIChat({
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
      // Could add toast notification here
    },
  })

  /**
   * Get the latest user message
   */
  const latestUserMessage = computed<ChatMessage | null>(() => {
    const userMessages = messages.value.filter((m) => m.role === 'user')
    return (userMessages[userMessages.length - 1] as ChatMessage) || null
  })

  /**
   * Get the current AI message
   * Returns null if the latest message is from the user
   */
  const currentAIMessage = computed<ChatMessage | null>(() => {
    const aiMessages = messages.value.filter((m) => m.role === 'assistant')
    const latestAI = (aiMessages[aiMessages.length - 1] as ChatMessage) || null
    const latestUserIndex = messages.value.findLastIndex((m) => m.role === 'user')
    const latestAIIndex = messages.value.findLastIndex((m) => m.role === 'assistant')

    // Only show AI message if it's after the latest user message
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
   * Check if we're in the empty state (no messages)
   */
  const isEmptyState = computed(() => {
    return !currentAIMessage.value && !latestUserMessage.value && !loadingSubmit.value
  })

  /**
   * Submit a query to the chat
   */
  const handleSubmitQuery = async (query: string) => {
    if (!query.trim() || isLoading.value) return

    loadingSubmit.value = true
    input.value = ''

    await append({
      role: 'user',
      content: query,
    })
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
   * Stop the current generation
   */
  const handleStop = () => {
    stop()
    loadingSubmit.value = false
  }

  /**
   * Auto-scroll to bottom of chat
   */
  const scrollToBottom = () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  }

  /**
   * Auto-submit initial query from URL
   */
  const handleInitialQuery = (query: string | undefined) => {
    if (query && !autoSubmitted.value) {
      autoSubmitted.value = true
      handleSubmitQuery(query)
    }
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
