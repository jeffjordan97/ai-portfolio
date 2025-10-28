/**
 * Available LLM providers
 */
export type LLMProvider = 'anthropic' | 'openai' | 'ollama'

/**
 * LLM configuration interface
 */
export interface LLMConfig {
  provider: LLMProvider
  model: any
  apiKey?: string
}

/**
 * Provider information for display/debugging
 */
export interface ProviderInfo {
  name: string
  model: string
  configured: boolean
  baseURL?: string
}

/**
 * LLM info response
 */
export interface LLMInfoResponse {
  success: boolean
  current: LLMProvider
  currentInfo: ProviderInfo
  allProviders: Record<LLMProvider, ProviderInfo>
  error?: string
}

/**
 * Base message type for AI chat
 */
export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/**
 * Chat message with extended properties
 */
export interface ChatMessage extends Message {
  id: string
  toolInvocations?: ToolInvocation[]
}

/**
 * Tool invocation state
 */
export type ToolState = 'call' | 'result' | 'error'

/**
 * Tool invocation interface
 */
export interface ToolInvocation {
  state: ToolState
  toolCallId: string
  toolName: string
  args?: Record<string, any>
  result?: any
  error?: string
}

/**
 * Chat API request body
 */
export interface ChatRequest {
  messages: Message[]
}

/**
 * Quick question configuration
 */
export interface QuickQuestion {
  key: string
  question: string
  color: string
  icon: string
}

/**
 * Avatar animation state
 */
export interface AvatarState {
  isTalking: boolean
  hasActiveTool: boolean
}
