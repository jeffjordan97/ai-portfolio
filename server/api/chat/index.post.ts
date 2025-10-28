import { streamText } from 'ai'
import { SYSTEM_PROMPT } from './prompt'
import { getContact } from './tools/getContact'
import { getCrazy } from './tools/getCrazy'
import { getInternship } from './tools/getInternship'
import { getPresentation } from './tools/getPresentation'
import { getProjects } from './tools/getProjects'
import { getResume } from './tools/getResume'
import { getSkills } from './tools/getSkills'
import { getSports } from './tools/getSport'

export default defineLazyEventHandler(async () => {
  // Get the configured LLM model
  const llmConfig = getLLMModel()

  console.log(`[Chat API] Using LLM provider: ${llmConfig.provider}`)

  return defineEventHandler(async (event) => {
    try {
      const { messages } = await readBody(event)

      if (!messages || !Array.isArray(messages)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid request body',
        })
      }

      // Add system prompt at the beginning
      messages.unshift(SYSTEM_PROMPT)

      const tools = {
        getProjects,
        getPresentation,
        getResume,
        getContact,
        getSkills,
        getSports,
        getCrazy,
        getInternship,
      }

      const result = streamText({
        model: llmConfig.model,
        messages,
        toolCallStreaming: true,
        tools,
        maxSteps: 2,
      })

      return result.toDataStreamResponse()
    } catch (error: any) {
      console.error('Chat API error:', error)
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.message || 'Internal server error',
      })
    }
  })
})
