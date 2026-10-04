import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout'
import { SectionHeading } from '@/components/ui'
import { experience } from '@/content'
import {
  sectionItem,
  sectionStagger,
  timelineLineReveal,
  timelineMarkerReveal,
  viewportOnce,
} from '@/motion'
import './Experience.css'

function isCurrentRole(period: string) {
  return /present/i.test(period)
}

export function Experience() {
  const reduceMotion = !!useReducedMotion()
  const item = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : sectionItem
  const container = reduceMotion
    ? { hidden: {}, show: {} }
    : sectionStagger
  const line = reduceMotion
    ? { hidden: { scaleY: 1, opacity: 1 }, show: { scaleY: 1, opacity: 1 } }
    : timelineLineReveal
  const marker = reduceMotion
    ? { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } }
    : timelineMarkerReveal

  return (
    <section
      className="experience"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <Container>
        <motion.div
          className="experience__inner"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className="experience__header" variants={item}>
            <SectionHeading label="Experience" id="experience-heading">
              Experience.
            </SectionHeading>
            <p className="experience__lede">
              Professional experience applying software engineering and AI
              development in practical delivery environments.
            </p>
          </motion.div>

          <div className="experience__timeline">
            <motion.div
              className="experience__spine"
              aria-hidden="true"
              variants={line}
              style={{ originY: 0 }}
            />

            <ol className="experience__list">
              {experience.map((entry) => {
                const current = isCurrentRole(entry.period)
                return (
                  <motion.li
                    key={`${entry.role}-${entry.period}`}
                    className={[
                      'experience__item',
                      current ? 'experience__item--current' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    variants={item}
                  >
                    <motion.span
                      className="experience__node"
                      aria-hidden="true"
                      variants={marker}
                    />

                    <article className="experience__card">
                      <header className="experience__card-head">
                        <div className="experience__card-titles">
                          <h3 className="experience__role">{entry.role}</h3>
                          <p className="experience__org">{entry.organization}</p>
                        </div>
                        <div className="experience__card-meta">
                          <p className="experience__period">{entry.period}</p>
                          {current ? (
                            <span className="experience__now">Current</span>
                          ) : null}
                        </div>
                      </header>

                      {entry.summary ? (
                        <p className="experience__summary">{entry.summary}</p>
                      ) : null}

                      {entry.bullets.length > 0 ? (
                        <ul className="experience__bullets">
                          {entry.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
