export type OverviewCardItem = {
  id: 'fullstack' | 'frontend' | 'backend' | 'ai'
  title: string
  titleLines: [string, string]
}

/**
 * Overview section content — curated portfolio introduction only.
 * Experience / projects live in their dedicated sections.
 */
export const overviewIntro =
  'I am a Software Engineering student focused on building reliable, user-centered software. My work spans modern web applications, structured backends, semantic retrieval systems, and AI-assisted workflows—turning well-defined problems into products that are clear, maintainable, and ready for real use.'

export const overviewCards: OverviewCardItem[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    titleLines: ['Full-Stack', 'Developer'],
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    titleLines: ['Frontend', 'Developer'],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    titleLines: ['Backend', 'Developer'],
  },
  {
    id: 'ai',
    title: 'AI Engineer',
    titleLines: ['AI', 'Engineer'],
  },
]
