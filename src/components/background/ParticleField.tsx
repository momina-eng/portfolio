import type { CSSProperties } from 'react'
import './ParticleField.css'

type Particle = {
  id: number
  left: string
  top: string
  size: string
  delay: string
  duration: string
  drift: string
}

/** Sparse particles — kept small for paint cost. */
const PARTICLES: Particle[] = [
  { id: 1, left: '8%', top: '18%', size: '2px', delay: '0s', duration: '22s', drift: '12px' },
  { id: 2, left: '16%', top: '42%', size: '2px', delay: '2s', duration: '26s', drift: '-10px' },
  { id: 3, left: '33%', top: '62%', size: '2px', delay: '1s', duration: '28s', drift: '-8px' },
  { id: 4, left: '48%', top: '48%', size: '3px', delay: '3s', duration: '25s', drift: '-12px' },
  { id: 5, left: '62%', top: '58%', size: '2px', delay: '7s', duration: '27s', drift: '-14px' },
  { id: 6, left: '70%', top: '22%', size: '3px', delay: '1.5s', duration: '24s', drift: '11px' },
  { id: 7, left: '86%', top: '30%', size: '2px', delay: '2.5s', duration: '22s', drift: '13px' },
  { id: 8, left: '28%', top: '78%', size: '3px', delay: '3.5s', duration: '30s', drift: '8px' },
  { id: 9, left: '74%', top: '68%', size: '2px', delay: '0.5s', duration: '25s', drift: '10px' },
  { id: 10, left: '20%', top: '12%', size: '2px', delay: '9s', duration: '24s', drift: '12px' },
  { id: 11, left: '64%', top: '10%', size: '3px', delay: '2.2s', duration: '28s', drift: '-10px' },
  { id: 12, left: '82%', top: '82%', size: '2px', delay: '4.2s', duration: '31s', drift: '-12px' },
]

/** Sparse soft particles — CSS-only, no particle libraries. */
export function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {PARTICLES.map((particle) => {
        const style = {
          left: particle.left,
          top: particle.top,
          width: particle.size,
          height: particle.size,
          animationDelay: particle.delay,
          animationDuration: particle.duration,
          '--particle-drift': particle.drift,
        } as CSSProperties

        return (
          <span
            key={particle.id}
            className={[
              'particle-field__dot',
              particle.id > 8 ? 'particle-field__dot--desktop' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={style}
          />
        )
      })}
    </div>
  )
}
