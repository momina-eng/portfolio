import {
  Component,
  Suspense,
  lazy,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useState,
} from 'react'
import { useGLTF } from '@react-three/drei'
import { HeroPCPlaceholder } from './HeroPCPlaceholder'
import {
  heroPcModelPath,
  type HeroPCModelTier,
} from './heroPcModelPath'
import { useHeroViewportTier } from './useHeroViewportTier'
import './HeroPCModel.css'

const HeroPCCanvas = lazy(() =>
  import('./HeroPCModel').then((mod) => ({ default: mod.HeroPCCanvas })),
)

type BoundaryState = { hasError: boolean }

class HeroPCErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { hasError: false }

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Hero PC model failed.', error, info)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

type HeroPCStageProps = {
  className?: string
}

/**
 * Live Three.js hero on all viewports. Mobile loads a lighter .glb;
 * desktop/tablet keep the full-detail asset. No static-image fallback.
 */
export function HeroPCStage({ className = '' }: HeroPCStageProps) {
  const [webgl, setWebgl] = useState(true)
  const tier = useHeroViewportTier()
  const modelTier: HeroPCModelTier = tier

  useEffect(() => {
    setWebgl(supportsWebGL())
  }, [])

  // Preload only the asset for the current breakpoint — never both.
  useEffect(() => {
    if (!webgl) return
    useGLTF.preload(heroPcModelPath(modelTier), false, true)
  }, [modelTier, webgl])

  if (!webgl) {
    return <HeroPCPlaceholder />
  }

  return (
    <HeroPCErrorBoundary fallback={<HeroPCPlaceholder />}>
      <Suspense fallback={<HeroPCPlaceholder />}>
        <HeroPCCanvas className={className} tier={modelTier} />
      </Suspense>
    </HeroPCErrorBoundary>
  )
}
