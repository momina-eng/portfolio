import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '@/components/layout'
import { ProjectDetailsView } from '@/components/projects'
import { Footer } from '@/sections/Footer'
import {
  getAdjacentProjects,
  getProjectDetails,
  profile,
} from '@/content'
import './page.css'

export function ProjectDetailsPage() {
  const { slug = '' } = useParams()
  const details = getProjectDetails(slug)
  const adjacent = getAdjacentProjects(slug)

  useEffect(() => {
    if (!details) {
      document.title = `Project not found | ${profile.name}`
      return
    }
    document.title = `${details.title} | ${profile.name}`
    const description =
      details.caseStudy?.overview ?? details.summary
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
    return () => {
      document.title = profile.name
    }
  }, [details])

  if (!details) {
    return (
      <div className="route-page">
        <Container>
          <div className="route-page__hero">
            <h1 className="route-page__title">Project not found.</h1>
            <p className="route-page__lede">
              That case study is unavailable. Return to the project archive to
              continue exploring.
            </p>
            <Link className="route-page__link" to="/projects">
              ← Back to projects
            </Link>
          </div>
        </Container>
        <Footer />
      </div>
    )
  }

  return (
    <div className="route-page">
      <Container>
        <ProjectDetailsView
          details={details}
          previousSlug={adjacent.previous?.slug}
          nextSlug={adjacent.next?.slug}
        />
      </Container>
      <Footer />
    </div>
  )
}
