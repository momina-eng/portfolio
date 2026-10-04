import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui'
import { profile } from '@/content'
import {
  heroCopyItem,
  markerLineReveal,
  markerReveal,
  staggerContainer,
} from '@/motion'
import { HeroPCStage } from '@/scenes/hero/HeroPCStage'
import { HeroSwirlBackground } from './HeroSwirlBackground'
import './Hero.css'

export function Hero() {
  const reduceMotion = !!useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const copyVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : heroCopyItem

  const markerDot = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : markerReveal

  const markerLine = reduceMotion
    ? { hidden: { scaleY: 1 }, show: { scaleY: 1 } }
    : markerLineReveal

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <HeroSwirlBackground />
      <div className="hero__layout">
        <div className="hero__content">
          <div className="hero__marker" aria-hidden="true">
            <motion.span
              className="hero__marker-dot"
              variants={markerDot}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            />
            <motion.span
              className="hero__marker-line"
              variants={markerLine}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              style={{ originY: 0 }}
            />
          </div>

          <motion.div
            className="hero__copy"
            variants={
              reduceMotion
                ? { hidden: {}, show: {} }
                : staggerContainer
            }
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
          >
            <motion.p className="hero__eyebrow" variants={copyVariants}>
              {profile.headline}
            </motion.p>

            <motion.h1
              id="hero-heading"
              className="hero__title"
              variants={copyVariants}
            >
              <span className="hero__title-line">Hi, I&apos;m</span>
              <span className="hero__title-name">{profile.firstName}</span>
            </motion.h1>

            <motion.p className="hero__summary" variants={copyVariants}>
              {profile.shortSummary}
            </motion.p>

            <motion.div className="hero__actions" variants={copyVariants}>
              <Button href="/#projects">Explore Projects</Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <HeroPCStage />
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to about">
        <span className="hero__scroll-line" />
      </a>
    </section>
  )
}
