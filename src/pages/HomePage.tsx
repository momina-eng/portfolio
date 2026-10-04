import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { FeaturedProjects } from '@/sections/FeaturedProjects'
import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { Technologies } from '@/sections/Technologies'

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const target = document.querySelector(location.hash)
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <>
      <Hero />
      <About />
      <Technologies />
      <FeaturedProjects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}
