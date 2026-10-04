import './ContourField.css'

/**
 * Soft topographic / fingerprint-like SVG contour field.
 * Extremely slow ambient motion; static under reduced motion.
 */
export function ContourField() {
  return (
    <div className="contour-field" aria-hidden="true">
      <svg
        className="contour-field__svg"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="contourStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(167, 139, 250, 0.55)" />
            <stop offset="55%" stopColor="rgba(139, 92, 246, 0.35)" />
            <stop offset="100%" stopColor="rgba(192, 38, 211, 0.2)" />
          </linearGradient>
        </defs>

        <g
          fill="none"
          stroke="url(#contourStroke)"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Nested organic rings — topographic feel */}
          <path
            className="contour-field__line contour-field__line--a"
            strokeWidth="1.1"
            d="M600 170
               C760 180 880 260 910 360
               C945 480 870 600 740 650
               C620 695 470 680 390 590
               C300 480 320 320 430 240
               C490 195 545 165 600 170 Z"
          />
          <path
            className="contour-field__line contour-field__line--b"
            strokeWidth="1"
            d="M600 210
               C735 220 835 285 860 370
               C890 475 825 575 715 615
               C615 650 490 635 425 560
               C350 470 365 345 455 280
               C505 245 555 208 600 210 Z"
          />
          <path
            className="contour-field__line contour-field__line--c"
            strokeWidth="0.95"
            d="M600 255
               C710 262 790 315 810 385
               C835 470 780 545 695 575
               C620 600 520 590 470 530
               C415 460 430 365 505 315
               C540 290 570 255 600 255 Z"
          />
          <path
            className="contour-field__line contour-field__line--d"
            strokeWidth="0.9"
            d="M600 305
               C680 310 740 350 755 405
               C775 470 730 525 665 545
               C610 562 535 552 500 505
               C460 450 475 380 535 345
               C555 330 575 305 600 305 Z"
          />
          <path
            className="contour-field__line contour-field__line--e"
            strokeWidth="0.85"
            d="M600 355
               C655 358 695 385 705 425
               C718 470 685 505 640 518
               C605 528 555 520 530 485
               C505 450 515 405 555 380
               C570 370 585 355 600 355 Z"
          />

          {/* Flowing open contours for depth */}
          <path
            className="contour-field__line contour-field__line--f"
            strokeWidth="0.85"
            d="M140 220 C260 160 390 150 520 190 C650 235 760 250 900 210 C1000 180 1080 170 1160 190"
          />
          <path
            className="contour-field__line contour-field__line--g"
            strokeWidth="0.8"
            d="M80 340 C220 280 360 270 500 320 C640 375 760 390 920 340 C1040 300 1120 295 1200 320"
          />
          <path
            className="contour-field__line contour-field__line--h"
            strokeWidth="0.75"
            d="M40 470 C180 420 330 415 470 460 C620 510 760 525 920 470 C1040 430 1125 425 1200 450"
          />
          <path
            className="contour-field__line contour-field__line--i"
            strokeWidth="0.7"
            d="M100 610 C240 555 390 545 530 590 C680 640 820 650 980 590 C1080 555 1140 545 1200 560"
          />
          <path
            className="contour-field__line contour-field__line--j"
            strokeWidth="0.7"
            d="M160 740 C300 690 450 685 590 725 C740 770 880 775 1040 720"
          />
          <path
            className="contour-field__line contour-field__line--k"
            strokeWidth="0.65"
            d="M220 120 C360 90 520 95 660 140 C800 185 930 195 1080 150"
          />
        </g>
      </svg>
    </div>
  )
}
