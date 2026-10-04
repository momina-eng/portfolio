import type { Transition, Variants } from 'framer-motion'
import { prefersReducedMotion } from './reducedMotion'

const easeSmooth = [0.16, 1, 0.3, 1] as const

export const transitions = {
  fast: { duration: 0.15, ease: easeSmooth } satisfies Transition,
  base: { duration: 0.25, ease: easeSmooth } satisfies Transition,
  reveal: { duration: 0.5, ease: easeSmooth } satisfies Transition,
  scene: { duration: 0.75, ease: easeSmooth } satisfies Transition,
}

export function motionSafe(variants: Variants): Variants {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 1 },
      show: { opacity: 1 },
    }
  }
  return variants
}

export const fadeReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: transitions.reveal,
  },
}

export const slideReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.scene,
  },
}

export const markerReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.2, ease: easeSmooth },
  },
}

export const markerLineReveal: Variants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.55, ease: easeSmooth, delay: 0.12 },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.55,
    },
  },
}

/** Faster section stagger for viewport-triggered reveals. */
export const sectionStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
}

export const sectionItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

/** Timeline spine draw (transform-based). */
export const timelineLineReveal: Variants = {
  hidden: { scaleY: 0, opacity: 0.4 },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: easeSmooth, delay: 0.12 },
  },
}

export const timelineMarkerReveal: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easeSmooth },
  },
}

export const heroCopyItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

export const viewportOnce = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -6% 0px',
} as const

