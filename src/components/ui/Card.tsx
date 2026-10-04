import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

type CardTag = 'div' | 'article' | 'section' | 'li'

type CardProps = {
  as?: CardTag
  children: ReactNode
  className?: string
  interactive?: boolean
  padded?: boolean
} & HTMLAttributes<HTMLElement>

export function Card({
  as: Tag = 'div',
  children,
  className = '',
  interactive = false,
  padded = true,
  ...rest
}: CardProps) {
  const classes = [
    'card',
    padded ? 'card--padded' : '',
    interactive ? 'card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
