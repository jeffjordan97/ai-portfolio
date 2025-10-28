import { tool } from 'ai'
import { z } from 'zod'

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm a full-stack developer specializing in AI. I'm passionate about building innovative solutions that combine cutting-edge technology with exceptional user experiences.",
    }
  },
})
