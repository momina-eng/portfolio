import { Link } from 'react-router-dom'
import { TechTag } from '@/components/ui'
import type { ProjectItem } from '@/content/types'
import { ProjectMedia } from './ProjectMedia'
import './ProjectShowcaseRow.css'

type ProjectShowcaseRowProps = {
  project: ProjectItem
  reverse?: boolean
}

/** Archive row: screenshot + summary + link into case study. */
export function ProjectShowcaseRow({
  project,
  reverse = false,
}: ProjectShowcaseRowProps) {
  return (
    <article
      className={[
        'showcase-row',
        reverse ? 'showcase-row--reverse' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={project.title}
    >
      <div className="showcase-row__media">
        <ProjectMedia project={project} />
      </div>
      <div className="showcase-row__content">
        <div className="showcase-row__meta">
          {project.category ? (
            <span className="showcase-row__badge">{project.category}</span>
          ) : null}
        </div>
        <h3 className="showcase-row__title">{project.title}</h3>
        {project.subtitle ? (
          <p className="showcase-row__subtitle">{project.subtitle}</p>
        ) : null}
        <p className="showcase-row__summary">{project.summary}</p>
        <ul className="showcase-row__tags">
          {project.technologies.slice(0, 6).map((tech) => (
            <li key={tech}>
              <TechTag>{tech}</TechTag>
            </li>
          ))}
        </ul>
        <Link className="showcase-row__cta" to={`/projects/${project.slug}`}>
          Open case study
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
