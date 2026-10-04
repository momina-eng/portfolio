import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Canvas, useFrame, useThree, invalidate } from '@react-three/fiber'
import { ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { prefersFinePointer, prefersReducedMotion } from '@/motion'
import {
  applyMominaScreenTextures,
  cloneSceneWithMaterials,
} from './mominaScreenTextures'
import {
  heroPcModelPath,
  type HeroPCModelTier,
} from './heroPcModelPath'
import './HeroPCModel.css'

export { HERO_PC_MODEL_PATH, HERO_PC_MODEL_PATH_MOBILE } from './heroPcModelPath'

export const HERO_PC_BASE_ROTATION = {
  x: -0.1,
  y: 0.52,
  z: 0.02,
} as const

const HIDDEN_NAME_RE = /beziercurve|beziercircle/i

type DragState = {
  dragging: boolean
  lastX: number
  lastY: number
  /** Accumulated user rotation (radians), stays after release. */
  rotY: number
  rotX: number
}

type FramingConfig = {
  /** Model height as a fraction of canvas height. */
  heightFill: number
  /** Model width as a fraction of canvas width. */
  widthFill: number
  fov: number
  cameraDir: THREE.Vector3
}

// Measured from docs/reference/design-reference.mp4 hero frames.
const FRAMING: Record<HeroPCModelTier, FramingConfig> = {
  desktop: {
    heightFill: 0.68,
    widthFill: 0.88,
    fov: 28,
    cameraDir: new THREE.Vector3(0.68, 0.36, 0.86),
  },
  tablet: {
    heightFill: 0.64,
    widthFill: 0.86,
    fov: 30,
    cameraDir: new THREE.Vector3(0.66, 0.38, 0.88),
  },
  mobile: {
    heightFill: 0.7,
    widthFill: 0.92,
    fov: 34,
    cameraDir: new THREE.Vector3(0.64, 0.4, 0.9),
  },
}

type HeroPCModelProps = {
  drag: MutableRefObject<DragState>
  simplified: boolean
  tier: HeroPCModelTier
  modelPath: string
  modelCenter: MutableRefObject<THREE.Vector3>
}

function HeroPCModel({
  drag,
  simplified,
  tier,
  modelPath,
  modelCenter,
}: HeroPCModelProps) {
  const { scene } = useGLTF(modelPath, false, true)
  const { size, camera } = useThree()
  const dragGroup = useRef<THREE.Group>(null)
  const orientGroup = useRef<THREE.Group>(null)
  const contentGroup = useRef<THREE.Group>(null)
  const shadowY = useRef(0)
  const hiddenNames = useRef<string[]>([])

  const prepared = useMemo(() => {
    const clone = cloneSceneWithMaterials(scene)
    const hidden: string[] = []

    clone.traverse((obj) => {
      if (HIDDEN_NAME_RE.test(obj.name)) {
        obj.visible = false
        hidden.push(obj.name)
      }
      if (!(obj instanceof THREE.Mesh)) return
      obj.castShadow = false
      obj.receiveShadow = false
      obj.frustumCulled = true
    })

    hiddenNames.current = [...new Set(hidden)]
    return clone
  }, [scene])

  // Surgical name patch once per prepared scene (not every frame).
  useEffect(() => {
    let cancelled = false
    void applyMominaScreenTextures(prepared).then((report) => {
      if (cancelled) return
      console.info('[HeroPC patch] complete', report)
      invalidate()
    })
    return () => {
      cancelled = true
    }
  }, [prepared])

  useLayoutEffect(() => {
    const content = contentGroup.current
    const orient = orientGroup.current
    if (!content || !orient) return
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    if (size.width <= 0 || size.height <= 0) return

    const config = FRAMING[tier]

    content.position.set(0, 0, 0)
    content.rotation.set(0, 0, 0)
    content.scale.set(1, 1, 1)
    orient.position.set(0, 0, 0)
    orient.scale.set(1, 1, 1)
    orient.rotation.set(
      HERO_PC_BASE_ROTATION.x,
      HERO_PC_BASE_ROTATION.y,
      HERO_PC_BASE_ROTATION.z,
    )

    content.updateWorldMatrix(true, true)
    const rawBox = new THREE.Box3().setFromObject(content)
    if (rawBox.isEmpty()) return
    content.position.sub(rawBox.getCenter(new THREE.Vector3()))

    orient.updateWorldMatrix(true, true)
    const orientedBox = new THREE.Box3().setFromObject(orient)
    orient.position.sub(orientedBox.getCenter(new THREE.Vector3()))

    orient.updateWorldMatrix(true, true)
    const normBox = new THREE.Box3().setFromObject(orient)
    const normSize = normBox.getSize(new THREE.Vector3())
    const normalizeScale = 1 / Math.max(normSize.y, 0.0001)
    orient.scale.setScalar(normalizeScale)

    orient.updateWorldMatrix(true, true)
    const groundedBox = new THREE.Box3().setFromObject(orient)
    const groundedCenter = groundedBox.getCenter(new THREE.Vector3())
    orient.position.x -= groundedCenter.x
    orient.position.z -= groundedCenter.z
    orient.position.y -= groundedBox.min.y

    orient.updateWorldMatrix(true, true)
    const finalBox = new THREE.Box3().setFromObject(orient)
    const finalSize = finalBox.getSize(new THREE.Vector3())
    const finalCenter = finalBox.getCenter(new THREE.Vector3())
    shadowY.current = finalBox.min.y + 0.008
    modelCenter.current.copy(finalCenter)

    camera.fov = config.fov
    camera.aspect = size.width / size.height
    const vFov = THREE.MathUtils.degToRad(camera.fov)
    const distForHeight =
      finalSize.y / (2 * Math.tan(vFov / 2) * config.heightFill)
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect)
    const distForWidth =
      finalSize.x / (2 * Math.tan(hFov / 2) * config.widthFill)
    const distance = Math.max(distForHeight, distForWidth) * 1.02

    const dir = config.cameraDir.clone().normalize()
    const lookAt = finalCenter.clone()
    lookAt.y = finalCenter.y * 0.88

    camera.position.copy(lookAt).addScaledVector(dir, distance)
    camera.near = Math.max(distance / 100, 0.05)
    camera.far = distance * 50
    camera.lookAt(lookAt)
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, modelCenter, prepared, size.height, size.width, tier])

  // Apply drag rotation only — no hover-follow. Runs when invalidate() is called.
  useFrame(() => {
    if (!dragGroup.current) return
    dragGroup.current.rotation.y = drag.current.rotY
    dragGroup.current.rotation.x = drag.current.rotX
  })

  return (
    <group ref={dragGroup}>
      <group ref={orientGroup}>
        <group ref={contentGroup}>
          <primitive object={prepared} />
        </group>
      </group>
      {!simplified && (
        <ContactShadows
          position={[0, shadowY.current, 0]}
          opacity={0.4}
          scale={4.8}
          blur={2.4}
          far={3.2}
          color="#050509"
        />
      )}
    </group>
  )
}

function HeroPCLights({
  simplified,
  modelCenter,
}: {
  simplified: boolean
  modelCenter: MutableRefObject<THREE.Vector3>
}) {
  const group = useRef<THREE.Group>(null)

  // Snap to framed center (demand frameloop — no continuous lerp needed).
  useFrame(() => {
    if (!group.current) return
    group.current.position.copy(modelCenter.current)
  })

  return (
    <group ref={group}>
      <ambientLight intensity={simplified ? 0.36 : 0.44} color="#c8c4d8" />
      <hemisphereLight
        intensity={simplified ? 0.26 : 0.34}
        color="#ddd6fe"
        groundColor="#09080f"
      />
      <pointLight
        position={[-0.55, 1.35, -1.1]}
        intensity={simplified ? 1.4 : 2.15}
        color="#8b5cf6"
        distance={7}
        decay={2}
      />
      <spotLight
        position={[0.1, 1.8, -0.55]}
        intensity={simplified ? 1.05 : 1.55}
        angle={0.58}
        penumbra={0.85}
        color="#c026d3"
        distance={8}
      />
      <pointLight
        position={[1.45, 0.85, 1.05]}
        intensity={simplified ? 0.55 : 0.85}
        color="#60a5fa"
        distance={6}
        decay={2}
      />
      <pointLight
        position={[-1.35, 0.7, 1.15]}
        intensity={simplified ? 0.42 : 0.65}
        color="#f0abfc"
        distance={5.5}
        decay={2}
      />
      <directionalLight
        position={[1.2, 2.0, 1.5]}
        intensity={simplified ? 0.55 : 0.78}
        color="#f5f3ff"
      />
    </group>
  )
}

type HeroPCCanvasProps = {
  className?: string
  tier?: HeroPCModelTier
}

export function HeroPCCanvas({
  className = '',
  tier = 'desktop',
}: HeroPCCanvasProps) {
  const drag = useRef<DragState>({
    dragging: false,
    lastX: 0,
    lastY: 0,
    rotY: 0,
    rotX: 0,
  })
  const modelCenter = useRef(new THREE.Vector3(0, 0.5, 0))
  const [grabbing, setGrabbing] = useState(false)
  const reducedMotion = prefersReducedMotion()
  const finePointer = prefersFinePointer()
  const isMobile = tier === 'mobile'
  // Mobile + tablet + coarse pointers: lighter lights/shadows/AA.
  const simplified = isMobile || !finePointer || tier === 'tablet'
  const modelPath = heroPcModelPath(tier)
  // Desktop keeps [1, 2]; mobile caps at 1.5 for GPU cost.
  const dpr: [number, number] = isMobile
    ? [1, 1.5]
    : simplified
      ? [1, 1.25]
      : [1, 2]

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current.dragging = true
    drag.current.lastX = event.clientX
    drag.current.lastY = event.clientY
    setGrabbing(true)
    invalidate()
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return
    const dx = event.clientX - drag.current.lastX
    const dy = event.clientY - drag.current.lastY
    drag.current.lastX = event.clientX
    drag.current.lastY = event.clientY

    // Full 360° on Y — no clamp. X clamped so it never flips.
    // Slightly higher mobile sensitivity so drag doesn't feel laggy on demand frames.
    const ySens = isMobile ? 0.006 : 0.005
    const xSens = isMobile ? 0.004 : 0.0035
    drag.current.rotY += dx * ySens
    drag.current.rotX = THREE.MathUtils.clamp(
      drag.current.rotX + dy * xSens,
      -0.45,
      0.45,
    )
    invalidate()
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return
    drag.current.dragging = false
    setGrabbing(false)
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // already released
    }
    invalidate()
  }

  return (
    <div
      className={[
        'hero-pc',
        grabbing ? 'hero-pc--grabbing' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      aria-hidden="true"
    >
      <div className="hero-pc__glow" />
      <Canvas
        className="hero-pc__canvas"
        frameloop="demand"
        dpr={dpr}
        camera={{
          fov: FRAMING[tier].fov,
          near: 0.1,
          far: 80,
          position: [1.6, 1.0, 2.2],
        }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{
          alpha: true,
          antialias: !simplified,
          powerPreference: simplified ? 'low-power' : 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={null}>
          <HeroPCLights simplified={simplified} modelCenter={modelCenter} />
          <HeroPCModel
            drag={drag}
            simplified={simplified}
            tier={tier}
            modelPath={modelPath}
            modelCenter={modelCenter}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
