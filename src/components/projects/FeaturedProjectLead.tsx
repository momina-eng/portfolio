import { Link } from 'react-router-dom'
import { Button, TechTag } from '@/components/ui'
import type { ProjectItem } from '@/content/types'
import { ProjectMedia } from './ProjectMedia'
import './FeaturedProjectLead.css'

type FeaturedProjectLeadProps = {
  project: ProjectItem
}

/** Lead project on /projects — media + copy, matching reference archive hierarchy. */
export function FeaturedProjectLead({ project }: FeaturedProjectLeadProps) {
  return (
    <section className="featured-lead" aria-label="Featured project">
      <p className="featured-lead__eyebrow">Featured</p>
      <div className="featured-lead__layout">
        <div className="featured-lead__media">
          <ProjectMedia project={project} featured={Boolean(project.demo)} />
        </div>
        <div className="featured-lead__content">
          <div className="featured-lead__meta">
            {project.category ? (
              <span className="featured-lead__badge">{project.category}</span>
            ) : null}
          </div>
          <h2 className="featured-lead__title">{project.title}</h2>
          {project.subtitle ? (
            <p className="featured-lead__subtitle">{project.subtitle}</p>
          ) : null}
          <p className="featured-lead__summary">{project.summary}</p>
          <ul className="featured-lead__tags">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <TechTag>{tech}</TechTag>
              </li>
            ))}
          </ul>
          <div className="featured-lead__actions">
            <Button href={`/projects/${project.slug}`}>Open case study</Button>
            <Link className="featured-lead__text-link" to={`/projects/${project.slug}`}>
              View details →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
