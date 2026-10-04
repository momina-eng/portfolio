import { getProjectLogoSrc } from './projectLogoSrc'
import './ProjectLogoBadge.css'

type ProjectLogoBadgeProps = {
  /** Prefer passing the project.logo URL from content data. */
  src?: string | null
  /** Fallback lookup by project id if src is omitted. */
  projectId?: string
  className?: string
}

/** Rounded badge hosting a project logo from the shared projects data mapping. */
export function ProjectLogoBadge({
  src,
  projectId,
  className = '',
}: ProjectLogoBadgeProps) {
  const resolved = src ?? (projectId ? getProjectLogoSrc(projectId) : null)
  if (!resolved) return null

  return (
    <div
      className={['project-logo-badge', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <img
        className="project-logo-badge__img"
        src={resolved}
        alt=""
        width={32}
        height={32}
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
