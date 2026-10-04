import type { OverviewCardItem } from '@/content/about'
import iconFullstack from '@/assets/icons/icon-fullstack-3d.svg'
import iconFrontend from '@/assets/icons/icon-frontend-3d.svg'
import iconBackend from '@/assets/icons/icon-backend-3d.svg'
import iconAi from '@/assets/icons/icon-ai-3d.svg'
import { usePointerTilt } from '@/hooks'
import './OverviewCard.css'

type OverviewCardProps = {
  item: OverviewCardItem
}

/** 3D badge icons — keyed by card id (not array order). */
const OVERVIEW_ICONS: Record<OverviewCardItem['id'], string> = {
  fullstack: iconFullstack,
  frontend: iconFrontend,
  backend: iconBackend,
  ai: iconAi,
}

export function OverviewCard({ item }: OverviewCardProps) {
  const iconSrc = OVERVIEW_ICONS[item.id]
  const { containerRef, surfaceRef, onPointerMove, onPointerLeave } =
    usePointerTilt<HTMLElement, HTMLDivElement>({
      maxTilt: 5.5,
      hoverScale: 1.02,
      enabledClass: 'overview-card--tilt',
    })

  return (
    <article
      ref={containerRef}
      className="overview-card"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div ref={surfaceRef} className="overview-card__surface">
        <div className="overview-card__ambient" aria-hidden="true" />
        <div className="overview-card__glow" aria-hidden="true" />
        <div className="overview-card__shine" aria-hidden="true" />
        <div className="overview-card__inner">
          {iconSrc ? (
            <img
              className="overview-card__icon"
              src={iconSrc}
              alt=""
              width={60}
              height={60}
              decoding="async"
              aria-hidden="true"
            />
          ) : null}
          <h3 className="overview-card__title">
            <span className="overview-card__title-lead">{item.titleLines[0]}</span>
            <span className="overview-card__title-sub">{item.titleLines[1]}</span>
          </h3>
        </div>
      </div>
    </article>
  )
}
