import type { HTMLAttributes, ReactNode } from 'react'
import './Container.css'

type ContainerTag = 'div' | 'section' | 'main' | 'article' | 'header' | 'footer'

type ContainerProps = {
  as?: ContainerTag
  children: ReactNode
  className?: string
  narrow?: boolean
} & HTMLAttributes<HTMLElement>

export function Container({
  as: Tag = 'div',
  children,
  className = '',
  narrow = false,
  ...rest
}: ContainerProps) {
  const classes = ['container', narrow ? 'container--narrow' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
