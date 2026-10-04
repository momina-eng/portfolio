import './HeroPCPlaceholder.css'

/** Lightweight stage placeholder — never an old desk SVG / procedural scene. */
export function HeroPCPlaceholder() {
  return (
    <div className="hero-pc-placeholder" aria-hidden="true">
      <div className="hero-pc-placeholder__glow" />
      <div className="hero-pc-placeholder__spinner" />
    </div>
  )
}
