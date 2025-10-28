import { tool } from 'ai'
import { z } from 'zod'

export const getCrazy = tool({
  description:
    "This tool will show the craziest thing I've ever done. Use it when the user asks something like: 'What's the craziest thing you've ever done?'",
  parameters: z.object({}),
  execute: async () => {
    return 'Above is a photo of an amazing adventure! One of the craziest things I have ever done.'
  },
})
