/**
 * Portfolio content types.
 * Source of truth for facts: docs/cv/Momina_Parsa_Resume.pdf
 * Project media/case-study substance from shared genuine project assets.
 */

export type SocialLink = {
  label: string
  href: string
}

export type Profile = {
  name: string
  firstName: string
  headline: string
  location: string
  summary: string
  shortSummary: string
}

export type ExperienceItem = {
  role: string
  organization: string
  period: string
  /** Short portfolio narrative — not a CV paragraph dump. */
  summary?: string
  /** High-value contributions only (keep short). */
  bullets: string[]
}

export type EducationItem = {
  id: string
  degree: string
  institution: string
  location?: string
  status?: string
  period: string
  summary?: string
  coursework?: string[]
}

export type ProjectVisualKind = 'media' | 'abstract'

export type ProjectFeature = {
  id: string
  title: string
  description: string
}

export type ProjectWorkflowStep = {
  id: string
  title: string
  description?: string
}

export type ProjectTechGroup = {
  id: string
  label: string
  items: string[]
}

export type ProjectChallenge = {
  id: string
  title?: string
  description: string
}

export type ProjectArchitecture = {
  title?: string
  subtitle?: string
  summary: string
  points?: string[]
}

export type ProjectGalleryItem = {
  id: string
  src: string
  alt: string
  caption?: string
}

export type ProjectDemo = {
  title?: string
  subtitle?: string
  src: string
  poster?: string
}

export type ProjectTechHighlight = {
  id: string
  label: string
  detail?: string
}

export type ProjectLearning = {
  id: string
  title?: string
  description: string
}

export type ProjectResult = {
  id: string
  label: string
  value?: string
}

export type ProjectCaseStudy = {
  category: string
  overview: string
  problem: string
  solution: string
  outcome?: string | null
  heroDescription?: string
  role?: string | null
  team?: string | null
  duration?: string | null
  workflow?: Array<string | ProjectWorkflowStep>
  features?: ProjectFeature[]
  techGroups?: ProjectTechGroup[]
  techHighlights?: Array<string | ProjectTechHighlight>
  architecture?: ProjectArchitecture | null
  challenges?: ProjectChallenge[]
  learnings?: Array<string | ProjectLearning>
  results?: Array<string | ProjectResult>
  nextSteps?: string | null
  nextVersion?: string | string[] | null
  gallery?: ProjectGalleryItem[]
  demo?: ProjectDemo | null
}

export type ProjectItem = {
  id: string
  slug: string
  title: string
  subtitle?: string
  category?: string
  formalTitle?: string
  summary: string
  description: string[]
  technologies: string[]
  featured?: boolean
  visual: ProjectVisualKind
  /** Product screenshot used on homepage/listing cards */
  cover?: string
  thumbnail?: string
  /** Brand mark used in project-detail hero */
  logo?: string
  demo?: string
  gallery?: string[]
  github?: string | null
  liveDemo?: string | null
}

export type ProjectDetails = ProjectItem & {
  caseStudy: ProjectCaseStudy | null
}

export type ContactInfo = {
  email: string
  phone: string
  location: string
  github: SocialLink
  linkedin: SocialLink
}

export type SiteContent = {
  profile: Profile
  experience: ExperienceItem[]
  education: EducationItem[]
  projects: ProjectItem[]
  contact: ContactInfo
}
