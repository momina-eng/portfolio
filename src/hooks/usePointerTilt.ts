import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import { prefersFinePointer, prefersReducedMotion } from '@/motion'

export type UsePointerTiltOptions = {
  /** Max rotate on each axis in degrees (project cards use ~9). */
  maxTilt?: number
  /** Scale applied while pointer is over the card. */
  hoverScale?: number
  /** Class toggled on the container when fine-pointer tilt is active. */
  enabledClass?: string
}

export type UsePointerTiltResult<
  TContainer extends HTMLElement = HTMLElement,
  TSurface extends HTMLElement = HTMLElement,
> = {
  containerRef: RefObject<TContainer | null>
  surfaceRef: RefObject<TSurface | null>
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerLeave: () => void
}

/**
 * Imperative pointer tilt via CSS variables — no React state on pointermove
 * (avoids remounting interactive children mid-gesture).
 *
 * Sets on the surface element:
 * `--tilt-x`, `--tilt-y`, `--glare-x`, `--glare-y`, `--tilt-scale`
 */
export function usePointerTilt<
  TContainer extends HTMLElement = HTMLElement,
  TSurface extends HTMLElement = HTMLElement,
>(
  options: UsePointerTiltOptions = {},
): UsePointerTiltResult<TContainer, TSurface> {
  const {
    maxTilt = 9,
    hoverScale = 1.02,
    enabledClass = 'is-tilt-enabled',
  } = options

  const containerRef = useRef<TContainer | null>(null)
  const surfaceRef = useRef<TSurface | null>(null)
  const rafRef = useRef<number | null>(null)
  const tiltEnabledRef = useRef(false)
  const maxTiltRef = useRef(maxTilt)
  const hoverScaleRef = useRef(hoverScale)
  const enabledClassRef = useRef(enabledClass)

  maxTiltRef.current = maxTilt
  hoverScaleRef.current = hoverScale
  enabledClassRef.current = enabledClass

  useEffect(() => {
    const sync = () => {
      tiltEnabledRef.current =
        !prefersReducedMotion() &&
        prefersFinePointer() &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const el = containerRef.current
      if (!el) return
      el.classList.toggle(enabledClassRef.current, tiltEnabledRef.current)
    }
    sync()
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    motionQuery.addEventListener('change', sync)
    pointerQuery.addEventListener('change', sync)
    return () => {
      motionQuery.removeEventListener('change', sync)
      pointerQuery.removeEventListener('change', sync)
    }
  }, [])

  const applyTilt = useCallback(
    (vars: {
      x: string
      y: string
      glareX: string
      glareY: string
      scale: string
    }) => {
      const surface = surfaceRef.current
      if (!surface) return
      surface.style.setProperty('--tilt-x', vars.x)
      surface.style.setProperty('--tilt-y', vars.y)
      surface.style.setProperty('--glare-x', vars.glareX)
      surface.style.setProperty('--glare-y', vars.glareY)
      surface.style.setProperty('--tilt-scale', vars.scale)
    },
    [],
  )

  const resetTilt = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    applyTilt({
      x: '0deg',
      y: '0deg',
      glareX: '50%',
      glareY: '50%',
      scale: '1',
    })
  }, [applyTilt])

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!tiltEnabledRef.current) return
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return

      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const max = maxTiltRef.current
      const rotateY = (px - 0.5) * (max * 2)
      const rotateX = (0.5 - py) * (max * 2)

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        applyTilt({
          x: `${rotateX.toFixed(2)}deg`,
          y: `${rotateY.toFixed(2)}deg`,
          glareX: `${(px * 100).toFixed(1)}%`,
          glareY: `${(py * 100).toFixed(1)}%`,
          scale: String(hoverScaleRef.current),
        })
      })
    },
    [applyTilt],
  )

  const onPointerLeave = useCallback(() => {
    if (!tiltEnabledRef.current) return
    resetTilt()
  }, [resetTilt])

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  return {
    containerRef,
    surfaceRef,
    onPointerMove,
    onPointerLeave,
  }
}
