import './HeroSwirlBackground.css'

/**
 * Soft lavender wire/ribbon swirl behind the hero stage.
 * 2D SVG layer (not in the Three.js canvas) — matches the reference
 * topographic/ribbon mesh: looser waves on the left, denser vortex on the right.
 */
function buildRibbonPaths(): string[] {
  const paths: string[] = []
  const lineCount = 18
  const width = 1000
  const step = 10

  for (let i = 0; i < lineCount; i++) {
    const t = i / (lineCount - 1)
    const band = (t - 0.5) * 2 // -1 … 1
    const parts: string[] = []

    for (let x = 0; x <= width; x += step) {
      const u = x / width

      // Left: gentle horizontal waves; right: tighten into a funnel/vortex.
      const wave =
        310 +
        band * 78 +
        Math.sin(u * Math.PI * 2.15 + band * 0.9) * (36 - Math.abs(band) * 8) +
        Math.sin(u * Math.PI * 4.1 + t * 1.4) * 10

      const vortexX = 640
      const vortexY = 295
      const dx = x - vortexX
      const dy = band * 95
      const radius =
        Math.hypot(dx, dy * 0.72) * (0.42 + u * 0.38) + band * 18
      const angle = Math.atan2(dy, dx) + u * 2.35 + band * 0.35
      const swirlY = vortexY + Math.sin(angle) * radius * 0.55
      const swirlX = vortexX + Math.cos(angle) * radius * 0.22 + (u - 0.55) * 120

      const mix = Math.pow(Math.max(0, (u - 0.18) / 0.82), 1.35)
      const px = x * (1 - mix * 0.08) + swirlX * mix * 0.08 + u * mix * 20
      const py = wave * (1 - mix) + swirlY * mix

      parts.push(`${x === 0 ? 'M' : 'L'}${px.toFixed(1)} ${py.toFixed(1)}`)
    }

    paths.push(parts.join(' '))
  }

  return paths
}

const RIBBON_PATHS = buildRibbonPaths()

export function HeroSwirlBackground() {
  return (
    <div className="hero-swirl" aria-hidden="true">
      <svg
        className="hero-swirl__svg"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="hero-swirl-fade"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="35%" stopColor="white" stopOpacity="0.75" />
            <stop offset="72%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.55" />
          </linearGradient>
          <mask id="hero-swirl-mask">
            <rect width="1000" height="700" fill="url(#hero-swirl-fade)" />
          </mask>
        </defs>
        <g
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          mask="url(#hero-swirl-mask)"
        >
          {RIBBON_PATHS.map((d, index) => (
            <path key={index} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
    </div>
  )
}
