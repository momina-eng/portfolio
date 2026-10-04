import { Link } from 'react-router-dom'
import { usePointerTilt } from '@/hooks'
import type { ProjectItem } from '@/content/types'
import { ProjectLogoBadge } from './ProjectLogos/ProjectLogoBadge'
import './CompactProjectCard.css'

type CompactProjectCardProps = {
  project: ProjectItem
}

function formatTechPill(tech: string): string {
  const slug = tech.replace(/[^A-Za-z0-9+.#]/g, '').toLowerCase()
  return slug ? `#${slug}` : tech
}

/**
 * Homepage Work card — preview media, pill tags, gradient glow, pointer tilt.
 * Full case study lives on /projects/:slug.
 *
 * Click target is a separate non-tilting Link overlay so 3D transform updates
 * during pointermove never cancel navigation.
 */
export function CompactProjectCard({ project }: CompactProjectCardProps) {
  const tags = project.technologies.slice(0, 4)
  const preview = project.logo ?? project.cover ?? project.thumbnail
  const { containerRef, surfaceRef, onPointerMove, onPointerLeave } =
    usePointerTilt<HTMLElement, HTMLDivElement>({
      maxTilt: 9,
      hoverScale: 1.02,
      enabledClass: 'compact-project--tilt',
    })

  return (
    <article
      ref={containerRef}
      className="compact-project"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div ref={surfaceRef} className="compact-project__surface">
        <div className="compact-project__shine" aria-hidden="true" />

        <div
          className="compact-project__media"
          data-logo={project.logo ? project.id : undefined}
        >
          <ProjectLogoBadge src={project.logo} />
          {preview ? (
            <img
              className={[
                'compact-project__image',
                project.logo ? 'compact-project__image--logo' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              src={preview}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : (
            <div className="compact-project__placeholder" aria-hidden="true" />
          )}
          <div className="compact-project__media-fade" aria-hidden="true" />
        </div>

        <div className="compact-project__body">
          <div className="compact-project__header">
            {project.category ? (
              <span className="compact-project__badge">{project.category}</span>
            ) : (
              <span />
            )}
            <span className="compact-project__arrow" aria-hidden="true">
              ↗
            </span>
          </div>

          <h3 className="compact-project__title">{project.title}</h3>

          {project.subtitle ? (
            <p className="compact-project__tagline">{project.subtitle}</p>
          ) : null}

          <p className="compact-project__summary">{project.summary}</p>

          <ul className="compact-project__tags">
            {tags.map((tech) => (
              <li key={tech}>
                <span className="compact-project__pill">{formatTechPill(tech)}</span>
              </li>
            ))}
          </ul>

          <span className="compact-project__cta">View project →</span>
        </div>
      </div>

      <Link
        className="compact-project__hit"
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
      />
    </article>
  )
}
