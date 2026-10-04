import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout'
import { SectionHeading } from '@/components/ui'
import { overviewCards, overviewIntro } from '@/content/about'
import { sectionItem, sectionStagger, viewportOnce } from '@/motion'
import { OverviewCard } from './OverviewCard'
import './About.css'

function FacetAccent() {
  return (
    <div className="about__accent" aria-hidden="true">
      <svg
        className="about__accent-svg"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="about-facet" x1="20" y1="10" x2="140" y2="150">
            <stop offset="0%" stopColor="rgba(103,232,249,0.55)" />
            <stop offset="55%" stopColor="rgba(167,139,250,0.7)" />
            <stop offset="100%" stopColor="rgba(192,132,252,0.45)" />
          </linearGradient>
        </defs>
        <path
          d="M80 12L138 46V114L80 148L22 114V46L80 12Z"
          stroke="url(#about-facet)"
          strokeWidth="1.4"
        />
        <path
          d="M80 36L118 58V102L80 124L42 102V58L80 36Z"
          stroke="rgba(167,139,250,0.65)"
          strokeWidth="1.2"
        />
        <path
          d="M80 12V148M22 46L138 114M138 46L22 114"
          stroke="rgba(139,92,246,0.22)"
          strokeWidth="1"
        />
        <circle cx="80" cy="80" r="4.5" fill="rgba(167,139,250,0.9)" />
      </svg>
    </div>
  )
}

export function About() {
  const reduceMotion = !!useReducedMotion()
  const item = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : sectionItem
  const container = reduceMotion
    ? { hidden: {}, show: {} }
    : sectionStagger

  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <Container>
        <motion.div
          className="about__inner"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="about__intro">
            <div className="about__intro-copy">
              <motion.div variants={item}>
                <SectionHeading label="Introduction" id="about-heading">
                  Overview.
                </SectionHeading>
              </motion.div>

              <motion.p className="about__lede" variants={item}>
                {overviewIntro}
              </motion.p>
            </div>

            <motion.div className="about__visual" variants={item}>
              <FacetAccent />
            </motion.div>
          </div>

          <motion.div className="about__grid" variants={container}>
            {overviewCards.map((card) => (
              <motion.div key={card.id} className="about__card-wrap" variants={item}>
                <OverviewCard item={card} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
