import { useEffect, useState } from 'react'

export type HeroViewportTier = 'mobile' | 'tablet' | 'desktop'

function readTier(): HeroViewportTier {
  if (typeof window === 'undefined') return 'mobile'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export function useHeroViewportTier(): HeroViewportTier {
  const [tier, setTier] = useState<HeroViewportTier>(readTier)

  useEffect(() => {
    const sync = () => setTier(readTier())
    sync()
    window.addEventListener('resize', sync, { passive: true })
    return () => window.removeEventListener('resize', sync)
  }, [])

  return tier
}
