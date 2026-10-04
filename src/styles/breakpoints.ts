/**
 * Breakpoint values for JS media queries / later responsive hooks.
 * Keep in sync with `--bp-*` in tokens.css.
 */
export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const

export type Breakpoint = keyof typeof breakpoints

/** Min-width media query string, e.g. `(min-width: 768px)`. */
export function minWidth(bp: Breakpoint): string {
  return `(min-width: ${breakpoints[bp]}px)`
}
