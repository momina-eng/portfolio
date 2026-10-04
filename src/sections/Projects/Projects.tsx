import { Container } from '@/components/layout'
import {
  FeaturedProjectLead,
  ProjectShowcaseRow,
} from '@/components/projects'
import { projects } from '@/content'
import './Projects.css'

function partitionProjects() {
  const featuredIndex = projects.findIndex((project) => project.featured)
  const leadIndex = featuredIndex >= 0 ? featuredIndex : 0
  const featured = projects[leadIndex] ?? null
  const remaining = projects.filter((_, index) => index !== leadIndex)
  return { featured, remaining }
}

/** Full project archive used by the /projects page — matches reference hierarchy. */
export function ProjectsArchive() {
  const { featured, remaining } = partitionProjects()

  return (
    <section className="projects-archive" aria-labelledby="projects-archive-heading">
      <Container>
        <header className="projects-archive__intro">
          <p className="projects-archive__label">Archive</p>
          <h2 className="projects-archive__heading" id="projects-archive-heading">
            All projects.
          </h2>
          <p className="projects-archive__lede">
            Engineering work across AI radiology assistance, security
            remediation, semantic retrieval, full-stack platforms, and database
            systems. Open a case study for architecture, implementation detail,
            and outcomes.
          </p>
        </header>

        {featured ? <FeaturedProjectLead project={featured} /> : null}

        {remaining.length > 0 ? (
          <div className="projects-archive__list" aria-label="More projects">
            {remaining.map((project) => (
              <ProjectShowcaseRow key={project.id} project={project} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
