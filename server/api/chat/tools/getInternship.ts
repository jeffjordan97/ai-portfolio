import { tool } from 'ai'
import { z } from 'zod'

export const getInternship = tool({
  description:
    "Gives a summary of what kind of internship/opportunities I'm looking for, plus contact info. Use this tool when the user asks about job search or how to contact me for opportunities.",
  parameters: z.object({}),
  execute: async () => {
    return `Here's what I'm looking for 👇

- 📅 **Duration**: Open to internships or full-time positions
- 🌍 **Location**: Remote or on-site opportunities
- 🧑‍💻 **Focus**: AI development, full-stack web apps, SaaS products
- 🛠️ **Stack**: TypeScript, Vue/Nuxt, React/Next.js, Python, Tailwind CSS
- ✅ **What I bring**: Strong technical skills, quick learner, passionate about innovation
- 🔥 I move fast, learn faster, and I'm eager for challenges

📬 **Contact me** via:
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

Let's build something amazing together ✌️
    `
  },
})
