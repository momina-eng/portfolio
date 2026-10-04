import * as THREE from 'three'

type ImageSource = CanvasImageSource & { width: number; height: number }

function asImageSource(image: unknown): ImageSource | null {
  if (!image) return null
  if (
    image instanceof HTMLImageElement ||
    image instanceof HTMLCanvasElement ||
    image instanceof ImageBitmap ||
    image instanceof OffscreenCanvas
  ) {
    return image as ImageSource
  }
  return null
}

async function ensureTextureImage(
  map: THREE.Texture | null | undefined,
): Promise<ImageSource | null> {
  const img = asImageSource(map?.image)
  if (!img) return null
  if (img instanceof HTMLImageElement) {
    if (!img.complete) {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('texture image failed'))
      })
    }
    if (typeof img.decode === 'function') {
      try {
        await img.decode()
      } catch {
        // optional
      }
    }
  }
  return img
}

function finalizeCanvasTexture(
  source: THREE.Texture,
  canvas: HTMLCanvasElement,
): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = source.wrapS
  texture.wrapT = source.wrapT
  texture.offset.copy(source.offset)
  texture.repeat.copy(source.repeat)
  texture.center.copy(source.center)
  texture.rotation = source.rotation
  texture.flipY = source.flipY
  texture.colorSpace = source.colorSpace
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = 1
  texture.needsUpdate = true
  return texture
}

/** Sample an opaque RGB from the dark screen background (not pure black). */
function sampleScreenBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): string {
  // Prefer a pixel in the right-panel dark chrome / empty preview area.
  const samples: Array<[number, number]> = [
    [Math.floor(width * 0.78), Math.floor(height * 0.12)],
    [Math.floor(width * 0.85), Math.floor(height * 0.55)],
    [Math.floor(width * 0.7), Math.floor(height * 0.75)],
    [Math.floor(width * 0.6), Math.floor(height * 0.2)],
  ]

  for (const [sx, sy] of samples) {
    const data = ctx.getImageData(
      Math.min(width - 1, Math.max(0, sx)),
      Math.min(height - 1, Math.max(0, sy)),
      1,
      1,
    ).data
    const r = data[0]!
    const g = data[1]!
    const b = data[2]!
    // Skip bright UI chrome; keep dark bg samples
    if (r < 50 && g < 50 && b < 60) {
      return `rgb(${r}, ${g}, ${b})`
    }
  }
  return 'rgb(5, 5, 9)'
}

/**
 * Keep left code editor intact. Fully opaque-cover the right hero text column.
 * No replacement text.
 */
function blankMonitorNameRegion(
  sourceMap: THREE.Texture,
  image: ImageSource,
): THREE.CanvasTexture {
  const width = image.width || 1024
  const height = image.height || 512
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) {
    return sourceMap.clone() as THREE.CanvasTexture
  }

  ctx.filter = 'none'
  ctx.globalAlpha = 1
  ctx.globalCompositeOperation = 'source-over'
  ctx.drawImage(image, 0, 0, width, height)

  const fill = sampleScreenBackground(ctx, width, height)

  // Generous right-side cover: hero "Hi, I'm", name, and description.
  // Leave left ~52% (code editor) completely untouched — no patches there.
  const coverX = Math.floor(width * 0.52)
  const coverY = 0
  const coverW = width - coverX
  const coverH = height

  ctx.fillStyle = fill
  ctx.fillRect(coverX, coverY, coverW, coverH)

  console.info('[HeroPC blank] monitor cover', {
    native: { width, height },
    rightCover: { coverX, coverY, coverW, coverH, fill },
  })

  return finalizeCanvasTexture(sourceMap, canvas)
}

/** Full opaque cover of the ABDULLAH name plate — no replacement letters. */
function blankGalleryNameplate(
  sourceMap: THREE.Texture,
  image: ImageSource,
): THREE.CanvasTexture {
  const width = image.width || 128
  const height = image.height || 256
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) {
    return sourceMap.clone() as THREE.CanvasTexture
  }

  ctx.filter = 'none'
  ctx.globalAlpha = 1
  ctx.drawImage(image, 0, 0, width, height)

  const sample = ctx.getImageData(2, 2, 1, 1).data
  const fill = `rgb(${sample[0]}, ${sample[1]}, ${sample[2]})`

  ctx.fillStyle = fill
  ctx.fillRect(0, 0, width, height)

  console.info('[HeroPC blank] gallery cover', {
    native: { width, height },
    fill,
  })

  return finalizeCanvasTexture(sourceMap, canvas)
}

function getMaterials(mesh: THREE.Mesh): THREE.Material[] {
  return Array.isArray(mesh.material) ? mesh.material : [mesh.material]
}

function applyMapToMesh(
  mesh: THREE.Mesh,
  nextMap: THREE.Texture,
  sourceMat: THREE.Material,
) {
  const mats = getMaterials(mesh).map((mat) => {
    const cloned = mat.clone()
    if ('map' in cloned) {
      ;(cloned as THREE.MeshStandardMaterial).map = nextMap
    }
    if (
      cloned instanceof THREE.MeshStandardMaterial &&
      sourceMat instanceof THREE.MeshStandardMaterial &&
      sourceMat.emissiveMap
    ) {
      cloned.emissiveMap = nextMap
      cloned.emissive =
        sourceMat.emissive?.clone?.() ?? new THREE.Color('#ffffff')
      cloned.emissiveIntensity = sourceMat.emissiveIntensity || 0.5
    }
    cloned.needsUpdate = true
    return cloned
  })
  mesh.material = mats.length === 1 ? mats[0]! : mats
}

export type ScreenPatchReport = {
  monitor: { blanked: boolean; mesh?: string }
  gallery: { blanked: boolean; mesh?: string }
}

/**
 * Blank Abdullah branding regions only — no replacement text.
 */
export async function applyMominaScreenTextures(
  root: THREE.Object3D,
): Promise<ScreenPatchReport> {
  const report: ScreenPatchReport = {
    monitor: { blanked: false },
    gallery: { blanked: false },
  }

  if (root.userData.__mominaScreenBlanked) {
    return (root.userData.__mominaScreenBlankReport as ScreenPatchReport) ?? report
  }

  const screenMeshes: THREE.Mesh[] = []
  const galleryMeshes: THREE.Mesh[] = []

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return
    if (/SCREEN/i.test(obj.name)) screenMeshes.push(obj)
    if (/gallerymodel/i.test(obj.name)) galleryMeshes.push(obj)
  })

  for (const mesh of screenMeshes) {
    const mat = getMaterials(mesh)[0]
    if (!mat || !('map' in mat)) continue
    const sourceMap = (mat as THREE.MeshStandardMaterial).map
    if (!sourceMap) continue

    const image = await ensureTextureImage(sourceMap)
    if (!image) continue

    const texture = blankMonitorNameRegion(sourceMap, image)
    applyMapToMesh(mesh, texture, mat)
    report.monitor = { blanked: true, mesh: mesh.name }
  }

  for (const mesh of galleryMeshes) {
    const mat = getMaterials(mesh)[0]
    if (!mat || !('map' in mat)) continue
    const sourceMap = (mat as THREE.MeshStandardMaterial).map
    if (!sourceMap) continue

    const image = await ensureTextureImage(sourceMap)
    if (!image) continue

    const texture = blankGalleryNameplate(sourceMap, image)
    applyMapToMesh(mesh, texture, mat)
    report.gallery = { blanked: true, mesh: mesh.name }
  }

  root.userData.__mominaScreenBlanked = true
  root.userData.__mominaScreenBlankReport = report
  console.info('[HeroPC blank] complete', report)
  return report
}

export function cloneSceneWithMaterials(source: THREE.Object3D): THREE.Group {
  const clone = source.clone(true)
  clone.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return
    if (Array.isArray(obj.material)) {
      obj.material = obj.material.map((m) => m.clone())
    } else if (obj.material) {
      obj.material = obj.material.clone()
    }
  })
  return clone as THREE.Group
}
