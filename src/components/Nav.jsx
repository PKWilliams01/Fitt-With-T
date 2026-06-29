import { useState, useEffect } from 'react'
import logo from '../assets/logo-transparent.png'
import { SOCIALS, isMail } from '../data/socials'
import './Nav.css'

const LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'Meet Tommera', page: 'about'    },
  { label: 'Coaching',     page: 'packages' },
  { label: 'Results',  page: 'results'  },
  { label: 'Contact',  page: 'contact'  },
]

const InstagramIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

const TikTokIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M16.5 3c.36 2.3 1.9 3.94 4.5 4.1v2.93c-1.46 0-2.84-.45-4.02-1.23v6.07c0 3.5-2.84 6.13-6.24 6.13C7.84 21 5 18.5 5 15.43c0-3.16 2.62-5.7 5.86-5.55v3.02c-.3-.1-.62-.15-.96-.15-1.46 0-2.64 1.2-2.64 2.68s1.18 2.68 2.64 2.68c1.5 0 2.72-1.18 2.72-2.78V3h1.88z" />
  </svg>
)

const MailIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
)

const ICONS = { Instagram: InstagramIcon, TikTok: TikTokIcon, Email: MailIcon }

export default function Nav({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* lock the page behind the open drawer + close on Escape */
  useEffect(() => {
    if (!menuOpen) return
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function handleNav(page) {
    onNavigate(page)
    setMenuOpen(false)
  }

  const overHero = currentPage === 'home' && !scrolled

  return (
    <header className={`nav-bar${scrolled ? ' nav-bar--scrolled' : ''}${overHero ? ' nav-bar--over-hero' : ''}`}>

      <div
        className={`nav-scrim${menuOpen ? ' nav-scrim--show' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <button
        className="nav-logo"
        onClick={() => handleNav('home')}
        aria-label="Fitt With T — go to home"
      >
        <img className="nav-logo__img" src={logo} alt="Fitt With T" />
      </button>

      <nav
        id="main-nav"
        className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}
        aria-label="Main navigation"
      >
        {LINKS.map(({ label, page }) => (
          <button
            key={page}
            className={`nav-link${currentPage === page ? ' nav-link--current' : ''}`}
            onClick={() => handleNav(page)}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {label}
          </button>
        ))}

        <button className="nav-cta" onClick={() => handleNav('book')}>
          Book a Taster
        </button>

        <div className="nav-social">
          <span className="nav-social__label">Connect</span>
          <div className="nav-social__icons">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                className="nav-social__link"
                href={href}
                {...(isMail(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                aria-label={isMail(href) ? 'Email Fitt With T' : `${label} (opens in a new tab)`}
              >
                {ICONS[label]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <button
        className={`nav-burger${menuOpen ? ' nav-burger--open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="main-nav"
      >
        <span /><span /><span />
      </button>

    </header>
  )
}
