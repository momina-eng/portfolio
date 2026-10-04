import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer'
import { readFileSync } from 'node:fs'

await MeshoptDecoder.ready
await MeshoptEncoder.ready

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'meshopt.decoder': MeshoptDecoder,
    'meshopt.encoder': MeshoptEncoder,
  })

export async function stats(path) {
  const document = await io.read(path)
  const root = document.getRoot()
  let meshes = 0
  let primitives = 0
  let triangles = 0
  let vertices = 0

  for (const mesh of root.listMeshes()) {
    meshes += 1
    for (const prim of mesh.listPrimitives()) {
      primitives += 1
      const pos = prim.getAttribute('POSITION')
      if (pos) vertices += pos.getCount()
      const idx = prim.getIndices()
      if (idx) triangles += idx.getCount() / 3
      else if (pos) triangles += pos.getCount() / 3
    }
  }

  const bytes = readFileSync(path).byteLength
  return {
    path,
    bytes,
    mb: +(bytes / (1024 * 1024)).toFixed(2),
    meshes,
    primitives,
    triangles: Math.round(triangles),
    vertices,
    materials: root.listMaterials().length,
    textures: root.listTextures().length,
  }
}

const isDirect =
  process.argv[1] &&
  (process.argv[1].endsWith('glb-stats.mjs') ||
    process.argv[1].endsWith('glb-stats.js'))

if (isDirect && process.argv[2]) {
  console.log(JSON.stringify(await stats(process.argv[2]), null, 2))
}
