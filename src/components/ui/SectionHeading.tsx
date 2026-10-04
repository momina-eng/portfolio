import type { HTMLAttributes, ReactNode } from 'react'
import { SectionLabel } from './SectionLabel'
import './SectionHeading.css'

type HeadingTag = 'h1' | 'h2' | 'h3'

type SectionHeadingProps = {
  as?: HeadingTag
  label?: ReactNode
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLHeadingElement>

/**
 * Section heading pattern:
 *   SMALL UPPERCASE LABEL
 *   Heading.
 */
export function SectionHeading({
  as: Tag = 'h2',
  label,
  children,
  className = '',
  ...rest
}: SectionHeadingProps) {
  const classes = ['section-heading', className].filter(Boolean).join(' ')

  return (
    <div className="section-heading-block">
      {label != null ? (
        <SectionLabel className="section-heading-block__label">{label}</SectionLabel>
      ) : null}
      <Tag className={classes} {...rest}>
        {children}
      </Tag>
    </div>
  )
}
