import { getCaseStudyBySlug } from './caseStudies'
import { getProjectBySlug, projects } from './projects'
import type { ProjectDetails } from './types'

export function getProjectDetails(slug: string): ProjectDetails | null {
  const project = getProjectBySlug(slug)
  if (!project) return null
  return {
    ...project,
    caseStudy: getCaseStudyBySlug(slug),
  }
}

export function getAllProjectDetails(): ProjectDetails[] {
  return projects.map((project) => ({
    ...project,
    caseStudy: getCaseStudyBySlug(project.slug),
  }))
}
