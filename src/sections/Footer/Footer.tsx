import { contact, profile } from '@/content'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <p className="site-footer__brand">
          {profile.firstName} | Portfolio
        </p>
        <ul className="site-footer__social">
          <li>
            <a href={contact.github.href} target="_blank" rel="noreferrer">
              {contact.github.label}
            </a>
          </li>
          <li>
            <a href={contact.linkedin.href} target="_blank" rel="noreferrer">
              {contact.linkedin.label}
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`}>Email</a>
          </li>
        </ul>
        <p className="site-footer__copy">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}
