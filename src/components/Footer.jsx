import { SOCIALS, isMail } from '../data/socials'
import { useCookieConsent } from '../context/CookieConsent'
import './Footer.css'

const EXPLORE = [
  { label: 'Meet Tommera', page: 'about'    },
  { label: 'Coaching', page: 'packages' },
  { label: 'Results',  page: 'results'  },
  { label: 'Contact',  page: 'contact'  },
]

export default function Footer({ onNavigate }) {
  const { reopen } = useCookieConsent()

  return (
    <footer className="footer">
      <div className="footer__wrap">

        <div className="footer__top">

          <div className="footer__brand">
            <button
              className="footer__logo"
              onClick={() => onNavigate('home')}
              aria-label="Fitt With T home"
            >
              Fitt With <span className="footer__logo-t">T</span>
            </button>
            <p className="footer__creed">Faith · Intention · Tenacity · Testimonials</p>
            <p className="footer__tagline">
              Coaching for everyone: beginners, returners, all ages and levels.
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
            <button className="footer__link" onClick={() => onNavigate('packages')}>
              Book a consultation
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

        {/* Business details — sole-trader identity info (legally required).
            Values are clearly-bracketed placeholders the client must complete;
            they are styled as unfinished so they cannot ship silently empty. */}
        <div className="footer__business">
          <h5 className="footer__heading">Business details</h5>
          <dl className="footer__biz">
            <div className="footer__biz-row">
              <dt>Proprietor</dt>
              <dd className="footer__biz-todo">[Tommera&rsquo;s full legal name — client to provide]</dd>
            </div>
            <div className="footer__biz-row">
              <dt>Trading name</dt>
              <dd>Fitt With T</dd>
            </div>
            <div className="footer__biz-row">
              <dt>Contact email</dt>
              <dd className="footer__biz-todo">[Email — client to provide]</dd>
            </div>
            <div className="footer__biz-row">
              <dt>Business address</dt>
              <dd className="footer__biz-todo">[Business contact address — client to provide; a real address, not a PO box]</dd>
            </div>
          </dl>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Fitt With T</span>
          <span className="footer__legal">
            <button className="footer__manage" onClick={() => onNavigate('privacy')}>
              Privacy &amp; cookies
            </button>
            <button className="footer__manage" onClick={() => onNavigate('terms')}>
              Terms
            </button>
            <button className="footer__manage" onClick={reopen}>Manage cookies</button>
          </span>
        </div>

      </div>
    </footer>
  )
}
