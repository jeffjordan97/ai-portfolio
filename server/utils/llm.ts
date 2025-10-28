import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { ollama } from 'ollama-ai-provider'

export type LLMProvider = 'anthropic' | 'openai' | 'ollama'

export interface LLMConfig {
  provider: LLMProvider
  model: any
  apiKey?: string
}

/**
 * Gets the configured LLM model based on environment variables
 */
export function getLLMModel(): LLMConfig {
  const config = useRuntimeConfig()
  const provider = (config.llmProvider || 'anthropic') as LLMProvider

  switch (provider) {
    case 'anthropic': {
      const apiKey = config.anthropicApiKey
      if (!apiKey) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Anthropic API key is not configured. Please set ANTHROPIC_API_KEY in your .env file.',
        })
      }
      return {
        provider: 'anthropic',
        model: anthropic(config.anthropicModel || 'claude-3-5-sonnet-20241022', { apiKey }),
        apiKey,
      }
    }

    case 'openai': {
      const apiKey = config.openaiApiKey
      if (!apiKey) {
        throw createError({
          statusCode: 500,
          statusMessage: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file.',
        })
      }
      return {
        provider: 'openai',
        model: openai(config.openaiModel || 'gpt-4o-mini', { apiKey }),
        apiKey,
      }
    }

    case 'ollama': {
      const baseURL = config.ollamaBaseUrl || 'http://localhost:11434'
      const modelName = config.ollamaModel || 'llama3.2'

      return {
        provider: 'ollama',
        model: ollama(modelName, { baseURL }),
      }
    }

    default: {
      throw createError({
        statusCode: 500,
        statusMessage: `Invalid LLM provider: ${provider}. Must be 'anthropic', 'openai', or 'ollama'.`,
      })
    }
  }
}

/**
 * Gets information about the current LLM configuration
 */
export function getLLMInfo() {
  const config = useRuntimeConfig()
  const provider = (config.llmProvider || 'anthropic') as LLMProvider

  const info: Record<LLMProvider, any> = {
    anthropic: {
      name: 'Anthropic Claude',
      model: config.anthropicModel || 'claude-3-5-sonnet-20241022',
      configured: !!config.anthropicApiKey,
    },
    openai: {
      name: 'OpenAI',
      model: config.openaiModel || 'gpt-4o-mini',
      configured: !!config.openaiApiKey,
    },
    ollama: {
      name: 'Ollama (Local)',
      model: config.ollamaModel || 'llama3.2',
      baseURL: config.ollamaBaseUrl || 'http://localhost:11434',
      configured: true, // Ollama doesn't require API key
    },
  }

  return {
    current: provider,
    currentInfo: info[provider],
    allProviders: info,
  }
}
