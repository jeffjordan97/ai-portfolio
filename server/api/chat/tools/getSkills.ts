import { tool } from 'ai'
import { z } from 'zod'

export const getSkills = tool({
  description: 'This tool shows a list of skills',
  parameters: z.object({}),
  execute: async () => {
    return 'You can see all my skills above.'
  },
})
