import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/layout'
import { SectionHeading } from '@/components/ui'
import { education } from '@/content'
import { sectionItem, sectionStagger, viewportOnce } from '@/motion'
import './Education.css'

export function Education() {
  const reduceMotion = !!useReducedMotion()
  const item = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : sectionItem
  const container = reduceMotion
    ? { hidden: {}, show: {} }
    : sectionStagger

  return (
    <section
      className="education"
      id="education"
      aria-labelledby="education-heading"
    >
      <Container>
        <motion.div
          className="education__inner"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className="education__header" variants={item}>
            <SectionHeading label="Education" id="education-heading">
              Education.
            </SectionHeading>
            <p className="education__lede">
              Academic foundation in software engineering, reinforced through
              coursework and hands-on systems work.
            </p>
          </motion.div>

          <div className="education__list">
            {education.map((entry) => (
              <motion.article
                key={entry.id}
                className="education__card"
                variants={item}
              >
                <header className="education__card-head">
                  <div className="education__card-titles">
                    {entry.status ? (
                      <p className="education__status">{entry.status}</p>
                    ) : null}
                    <h3 className="education__degree">{entry.degree}</h3>
                    <p className="education__institution">
                      {entry.institution}
                      {entry.location ? (
                        <>
                          <span className="education__sep" aria-hidden="true">
                            ·
                          </span>
                          {entry.location}
                        </>
                      ) : null}
                    </p>
                  </div>
                  <p className="education__period">{entry.period}</p>
                </header>

                {entry.summary ? (
                  <p className="education__summary">{entry.summary}</p>
                ) : null}

                {entry.coursework && entry.coursework.length > 0 ? (
                  <div className="education__coursework">
                    <p className="education__coursework-label">
                      Relevant Coursework
                    </p>
                    <ul className="education__tags">
                      {entry.coursework.map((course) => (
                        <li key={course}>
                          <span className="education__tag">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
