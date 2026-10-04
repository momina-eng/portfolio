import { AmbientGlow } from './AmbientGlow'
import { ContourField } from './ContourField'
import { GrainOverlay } from './GrainOverlay'
import { ParticleField } from './ParticleField'
import './background.css'

/**
 * Atmospheric environment behind portfolio content.
 * Decorative only — never intercepts pointer events.
 */
export function BackgroundSystem() {
  return (
    <div className="background-system" aria-hidden="true">
      <AmbientGlow />
      <ContourField />
      <ParticleField />
      <GrainOverlay />
    </div>
  )
}
