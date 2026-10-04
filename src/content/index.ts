import type { SiteContent } from './types'
import { overviewCards, overviewIntro } from './about'
import { contact } from './contact'
import { education } from './education'
import { experience } from './experience'
import { profile } from './profile'
import {
  featuredProjects,
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from './projects'
import { getAllProjectDetails, getProjectDetails } from './projectLoader'

export const siteContent: SiteContent = {
  profile,
  experience,
  education,
  projects,
  contact,
}

export type {
  SiteContent,
  ProjectDetails,
  ProjectItem,
  ProjectCaseStudy,
  EducationItem,
} from './types'
export type { OverviewCardItem } from './about'
export {
  overviewCards,
  overviewIntro,
  contact,
  education,
  experience,
  profile,
  projects,
  featuredProjects,
  getAdjacentProjects,
  getProjectBySlug,
  getAllProjectDetails,
  getProjectDetails,
}
