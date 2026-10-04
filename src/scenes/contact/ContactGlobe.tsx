import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersFinePointer, prefersReducedMotion } from '@/motion'
import './ContactGlobe.css'

type GlobeRigProps = {
  reducedMotion: boolean
  enableParallax: boolean
  simplified: boolean
}

function buildLatLongGeometry(
  radius: number,
  latCount: number,
  lonCount: number,
  segments: number,
) {
  const positions: number[] = []

  for (let i = 1; i < latCount; i += 1) {
    const phi = (i / latCount) * Math.PI
    const y = radius * Math.cos(phi)
    const ringR = radius * Math.sin(phi)
    for (let j = 0; j < segments; j += 1) {
      const a0 = (j / segments) * Math.PI * 2
      const a1 = ((j + 1) / segments) * Math.PI * 2
      positions.push(
        ringR * Math.cos(a0),
        y,
        ringR * Math.sin(a0),
        ringR * Math.cos(a1),
        y,
        ringR * Math.sin(a1),
      )
    }
  }

  for (let i = 0; i < lonCount; i += 1) {
    const theta = (i / lonCount) * Math.PI * 2
    for (let j = 0; j < segments; j += 1) {
      const p0 = (j / segments) * Math.PI
      const p1 = ((j + 1) / segments) * Math.PI
      positions.push(
        radius * Math.sin(p0) * Math.cos(theta),
        radius * Math.cos(p0),
        radius * Math.sin(p0) * Math.sin(theta),
        radius * Math.sin(p1) * Math.cos(theta),
        radius * Math.cos(p1),
        radius * Math.sin(p1) * Math.sin(theta),
      )
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3),
  )
  return geometry
}

/** Sparse surface nodes — subtle digital detail, not continents. */
function SurfaceNodes({ simplified }: { simplified: boolean }) {
  const geometry = useMemo(() => {
    const count = simplified ? 45 : 90
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const u = Math.random()
      const v = 0.18 + Math.random() * 0.64
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = 1.012
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [simplified])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#c9d4ff"
        size={simplified ? 0.013 : 0.01}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

function LatitudeLongitudeGrid({ simplified }: { simplified: boolean }) {
  const geometry = useMemo(
    () =>
      buildLatLongGeometry(
        1.003,
        simplified ? 7 : 9,
        simplified ? 10 : 14,
        simplified ? 48 : 80,
      ),
    [simplified],
  )

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color('#a8b8ff') },
        },
        vertexShader: /* glsl */ `
          varying float vFacing;
          void main() {
            // Unit-sphere: object-space position ≈ surface normal
            vec3 viewNormal = normalize(normalMatrix * position);
            vFacing = clamp(viewNormal.z * 0.5 + 0.5, 0.0, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying float vFacing;
          void main() {
            // Front brighter, back subdued — clear wrap-around depth
            float alpha = mix(0.1, 0.48, smoothstep(0.15, 0.9, vFacing));
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      }),
    [],
  )

  return <lineSegments geometry={geometry} material={material} />
}

function GlobeCore({ simplified }: { simplified: boolean }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, simplified ? 40 : 64, simplified ? 40 : 64]} />
        <meshStandardMaterial
          color="#080a14"
          emissive="#151b38"
          emissiveIntensity={0.28}
          metalness={0.55}
          roughness={0.42}
        />
      </mesh>

      {/* Soft sheen layer for curved highlight without chrome look */}
      <mesh scale={1.001}>
        <sphereGeometry args={[1, simplified ? 32 : 48, simplified ? 32 : 48]} />
        <meshStandardMaterial
          color="#1a2250"
          emissive="#24306a"
          emissiveIntensity={0.12}
          metalness={0.7}
          roughness={0.55}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      <SurfaceNodes simplified={simplified} />
      <LatitudeLongitudeGrid simplified={simplified} />
    </group>
  )
}

function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        uniforms: {
          uColor: { value: new THREE.Color('#7f8fff') },
          uAccent: { value: new THREE.Color('#a78bfa') },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorldPosition = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform vec3 uAccent;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            float fresnel = pow(1.0 - abs(dot(viewDir, normalize(vNormal))), 2.6);
            // Strongest on limb, soft falloff — thin luminous shell
            float alpha = fresnel * 0.45;
            vec3 color = mix(uColor, uAccent, fresnel * 0.35);
            gl_FragColor = vec4(color, alpha);
          }
        `,
      }),
    [],
  )

  return (
    <mesh scale={1.055} material={material}>
      <sphereGeometry args={[1, 48, 48]} />
    </mesh>
  )
}

function OrbitRing({
  radius,
  tilt,
  color,
  reducedMotion,
  speed,
  tube = 0.008,
}: {
  radius: number
  tilt: [number, number, number]
  color: string
  reducedMotion: boolean
  speed: number
  tube?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius * 0.985,
      0,
      Math.PI * 2,
      false,
      0,
    )
    const pts = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y))
    const path = new THREE.CatmullRomCurve3(pts, true)
    return new THREE.TubeGeometry(path, 160, tube, 6, true)
  }, [radius, tube])

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return
    ref.current.rotation.y += delta * speed
  })

  return (
    <mesh ref={ref} geometry={geometry} rotation={tilt}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.4}
        metalness={0.45}
        roughness={0.32}
      />
    </mesh>
  )
}

function OrbitRings({
  simplified,
  reducedMotion,
}: {
  simplified: boolean
  reducedMotion: boolean
}) {
  // Coherent orbital relationship: primary equatorial tilt + secondary counter-tilt
  if (simplified) {
    return (
      <OrbitRing
        radius={1.4}
        tilt={[0.58, 0.12, 0.1]}
        color="#8ea4ff"
        reducedMotion={reducedMotion}
        speed={0.055}
        tube={0.007}
      />
    )
  }

  return (
    <group>
      <OrbitRing
        radius={1.36}
        tilt={[0.6, 0.08, 0.12]}
        color="#8ea4ff"
        reducedMotion={reducedMotion}
        speed={0.05}
        tube={0.0075}
      />
      <OrbitRing
        radius={1.52}
        tilt={[-0.42, 0.28, -0.08]}
        color="#9f8cff"
        reducedMotion={reducedMotion}
        speed={-0.035}
        tube={0.0065}
      />
    </group>
  )
}

function StarField({ simplified }: { simplified: boolean }) {
  const geometry = useMemo(() => {
    const count = simplified ? 55 : 100
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      // Bias stars toward the right visual field so they don't crowd the form
      positions[i * 3] = (Math.random() - 0.25) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2.5
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [simplified])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#d4dcff"
        size={0.01}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  )
}

function GlobeRig({ reducedMotion, enableParallax, simplified }: GlobeRigProps) {
  const group = useRef<THREE.Group>(null)
  const parallax = useMemo(() => new THREE.Vector2(0, 0), [])
  const idle = useRef(0)

  useFrame((state, delta) => {
    if (!group.current) return

    if (!reducedMotion) {
      idle.current += delta * 0.085
      group.current.rotation.y = idle.current
    }

    const baseTilt = 0.2
    if (enableParallax && !reducedMotion) {
      parallax.x = THREE.MathUtils.lerp(parallax.x, state.pointer.x * 0.16, 0.045)
      parallax.y = THREE.MathUtils.lerp(parallax.y, state.pointer.y * 0.09, 0.045)
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        baseTilt - parallax.y,
        0.08,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        parallax.x * 0.05,
        0.08,
      )
    } else {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        baseTilt,
        0.08,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        0,
        0.08,
      )
    }
  })

  return (
    <group ref={group} position={[0.12, 0, 0]} scale={simplified ? 0.95 : 1.08}>
      <GlobeCore simplified={simplified} />
      <Atmosphere />
      <OrbitRings simplified={simplified} reducedMotion={reducedMotion} />
    </group>
  )
}

function Lights({ simplified }: { simplified: boolean }) {
  return (
    <>
      <ambientLight intensity={0.2} color="#aeb8e8" />
      {/* Upper-right key — clear limb highlight + dark opposite hemisphere */}
      <directionalLight
        position={[5.2, 3.8, 3.2]}
        intensity={1.55}
        color="#f0f3ff"
      />
      <directionalLight
        position={[-3.2, -0.8, -2.4]}
        intensity={0.28}
        color="#6ea0ff"
      />
      {!simplified && (
        <pointLight
          position={[2.6, 2.0, 2.2]}
          intensity={1.1}
          distance={12}
          color="#8fa0ff"
        />
      )}
    </>
  )
}

type ContactGlobeProps = {
  className?: string
}

export function ContactGlobe({ className = '' }: ContactGlobeProps) {
  const reducedMotion = prefersReducedMotion()
  const enableParallax = prefersFinePointer()
  const simplified =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches

  const dpr = simplified
    ? ([1, 1.25] as [number, number])
    : ([1, 1.6] as [number, number])

  return (
    <div
      className={['contact-globe', className].filter(Boolean).join(' ')}
      role="img"
      aria-label="Futuristic digital Earth globe."
    >
      <Canvas
        className="contact-globe__canvas"
        dpr={dpr}
        gl={{
          antialias: !simplified,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ fov: 34, near: 0.1, far: 40, position: [0, 0.08, 5.1] }}
      >
        <Lights simplified={simplified} />
        <StarField simplified={simplified} />
        <GlobeRig
          reducedMotion={reducedMotion}
          enableParallax={enableParallax}
          simplified={simplified}
        />
      </Canvas>
      <div className="contact-globe__glow" aria-hidden="true" />
    </div>
  )
}
