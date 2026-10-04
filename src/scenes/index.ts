/**
 * Isolated 3D scenes (React Three Fiber in a later phase).
 *
 * Architecture rules:
 * - One folder per major scene: `hero/`, `contact/`, plus `shared/` helpers
 * - Lazy-load each scene at the section boundary
 * - Mount only while the section is near viewport
 * - Pause rendering when off-screen / tab hidden / reduced motion
 * - Keep scene graph, assets, and controls inside the scene folder
 *
 * Do not implement scenes in Phase 0.
 */

export {}
