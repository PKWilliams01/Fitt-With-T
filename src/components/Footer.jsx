import { SOCIALS, isMail } from '../data/socials'
import './Footer.css'

const EXPLORE = [
  { label: 'Meet Tommera', page: 'about'    },
  { label: 'Coaching', page: 'packages' },
  { label: 'Results',  page: 'results'  },
  { label: 'Contact',  page: 'contact'  },
]

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer__wrap">

        <div className="footer__top">

          <div className="footer__brand">
            <button
              className="footer__logo"
              onClick={() => onNavigate('home')}
              aria-label="Fitt With T — go to home"
            >
              Fitt With <span className="footer__logo-t">T</span>
            </button>
            <p className="footer__creed">Faith · Intention · Tenacity · Testimonials</p>
            <p className="footer__tagline">
              Personal training in South London for everyone — beginners, returners, all ages and levels.
            </p>
          </div>

          <div className="footer__col">
            <h5 className="footer__heading">Explore</h5>
            {EXPLORE.map(({ label, page }) => (
              <button key={page} className="footer__link" onClick={() => onNavigate(page)}>
                {label}
              </button>
            ))}
          </div>

          <div className="footer__col">
            <h5 className="footer__heading">Start</h5>
            <button className="footer__link" onClick={() => onNavigate('book')}>
              Book a taster
            </button>
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                className="footer__link"
                href={href}
                {...(isMail(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                aria-label={isMail(href) ? 'Email Fitt With T' : `${label} (opens in a new tab)`}
              >
                {label}
              </a>
            ))}
          </div>

        </div>

        <div className="footer__bottom">
          <span>© 2026 Fitt With T · Personal Training, South London</span>
        </div>

      </div>
    </footer>
  )
}
