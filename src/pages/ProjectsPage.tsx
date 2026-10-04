import { useEffect } from 'react'
import { ProjectsArchive } from '@/sections/Projects'
import { Footer } from '@/sections/Footer'
import { profile } from '@/content'
import './page.css'

export function ProjectsPage() {
  useEffect(() => {
    document.title = `Projects | ${profile.name}`
    return () => {
      document.title = profile.name
    }
  }, [])

  return (
    <div className="route-page route-page--projects">
      <ProjectsArchive />
      <Footer />
    </div>
  )
}
