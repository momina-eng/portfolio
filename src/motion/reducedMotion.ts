export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersFinePointer(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function usePrefersReducedMotion(): boolean {
  // Lightweight sync helper for initial renders; Hero also listens via matchMedia.
  return prefersReducedMotion()
}
