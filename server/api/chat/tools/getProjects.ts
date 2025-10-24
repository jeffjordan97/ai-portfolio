import { tool } from 'ai'
import { z } from 'zod'

export const getProjects = tool({
  description: 'This tool will show a list of all projects',
  parameters: z.object({}),
  execute: async () => {
    return 'Here are all my projects (above)! Feel free to ask me more about them!'
  },
})
