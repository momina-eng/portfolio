export const HERO_PC_MODEL_PATH = '/models/programmer_desktop_3d_pc.glb'
export const HERO_PC_MODEL_PATH_MOBILE =
  '/models/programmer_desktop_3d_pc_mobile.glb'

export type HeroPCModelTier = 'mobile' | 'tablet' | 'desktop'

export function heroPcModelPath(tier: HeroPCModelTier): string {
  return tier === 'mobile' ? HERO_PC_MODEL_PATH_MOBILE : HERO_PC_MODEL_PATH
}
