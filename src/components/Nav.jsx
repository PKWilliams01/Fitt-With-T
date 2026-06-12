import { useState, useEffect } from 'react'
import './Nav.css'

const LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'About',    page: 'about'    },
  { label: 'Coaching', page: 'packages' },
  { label: 'Results',  page: 'results'  },
  { label: 'Contact',  page: 'contact'  },
]

export default function Nav({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNav(page) {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <header className={`nav-bar${scrolled ? ' nav-bar--scrolled' : ''}`}>

      <button
        className="nav-logo"
        onClick={() => handleNav('home')}
        aria-label="Fitt With T — go to home"
      >
        Fitt With <span className="nav-logo__t">T</span>
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
