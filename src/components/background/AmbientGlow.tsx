import './AmbientGlow.css'

type AmbientGlowProps = {
  className?: string
}

/** Soft radial ambient light layers for atmospheric depth. */
export function AmbientGlow({ className = '' }: AmbientGlowProps) {
  const classes = ['ambient-glow', className].filter(Boolean).join(' ')

  return (
    <div className={classes} aria-hidden="true">
      <span className="ambient-glow__blob ambient-glow__blob--primary" />
      <span className="ambient-glow__blob ambient-glow__blob--secondary" />
      <span className="ambient-glow__blob ambient-glow__blob--tertiary" />
    </div>
  )
}
