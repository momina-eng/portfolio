import { Link } from 'react-router-dom'
import { Card, TechTag } from '@/components/ui'
import type { ProjectItem } from '@/content/types'
import { ProjectMedia } from './ProjectMedia'
import './ListingProjectCard.css'

type ListingProjectCardProps = {
  project: ProjectItem
}

/** Medium-density card for the /projects listing page. */
export function ListingProjectCard({ project }: ListingProjectCardProps) {
  return (
    <article className="listing-project" id={project.slug}>
      <Card interactive padded={false} className="listing-project__surface">
        <div className="listing-project__media">
          <ProjectMedia project={project} />
        </div>
        <div className="listing-project__body">
          {project.subtitle ? (
            <p className="listing-project__eyebrow">{project.subtitle}</p>
          ) : null}
          <h2 className="listing-project__title">{project.title}</h2>
          <p className="listing-project__summary">{project.summary}</p>
          <ul className="listing-project__tags">
            {project.technologies.slice(0, 5).map((tech) => (
              <li key={tech}>
                <TechTag>{tech}</TechTag>
              </li>
            ))}
          </ul>
          <Link className="listing-project__cta" to={`/projects/${project.slug}`}>
            Open case study
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Card>
    </article>
  )
}
