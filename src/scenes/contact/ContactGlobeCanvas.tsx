import {
  Component,
  Suspense,
  lazy,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scaleReveal } from '@/motion'
import { ContactGlobeFallback } from './ContactGlobeFallback'
import './ContactGlobe.css'

const ContactGlobe = lazy(() =>
  import('./ContactGlobe').then((mod) => ({ default: mod.ContactGlobe })),
)

type BoundaryState = { hasError: boolean }

class GlobeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { hasError: false }

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Contact globe failed, using fallback.', error, info)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

type ContactGlobeCanvasProps = {
  className?: string
}

export function ContactGlobeCanvas({ className = '' }: ContactGlobeCanvasProps) {
  const [webgl, setWebgl] = useState(true)
  const [active, setActive] = useState(false)
  const reduceMotion = !!useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setWebgl(supportsWebGL())
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '240px 0px', threshold: 0.01 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (!webgl) {
    return <ContactGlobeFallback />
  }

  const shellVariants = reduceMotion
    ? { hidden: { opacity: 1, scale: 1, y: 0 }, show: { opacity: 1, scale: 1, y: 0 } }
    : scaleReveal

  return (
    <motion.div
      ref={rootRef}
      className={['contact-globe-shell', className].filter(Boolean).join(' ')}
      variants={shellVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      style={{ width: '100%', height: '100%' }}
    >
      {active ? (
        <GlobeErrorBoundary fallback={<ContactGlobeFallback />}>
          <Suspense fallback={<ContactGlobeFallback />}>
            <ContactGlobe />
          </Suspense>
        </GlobeErrorBoundary>
      ) : (
        <ContactGlobeFallback />
      )}
    </motion.div>
  )
}
