import type { HTMLAttributes, ReactNode } from 'react'
import './ViewportFrame.css'

type ViewportFrameProps = {
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'>

/**
 * Primary glowing portfolio viewport floating on the outer canvas.
 * Page-level scrolling only — no nested scroll container.
 */
export function ViewportFrame({
  children,
  className = '',
  ...rest
}: ViewportFrameProps) {
  const classes = ['viewport-frame', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
