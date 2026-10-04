import './GrainOverlay.css'

/** Extremely subtle SVG turbulence grain (~1–3% intensity). */
export function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg
        className="grain-overlay__svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <filter id="portfolioGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" />
        </filter>
        <rect width="100%" height="100%" filter="url(#portfolioGrain)" />
      </svg>
    </div>
  )
}
