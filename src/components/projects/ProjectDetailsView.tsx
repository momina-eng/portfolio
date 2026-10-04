import { Link } from 'react-router-dom'
import { Button, SectionHeading, TechTag } from '@/components/ui'
import type { ProjectDetails } from '@/content/types'
import { ProjectMedia } from './ProjectMedia'
import './ProjectDetailsView.css'

type ProjectDetailsViewProps = {
  details: ProjectDetails
  previousSlug?: string | null
  nextSlug?: string | null
}

function normalizeWorkflow(
  workflow: NonNullable<NonNullable<ProjectDetails['caseStudy']>['workflow']>,
) {
  return workflow.map((step, index) =>
    typeof step === 'string'
      ? { id: `step-${index}`, title: step }
      : step,
  )
}

function normalizeLearning(
  item: string | { id: string; title?: string; description: string },
  index: number,
) {
  if (typeof item === 'string') {
    return { id: `learning-${index}`, description: item }
  }
  return item
}

function normalizeResult(
  item: string | { id: string; label: string; value?: string },
  index: number,
) {
  if (typeof item === 'string') {
    return { id: `result-${index}`, label: item, value: '✓' }
  }
  return item
}

function normalizeHighlight(
  item: string | { id: string; label: string; detail?: string },
  index: number,
) {
  if (typeof item === 'string') {
    return { id: `highlight-${index}`, label: item }
  }
  return item
}

function normalizeNextVersion(nextVersion: string | string[]) {
  return Array.isArray(nextVersion) ? nextVersion : [nextVersion]
}

export function ProjectDetailsView({
  details,
  previousSlug = null,
  nextSlug = null,
}: ProjectDetailsViewProps) {
  const study = details.caseStudy
  const lede = study?.heroDescription ?? study?.overview ?? details.summary

  return (
    <article className="project-details">
      <header className="project-details__hero">
        <Link className="project-details__back" to="/projects">
          ← Back to projects
        </Link>

        <div className="project-details__hero-grid">
          <div className="project-details__hero-copy">
            {study?.category || details.category ? (
              <p className="project-details__category">
                {study?.category ?? details.category}
              </p>
            ) : null}
            <h1 className="project-details__title">{details.title}</h1>
            {details.subtitle ? (
              <p className="project-details__tagline">{details.subtitle}</p>
            ) : null}
            <p className="project-details__lede">{lede}</p>

            {(study?.role || study?.team) && (
              <dl className="project-details__meta">
                {study.role ? (
                  <div>
                    <dt>Role</dt>
                    <dd>{study.role}</dd>
                  </div>
                ) : null}
                {study.team ? (
                  <div>
                    <dt>Team</dt>
                    <dd>{study.team}</dd>
                  </div>
                ) : null}
              </dl>
            )}

            <ul className="project-details__tech">
              {details.technologies.map((tech) => (
                <li key={tech}>
                  <TechTag>{tech}</TechTag>
                </li>
              ))}
            </ul>
            {(details.github || details.liveDemo) && (
              <div className="project-details__actions">
                {details.liveDemo ? (
                  <Button href={details.liveDemo} target="_blank" rel="noreferrer">
                    Live demo
                  </Button>
                ) : null}
                {details.github ? (
                  <Button
                    href={details.github}
                    variant="secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </Button>
                ) : null}
              </div>
            )}
          </div>

          <div className="project-details__hero-media">
            {details.logo ? (
              <div className="project-details__brand-frame">
                <div className="project-details__brand-chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="project-details__brand-stage">
                  <img
                    src={details.logo}
                    alt={`${details.title} logo`}
                    className="project-details__brand-logo"
                  />
                </div>
              </div>
            ) : (
              <ProjectMedia
                project={{
                  ...details,
                  demo: details.demo ?? study?.demo?.src,
                }}
                featured={Boolean(study?.demo)}
              />
            )}
          </div>
        </div>
      </header>

      {study ? (
        <>
          <section className="project-details__block">
            <SectionHeading label="Overview">Overview.</SectionHeading>
            <p className="project-details__copy">{study.overview}</p>
          </section>

          <section className="project-details__split">
            <div className="project-details__block">
              <SectionHeading label="Problem">Problem.</SectionHeading>
              <p className="project-details__copy">{study.problem}</p>
            </div>
            <div className="project-details__block">
              <SectionHeading label="Solution">Solution.</SectionHeading>
              <p className="project-details__copy">{study.solution}</p>
            </div>
          </section>

          {study.workflow && study.workflow.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Workflow">How it runs.</SectionHeading>
              <ol className="project-details__workflow">
                {normalizeWorkflow(study.workflow).map((step) => (
                  <li key={step.id}>
                    <strong>{step.title}</strong>
                    {step.description ? <span>{step.description}</span> : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {study.features && study.features.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Features">Key capabilities.</SectionHeading>
              <div className="project-details__feature-grid">
                {study.features.map((feature) => (
                  <div key={feature.id} className="project-details__feature">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {study.demo ? (
            <section className="project-details__block">
              <SectionHeading label="Demo">
                {study.demo.title ?? 'Demonstration.'}
              </SectionHeading>
              {study.demo.subtitle ? (
                <p className="project-details__copy">{study.demo.subtitle}</p>
              ) : null}
              <div className="project-details__video-frame">
                <video
                  className="project-details__video"
                  controls
                  playsInline
                  preload="metadata"
                  poster={study.demo.poster}
                >
                  <source src={study.demo.src} type="video/mp4" />
                </video>
              </div>
            </section>
          ) : null}

          {study.gallery && study.gallery.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Gallery">Selected views.</SectionHeading>
              <div className="project-details__gallery">
                {study.gallery.map((item) => (
                  <figure key={item.id} className="project-details__shot">
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {study.techGroups && study.techGroups.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Stack">Technology stack.</SectionHeading>
              <div className="project-details__stack-grid">
                {study.techGroups.map((group) => (
                  <div key={group.id} className="project-details__stack">
                    <h3>{group.label}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {study.techHighlights && study.techHighlights.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Highlights">Technical notes.</SectionHeading>
              <ul className="project-details__highlights">
                {study.techHighlights.map((item, index) => {
                  const highlight = normalizeHighlight(item, index)
                  return (
                    <li key={highlight.id}>
                      <strong>{highlight.label}</strong>
                      {highlight.detail ? <span>{highlight.detail}</span> : null}
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}

          {study.architecture ? (
            <section className="project-details__block">
              <SectionHeading label="Architecture">Architecture.</SectionHeading>
              {study.architecture.title ? (
                <h3 className="project-details__subhead">{study.architecture.title}</h3>
              ) : null}
              <p className="project-details__copy">{study.architecture.summary}</p>
              {study.architecture.points && study.architecture.points.length > 0 ? (
                <ul className="project-details__points">
                  {study.architecture.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}

          {study.challenges && study.challenges.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Challenges">Engineering notes.</SectionHeading>
              <div className="project-details__challenge-list">
                {study.challenges.map((challenge) => (
                  <div key={challenge.id} className="project-details__challenge">
                    {challenge.title ? <h3>{challenge.title}</h3> : null}
                    <p>{challenge.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {study.learnings && study.learnings.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Learnings">What I took away.</SectionHeading>
              <ul className="project-details__points">
                {study.learnings.map((item, index) => {
                  const learning = normalizeLearning(item, index)
                  return (
                    <li key={learning.id}>
                      {learning.title ? <strong>{learning.title} — </strong> : null}
                      {learning.description}
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}

          {study.results && study.results.length > 0 ? (
            <section className="project-details__block">
              <SectionHeading label="Results">Results.</SectionHeading>
              <ul className="project-details__results">
                {study.results.map((item, index) => {
                  const result = normalizeResult(item, index)
                  return (
                    <li key={result.id}>
                      <span className="project-details__result-value">
                        {result.value ?? '✓'}
                      </span>
                      <span>{result.label}</span>
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}

          {study.outcome ? (
            <section className="project-details__block">
              <SectionHeading label="Outcome">Outcome.</SectionHeading>
              <p className="project-details__copy">{study.outcome}</p>
            </section>
          ) : null}

          {study.nextVersion ? (
            <section className="project-details__block">
              <SectionHeading label="Next">Next version.</SectionHeading>
              <ul className="project-details__points">
                {normalizeNextVersion(study.nextVersion).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {study.nextSteps ? (
            <section className="project-details__block">
              <SectionHeading label="Next steps">Next steps.</SectionHeading>
              <p className="project-details__copy">{study.nextSteps}</p>
            </section>
          ) : null}
        </>
      ) : (
        <section className="project-details__block">
          <SectionHeading label="Overview">Overview.</SectionHeading>
          {details.description.map((paragraph) => (
            <p key={paragraph} className="project-details__copy">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      <footer className="project-details__nav">
        {previousSlug ? (
          <Link to={`/projects/${previousSlug}`}>← Previous</Link>
        ) : (
          <span />
        )}
        <Link to="/projects">All projects</Link>
        {nextSlug ? (
          <Link to={`/projects/${nextSlug}`}>Next →</Link>
        ) : (
          <span />
        )}
      </footer>
    </article>
  )
}
