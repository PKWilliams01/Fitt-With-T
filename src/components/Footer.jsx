import './Footer.css'

const EXPLORE = [
  { label: 'About',    page: 'about'    },
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
              Personal training in North London for everyone — beginners, returners, all ages and levels.
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
            <span className="footer__link footer__link--placeholder">Instagram</span>
            <span className="footer__link footer__link--placeholder">TikTok</span>
          </div>

        </div>

        <div className="footer__bottom">
          <span>© 2026 Fitt With T · Personal Training, North London</span>
        </div>

      </div>
    </footer>
  )
}
