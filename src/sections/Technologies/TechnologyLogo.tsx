import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionStyle,
} from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react'
import type { SimpleIcon } from 'simple-icons'
import { prefersFinePointer } from '@/motion'
import './TechnologyLogo.css'

type TechnologyLogoProps = {
  name: string
  icon: SimpleIcon
  /** Stable seed for per-logo float timing (usually grid index). */
  index?: number
  accent?: string
}

/** Fewer crisp slabs beat many muddy anti-aliased edges. */
const EXTRUSION_STEPS = 4
const TILT_MAX = 9
const LIFT_Z = 18
/** Slight resting pose so thickness reads even before hover. */
const IDLE_RX = 5
const IDLE_RY = -7
const SPRING = { stiffness: 280, damping: 24, mass: 0.4 }

function resolveBrandColor(hex: string) {
  const normalized = hex.replace('#', '').toLowerCase()
  if (normalized === '000' || normalized === '000000') {
    return '#f8fafc'
  }
  return `#${normalized}`
}

/** Darken a hex toward black for extrusion sides. */
function deepen(hex: string, amount: number): string {
  const raw = hex.replace('#', '')
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw
  const n = Number.parseInt(full, 16)
  if (Number.isNaN(n)) return hex
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const t = Math.min(1, Math.max(0, amount))
  const mix = (channel: number) => Math.round(channel * (1 - t))
  return `rgb(${mix(r)} ${mix(g)} ${mix(b)})`
}

function floatParams(index: number) {
  const i = Math.max(0, index)
  return {
    duration: `${5 + (i % 5) * 0.65}s`,
    delay: `${(i % 7) * 0.32}s`,
    amplitude: `${2 + (i % 3)}px`,
  }
}

function LogoMark({ path, title }: { path: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" className="tech-logo__svg" aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <path d={path} fill="currentColor" />
    </svg>
  )
}

export function TechnologyLogo({ name, icon, index = 0, accent }: TechnologyLogoProps) {
  const color = accent ?? resolveBrandColor(icon.hex)
  const labelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const reduceMotion = !!useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)

  const rotateX = useSpring(IDLE_RX, SPRING)
  const rotateY = useSpring(IDLE_RY, SPRING)
  const scale = useSpring(1, SPRING)
  const z = useSpring(0, SPRING)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const float = floatParams(index)
  const interactive = finePointer && !reduceMotion

  const depthLayers = useMemo(
    () =>
      Array.from({ length: EXTRUSION_STEPS }, (_, i) => {
        // Render back → front; higher step = farther / darker.
        const step = EXTRUSION_STEPS - i
        return {
          step,
          // Solid dark brand side — not a soft mid-tone cloud.
          color: deepen(color, 0.42 + (step / EXTRUSION_STEPS) * 0.48),
        }
      }),
    [color],
  )

  useEffect(() => {
    setFinePointer(prefersFinePointer())
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setFinePointer(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      rotateX.jump(0)
      rotateY.jump(0)
      z.jump(0)
      scale.jump(1)
    } else {
      rotateX.set(IDLE_RX)
      rotateY.set(IDLE_RY)
    }
  }, [reduceMotion, rotateX, rotateY, scale, z])

  const setActive = useCallback((active: boolean) => {
    rootRef.current?.classList.toggle('tech-logo--active', active)
  }, [])

  const resetTilt = useCallback(() => {
    rotateX.set(reduceMotion ? 0 : IDLE_RX)
    rotateY.set(reduceMotion ? 0 : IDLE_RY)
    scale.set(1)
    z.set(0)
    glareX.set(50)
    glareY.set(50)
    const el = rootRef.current
    if (el) {
      el.style.setProperty('--glare-x', '50%')
      el.style.setProperty('--glare-y', '50%')
      el.style.setProperty('--shadow-x', '0px')
      el.style.setProperty('--shadow-y', '8px')
    }
    setActive(false)
  }, [glareX, glareY, reduceMotion, rotateX, rotateY, scale, setActive, z])

  const onPointerEnter = useCallback(() => {
    if (!interactive) return
    setActive(true)
    scale.set(1.055)
    z.set(LIFT_Z)
  }, [interactive, scale, setActive, z])

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!interactive || !rootRef.current) return
      const el = rootRef.current
      const rect = el.getBoundingClientRect()
      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))

      rotateX.set(IDLE_RX + (0.5 - py) * TILT_MAX * 2)
      rotateY.set(IDLE_RY + (px - 0.5) * TILT_MAX * 2)
      glareX.set(px * 100)
      glareY.set(py * 100)

      el.style.setProperty('--glare-x', `${px * 100}%`)
      el.style.setProperty('--glare-y', `${py * 100}%`)
      el.style.setProperty('--shadow-x', `${(px - 0.5) * -10}px`)
      el.style.setProperty('--shadow-y', `${8 + (py - 0.5) * 8}px`)
    },
    [glareX, glareY, interactive, rotateX, rotateY],
  )

  const onPointerLeave = useCallback(() => {
    if (!interactive) return
    resetTilt()
  }, [interactive, resetTilt])

  const onFocus = useCallback(() => {
    if (reduceMotion) {
      setActive(true)
      return
    }
    setActive(true)
    if (interactive) {
      scale.set(1.04)
      z.set(10)
    }
  }, [interactive, reduceMotion, scale, setActive, z])

  const onBlur = useCallback(() => {
    resetTilt()
  }, [resetTilt])

  const tiltStyle: MotionStyle = {
    rotateX,
    rotateY,
    scale,
    z,
    transformStyle: 'preserve-3d',
  }

  return (
    <div
      ref={rootRef}
      className={[
        'tech-logo',
        interactive ? 'tech-logo--interactive' : '',
        reduceMotion ? 'tech-logo--reduced' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--tech-accent': color,
          '--tech-depth': deepen(color, 0.62),
          '--float-duration': float.duration,
          '--float-delay': float.delay,
          '--float-amp': float.amplitude,
          '--glare-x': '50%',
          '--glare-y': '50%',
          '--shadow-x': '0px',
          '--shadow-y': '8px',
        } as CSSProperties
      }
      tabIndex={0}
      role="img"
      aria-labelledby={labelId}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className="tech-logo__perspective">
        <div className="tech-logo__float">
          <motion.div className="tech-logo__object" style={tiltStyle}>
            {/* Softest layer — behind everything; never filters the logo */}
            <span className="tech-logo__glow" aria-hidden="true" />
            <span className="tech-logo__cast-shadow" aria-hidden="true" />

            <div className="tech-logo__extrude" aria-hidden="true">
              {depthLayers.map(({ step, color: layerColor }) => (
                <span
                  key={step}
                  className="tech-logo__slab"
                  style={
                    {
                      color: layerColor,
                      /* Distinct steps (~1.5px) so edges stay defined, not muddy */
                      '--slab-x': `${step * 1.5}px`,
                      '--slab-y': `${step * 1.55}px`,
                      '--slab-z': `${-step * 1.75}px`,
                    } as CSSProperties
                  }
                >
                  <LogoMark path={icon.path} />
                </span>
              ))}

              {/* Sharpest layer — always on top of extrusion */}
              <span className="tech-logo__face" style={{ color }}>
                <LogoMark path={icon.path} />
              </span>

              <span className="tech-logo__highlight" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>

      <span id={labelId} className="tech-logo__name">
        {name}
      </span>
    </div>
  )
}
