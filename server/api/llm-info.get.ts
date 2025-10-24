/**
 * API endpoint to get information about the current LLM configuration
 * Useful for debugging and verifying your LLM provider setup
 *
 * GET /api/llm-info
 */
export default defineEventHandler(async (event) => {
  try {
    const info = getLLMInfo()

    return {
      success: true,
      ...info,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to get LLM info',
    }
  }
})
