import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout'
import { CompactProjectCard } from '@/components/projects'
import { SectionHeading } from '@/components/ui'
import { featuredProjects } from '@/content'
import { sectionItem, sectionStagger, viewportOnce } from '@/motion'
import './FeaturedProjects.css'

export function FeaturedProjects() {
  const reduceMotion = !!useReducedMotion()
  const item = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : sectionItem
  const container = reduceMotion
    ? { hidden: {}, show: {} }
    : sectionStagger

  return (
    <section
      className="featured-projects"
      id="projects"
      aria-labelledby="featured-projects-heading"
    >
      <Container>
        <motion.div
          className="featured-projects__inner"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="featured-projects__intro">
            <motion.div variants={item}>
              <SectionHeading label="Work" id="featured-projects-heading">
                Projects.
              </SectionHeading>
            </motion.div>
            <motion.p className="featured-projects__lede" variants={item}>
              Selected work across AI radiology assistance, security remediation,
              semantic retrieval, full-stack platforms, and database applications.
              Open a case study for the full technical narrative.
            </motion.p>
          </div>

          <motion.div className="featured-projects__grid" variants={container}>
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={item}>
                <CompactProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="featured-projects__cta" variants={item}>
            <Link className="button button--secondary button--md" to="/projects">
              View all projects
            </Link>
            <Link className="featured-projects__text-link" to="/projects">
              View the full archive →
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
