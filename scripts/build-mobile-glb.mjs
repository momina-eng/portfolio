import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import {
  dedup,
  flatten,
  join,
  prune,
  simplify,
  textureCompress,
  weld,
} from '@gltf-transform/functions'
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer'
import sharp from 'sharp'
import { stats } from './glb-stats.mjs'

await MeshoptDecoder.ready
await MeshoptEncoder.ready

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'meshopt.decoder': MeshoptDecoder,
    'meshopt.encoder': MeshoptEncoder,
  })

const src = 'public/models/programmer_desktop_3d_pc.glb'
const dst = 'public/models/programmer_desktop_3d_pc_mobile.glb'

const document = await io.read(src)

const screenish = document
  .getRoot()
  .listMeshes()
  .map((m) => m.getName())
  .filter((n) => /screen|gallery/i.test(n))
console.log('preserve-named meshes:', screenish)

await document.transform(
  dedup(),
  flatten(),
  // keepNamed: true preserves MY SCREEN / gallerymodel for texture blanking
  join({ keepNamed: true }),
  weld({ overwrite: true }),
  simplify({
    simplifier: MeshoptSimplifier,
    // Keep ~35% verts — phone screens don't need full keyboard key fidelity.
    ratio: 0.35,
    error: 0.0015,
  }),
  // Resize textures; keep original format to avoid sharp colourspace failures.
  textureCompress({
    encoder: sharp,
    resize: [1024, 1024],
    quality: 80,
  }),
  prune({ keepAttributes: true, keepLeaves: false }),
)

await io.write(dst, document)
console.log('wrote', dst)
console.log('desktop', await stats(src))
console.log('mobile ', await stats(dst))
