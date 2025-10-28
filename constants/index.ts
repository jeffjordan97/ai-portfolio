import type { QuickQuestion } from '~/types'

/**
 * Predefined quick questions for the landing page
 */
export const QUESTIONS: Record<string, string> = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: "What's the craziest thing you've ever done? What are your hobbies?",
  Contact: 'How can I contact you?',
} as const

/**
 * Quick question configuration with icons and colors
 */
export const QUESTION_CONFIG: ReadonlyArray<QuickQuestion> = [
  { key: 'Me', question: QUESTIONS.Me, color: '#329696', icon: 'lucide:laugh' },
  { key: 'Projects', question: QUESTIONS.Projects, color: '#3E9858', icon: 'lucide:briefcase-business' },
  { key: 'Skills', question: QUESTIONS.Skills, color: '#856ED9', icon: 'lucide:layers' },
  { key: 'Fun', question: QUESTIONS.Fun, color: '#B95F9D', icon: 'lucide:party-popper' },
  { key: 'Contact', question: QUESTIONS.Contact, color: '#C19433', icon: 'lucide:user-round-search' },
] as const

/**
 * Chat suggestions for the chat landing page
 */
export const CHAT_SUGGESTIONS: ReadonlyArray<string> = [
  'Tell me about yourself',
  'What are your main skills?',
  'Show me your projects',
  'What are you working on?',
  'How can I contact you?',
  'What do you do for fun?',
] as const

/**
 * Animation configuration
 */
export const MOTION_CONFIG = {
  topElement: {
    initial: { opacity: 0, y: -60 },
    enter: { opacity: 1, y: 0, transition: { type: 'ease', duration: 800 } },
  },
  bottomElement: {
    initial: { opacity: 0, y: 80 },
    enter: { opacity: 1, y: 0, transition: { type: 'ease', duration: 800, delay: 200 } },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 300, ease: 'easeOut' },
  },
} as const

/**
 * Header height configurations
 */
export const HEADER_HEIGHTS = {
  withTool: 100,
  withoutTool: 180,
} as const

/**
 * Tool name display mapping
 */
export const TOOL_NAMES: Record<string, string> = {
  getPresentation: 'About Me',
  getProjects: 'My Projects',
  getSkills: 'My Skills',
  getContact: 'Contact Information',
  getResume: 'Resume',
  getSports: 'Sports & Activities',
  getCrazy: 'Adventures',
  getInternship: 'Opportunities',
} as const
