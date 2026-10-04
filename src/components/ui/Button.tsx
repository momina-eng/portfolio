import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'md' | 'sm'

type BaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string,
) {
  return ['button', `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(' ')
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: ButtonProps) {
  const classNames = classes(variant, size, className)

  if ('href' in rest && typeof rest.href === 'string') {
    return (
      <a className={classNames} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      type={buttonProps.type ?? 'button'}
      className={classNames}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
