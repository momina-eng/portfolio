import { useEffect, useId, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profile } from '@/content'
import './Navigation.css'

export type NavItem = {
  label: string
  to: string
  id: string
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'Overview', to: '/#about' },
  { id: 'projects', label: 'Work', to: '/#projects' },
  { id: 'experience', label: 'Experience', to: '/#experience' },
  { id: 'education', label: 'Education', to: '/#education' },
  { id: 'contact', label: 'Contact', to: '/#contact' },
]

type NavigationProps = {
  activeId?: string | null
}

/** Reference-style mark: two horizontal bars. */
function LogoMark() {
  return (
    <svg
      className="nav__mark"
      viewBox="0 0 22 18"
      width="22"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="2" width="14" height="3.5" rx="1.2" fill="currentColor" />
      <rect
        x="5"
        y="11.5"
        width="16"
        height="3.5"
        rx="1.2"
        fill="currentColor"
        opacity="0.72"
      />
    </svg>
  )
}

function SmartLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  if (to.startsWith('/#')) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <NavLink to={to} className={className} onClick={onClick}>
      {children}
    </NavLink>
  )
}

export function Navigation({ activeId = null }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const location = useLocation()

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (media.matches) setMenuOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  const closeMenu = () => setMenuOpen(false)

  const brandLabel = `${profile.firstName} | Portfolio`

  return (
    <header className="nav">
      <div className="nav__bar">
        <Link className="nav__brand" to="/" onClick={closeMenu}>
          <LogoMark />
          <span className="nav__name">{brandLabel}</span>
        </Link>

        <nav className="nav__desktop" aria-label="Primary">
          <ul className="nav__list">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeId === item.id ||
                (item.id === 'projects' &&
                  (location.hash === '#projects' ||
                    location.pathname.startsWith('/projects')))
              return (
                <li key={item.id}>
                  <SmartLink
                    className={[
                      'nav__link',
                      isActive ? 'nav__link--active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    to={item.to}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </SmartLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          className={[
            'nav__toggle',
            menuOpen ? 'nav__toggle--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
        </button>
      </div>

      <div
        id={menuId}
        className={['nav__panel', menuOpen ? 'nav__panel--open' : '']
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <nav aria-label="Mobile">
          <ul className="nav__panel-list">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeId === item.id ||
                (item.id === 'projects' &&
                  (location.hash === '#projects' ||
                    location.pathname.startsWith('/projects')))
              return (
                <li key={item.id}>
                  <SmartLink
                    className={[
                      'nav__panel-link',
                      isActive ? 'nav__panel-link--active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    to={item.to}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </SmartLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
