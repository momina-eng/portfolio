import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import './TechTag.css'

type TechTagProps = {
  children: ReactNode
  className?: string
  mark?: string
} & Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className'>

function defaultMark(label: ReactNode): string | undefined {
  if (typeof label !== 'string') return undefined
  const cleaned = label.replace(/[^A-Za-z0-9+/]/g, ' ').trim()
  if (!cleaned) return undefined
  const parts = cleaned.split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase()
}

/** Compact technology / skill chip with consistent geometric mark. */
export function TechTag({
  children,
  className = '',
  mark,
  ...rest
}: TechTagProps) {
  const classes = ['tech-tag', className].filter(Boolean).join(' ')
  const resolvedMark = mark ?? defaultMark(children)

  return (
    <span className={classes} {...rest}>
      {resolvedMark ? <span className="tech-tag__mark">{resolvedMark}</span> : null}
      <span className="tech-tag__label">{children}</span>
    </span>
  )
}
