import { useCookieConsent } from '../context/CookieConsent'
import './ConsentBanner.css'

/* Consent banner — shown only while the choice is 'unknown'. Two equally
   weighted actions; no dismiss that implies neither choice. This banner
   governs only the Acuity embed — the site adds no trackers of its own. */
export default function ConsentBanner() {
  const { consent, choose } = useCookieConsent()
  if (consent !== 'unknown') return null

  return (
    <section
      className="consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-h"
      aria-describedby="consent-p"
    >
      <h2 className="consent__h" id="consent-h">Cookies on this site</h2>
      <p className="consent__p" id="consent-p">
        We use essential cookies to make this site work. Our booking system
        (Acuity) sets additional cookies — including analytics and third-party
        cookies from Google and Stripe — but only if you accept. If you reject,
        you can still book directly on Acuity&rsquo;s own page.{' '}
        {/* placeholder policy route — content to be confirmed by the client */}
        <a className="consent__link" href="/privacy">Cookie &amp; privacy policy</a>
      </p>
      <div className="consent__actions">
        <button className="btn btn-primary" onClick={() => choose('accepted')}>
          Accept
        </button>
        <button className="btn btn-primary" onClick={() => choose('rejected')}>
          Reject
        </button>
      </div>
    </section>
  )
}
