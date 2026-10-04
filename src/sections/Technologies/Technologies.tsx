import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { Container } from '@/components/layout'
import { SectionHeading } from '@/components/ui'
import { technologies } from '@/content/technologies'
import { prefersFinePointer, sectionItem, viewportOnce } from '@/motion'
import { TechnologyLogo } from './TechnologyLogo'
import './Technologies.css'

const techStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.06,
    },
  },
}

const techLogoItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const reducedContainer: Variants = {
  hidden: {},
  show: {},
}

const reducedItem: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export function Technologies() {
  const reduceMotion = !!useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)
  const fieldRef = useRef<HTMLUListElement>(null)
  const rafRef = useRef<number | null>(null)
  const pendingParallax = useRef({ x: 0, y: 0 })

  const item = reduceMotion ? reducedItem : techLogoItem
  const container = reduceMotion ? reducedContainer : techStagger
  const headerItem = reduceMotion ? reducedItem : sectionItem

  useEffect(() => {
    setFinePointer(prefersFinePointer())
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setFinePointer(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const onFieldPointerLeave = useCallback(() => {
    if (!fieldRef.current) return
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    const el = fieldRef.current
    el.style.transition = 'transform 480ms cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.setProperty('--field-parallax-x', '0px')
    el.style.setProperty('--field-parallax-y', '0px')
    window.setTimeout(() => {
      if (el) el.style.transition = ''
    }, 500)
  }, [])

  const onFieldPointerMove = useCallback(
    (event: PointerEvent<HTMLUListElement>) => {
      if (reduceMotion || !finePointer || !fieldRef.current) return
      const el = fieldRef.current
      if (el.style.transition) el.style.transition = ''
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      pendingParallax.current = { x: x * 3.5, y: y * 2.5 }

      if (rafRef.current != null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const target = fieldRef.current
        if (!target) return
        target.style.setProperty(
          '--field-parallax-x',
          `${pendingParallax.current.x}px`,
        )
        target.style.setProperty(
          '--field-parallax-y',
          `${pendingParallax.current.y}px`,
        )
      })
    },
    [finePointer, reduceMotion],
  )

  return (
    <section
      className="technologies"
      id="technologies"
      aria-labelledby="technologies-heading"
    >
      <Container>
        <motion.div
          className="technologies__inner"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div className="technologies__header" variants={headerItem}>
            <SectionHeading label="Stack" id="technologies-heading">
              Technologies.
            </SectionHeading>
            <p className="technologies__lede">
              Tools and platforms used across full-stack development, backend
              services, data systems, and AI-assisted applications.
            </p>
          </motion.div>

          <motion.ul
            ref={fieldRef}
            className={[
              'technologies__grid',
              finePointer && !reduceMotion ? 'technologies__grid--parallax' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            variants={container}
            onPointerMove={onFieldPointerMove}
            onPointerLeave={onFieldPointerLeave}
          >
            {technologies.map((tech, index) => (
              <motion.li key={tech.id} className="technologies__item" variants={item}>
                <TechnologyLogo
                  name={tech.name}
                  icon={tech.icon}
                  index={index}
                  accent={tech.accent}
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  )
}
