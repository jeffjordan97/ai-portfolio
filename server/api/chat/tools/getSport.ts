import { tool } from 'ai'
import { z } from 'zod'

export const getSports = tool({
  description: 'This tool will show some sports photos',
  parameters: z.object({}),
  execute: async () => {
    return 'Here are my best pictures doing sports!'
  },
})
