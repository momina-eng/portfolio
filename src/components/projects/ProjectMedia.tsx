import { useEffect, useRef } from 'react'
import type { ProjectItem } from '@/content/types'
import { prefersFinePointer, prefersReducedMotion } from '@/motion'
import { ProjectLogoBadge } from './ProjectLogos/ProjectLogoBadge'
import './ProjectMedia.css'

type ProjectMediaProps = {
  project: ProjectItem
  featured?: boolean
  className?: string
}

function AbstractVisual({ title }: { title: string }) {
  return (
    <div className="project-media__abstract" aria-hidden="true">
      <div className="project-media__abstract-glow" />
      <svg
        className="project-media__abstract-svg"
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="36"
          y="28"
          width="248"
          height="144"
          rx="14"
          stroke="rgba(167,139,250,0.45)"
          strokeWidth="1.5"
        />
        <rect
          x="52"
          y="48"
          width="100"
          height="16"
          rx="4"
          fill="rgba(139,92,246,0.35)"
        />
        <rect
          x="52"
          y="76"
          width="216"
          height="10"
          rx="3"
          fill="rgba(156,153,174,0.28)"
        />
        <rect
          x="52"
          y="96"
          width="180"
          height="10"
          rx="3"
          fill="rgba(156,153,174,0.2)"
        />
        <rect
          x="52"
          y="116"
          width="200"
          height="10"
          rx="3"
          fill="rgba(156,153,174,0.16)"
        />
        <rect
          x="52"
          y="140"
          width="72"
          height="18"
          rx="5"
          stroke="rgba(167,139,250,0.5)"
          strokeWidth="1.2"
        />
        <circle cx="248" cy="56" r="10" fill="rgba(167,139,250,0.55)" />
      </svg>
      <span className="project-media__abstract-label">{title}</span>
    </div>
  )
}

/**
 * Large project preview frame used on archive / listing cards.
 * Prefers `project.logo` (contained) over screenshot covers.
 */
export function ProjectMedia({
  project,
  featured = false,
  className = '',
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewSrc = project.logo ?? project.cover ?? project.thumbnail
  const isLogo = Boolean(project.logo)
  const canPreview =
    featured &&
    Boolean(project.demo) &&
    !prefersReducedMotion() &&
    prefersFinePointer()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }, [project.demo])

  const classes = [
    'project-media',
    featured ? 'project-media--featured' : '',
    isLogo ? 'project-media--logo' : '',
    canPreview ? 'project-media--previewable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const playPreview = () => {
    if (!canPreview || !videoRef.current) return
    void videoRef.current.play().catch(() => {
      /* autoplay policies — ignore */
    })
  }

  const stopPreview = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  if (!previewSrc) {
    return (
      <div className={classes}>
        <ProjectLogoBadge src={project.logo} />
        <AbstractVisual title={project.title} />
      </div>
    )
  }

  return (
    <div
      className={classes}
      data-logo={isLogo ? project.id : undefined}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      onFocus={playPreview}
      onBlur={stopPreview}
    >
      <ProjectLogoBadge src={project.logo} />
      <div className="project-media__frame">
        <img
          src={previewSrc}
          alt=""
          className={[
            'project-media__image',
            isLogo ? 'project-media__image--logo' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          loading="lazy"
        />
        {canPreview ? (
          <video
            ref={videoRef}
            className="project-media__video"
            muted
            playsInline
            loop
            preload="metadata"
            poster={project.cover ?? previewSrc}
            aria-hidden="true"
          >
            <source src={project.demo} type="video/mp4" />
          </video>
        ) : null}
        <div className="project-media__veil" aria-hidden="true" />
      </div>
    </div>
  )
}
