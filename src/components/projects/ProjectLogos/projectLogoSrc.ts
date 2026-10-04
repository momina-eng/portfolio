import { getProjectById, projects } from '@/content/projects'

/**
 * Resolve a project logo URL from the shared projects data (`project.logo`).
 * Single source of truth: `src/content/projects.ts` → each item's `logo` field.
 */
export function getProjectLogoSrc(projectId: string): string | null {
  return getProjectById(projectId)?.logo ?? null
}

/** Convenience map derived from projects data (id → logo URL). */
export const projectLogoSrcMap: Record<string, string> = Object.fromEntries(
  projects
    .filter((project) => Boolean(project.logo))
    .map((project) => [project.id, project.logo as string]),
)
