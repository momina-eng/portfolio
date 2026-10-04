import './ContactGlobe.css'

/** Static digital globe used when WebGL is unavailable. */
export function ContactGlobeFallback() {
  return (
    <div
      className="contact-globe-fallback"
      role="img"
      aria-label="Futuristic digital Earth globe illustration."
    >
      <div className="contact-globe-fallback__glow" aria-hidden="true" />
      <svg
        className="contact-globe-fallback__svg"
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="180" cy="180" r="92" fill="#080a14" />
        <circle cx="180" cy="180" r="92" fill="url(#earthCore)" opacity="0.9" />

        <ellipse
          cx="180"
          cy="180"
          rx="92"
          ry="32"
          stroke="rgba(168,184,255,0.42)"
          strokeWidth="1.1"
        />
        <ellipse
          cx="180"
          cy="180"
          rx="92"
          ry="58"
          stroke="rgba(168,184,255,0.28)"
          strokeWidth="1"
        />
        <ellipse
          cx="180"
          cy="180"
          rx="34"
          ry="92"
          stroke="rgba(168,184,255,0.38)"
          strokeWidth="1.1"
        />
        <ellipse
          cx="180"
          cy="180"
          rx="62"
          ry="92"
          stroke="rgba(168,184,255,0.24)"
          strokeWidth="1"
        />
        <path
          d="M180 88v184M88 180h184"
          stroke="rgba(168,184,255,0.3)"
          strokeWidth="1"
        />

        <ellipse
          cx="180"
          cy="180"
          rx="118"
          ry="40"
          stroke="rgba(142,164,255,0.42)"
          strokeWidth="2"
          transform="rotate(-28 180 180)"
        />
        <ellipse
          cx="180"
          cy="180"
          rx="126"
          ry="46"
          stroke="rgba(159,140,255,0.26)"
          strokeWidth="1.6"
          transform="rotate(18 180 180)"
        />

        <circle
          cx="180"
          cy="180"
          r="97"
          stroke="rgba(127,143,255,0.2)"
          strokeWidth="8"
        />

        <g fill="#c9d4ff" opacity="0.7">
          <circle cx="160" cy="150" r="1.1" />
          <circle cx="195" cy="165" r="1" />
          <circle cx="175" cy="190" r="0.9" />
          <circle cx="210" cy="155" r="1.05" />
          <circle cx="145" cy="175" r="0.85" />
        </g>

        <defs>
          <radialGradient id="earthCore" cx="36%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1c2550" />
            <stop offset="55%" stopColor="#0d1230" />
            <stop offset="100%" stopColor="#080a14" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
