import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import './SectionLabel.css'

type SectionLabelProps = {
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' | 'className'>

/** Small uppercase section label (e.g. ABOUT / MY WORK). */
export function SectionLabel({
  children,
  className = '',
  ...rest
}: SectionLabelProps) {
  const classes = ['section-label', className].filter(Boolean).join(' ')

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  )
}
