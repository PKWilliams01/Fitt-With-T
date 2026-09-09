import useReveal from '../hooks/useReveal'
import { SOCIALS, isMail } from '../data/socials'
import ProviderEmbed from '../components/ProviderEmbed'
import { BOOKING_EMBED_URL, BOOKING_DIRECT_URL, PROVIDER_NAME } from '../config/provider'
import { useCookieConsent } from '../context/CookieConsent'
import './Book.css'

const emailEntry = SOCIALS.find((s) => isMail(s.href))

/* Consultation steps — sets expectations before the embed loads. */
const STEPS = [
  ['Pick a time', 'Choose a slot that works for you — no charge, no commitment.'],
  ['Share a few details', 'A short intake covers your goals and any health basics, so T can coach you safely from session one.'],
  ['Talk it through', 'We meet online to go over your goals and PAR-Q, then plan your next step together.'],
]

export default function BookPage({ bookContext = {} }) {
  const revealRef = useReveal()
  const { consent } = useCookieConsent()

  return (
    <main className="book-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Book a consultation</span>
          <h1 className="display reveal d1">Let&rsquo;s start with a <em>free session</em></h1>
          {bookContext.tier && (
            <p className="book-interest reveal d1">
              You&rsquo;re interested in <strong>{bookContext.tier}</strong> — let&rsquo;s get you booked in.
            </p>
          )}
        </div>
      </header>

      <section>
        <div className="wrap">
          <ol className="book-steps reveal d1">
            {STEPS.map(([title, copy], i) => (
              <li key={title} className="book-step">
                <span className="book-step__n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h2 className="book-step__h">{title}</h2>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="book-explainer reveal d2">
            Book a free online consultation to talk through your PAR-Q and goals —
            afterwards we&rsquo;ll arrange your first session together.
          </p>

          <div className="book-embed reveal d2">
            {consent === 'accepted' ? (
              /* consent given — only now does the Acuity iframe (and its
                 third-party cookies) enter the DOM */
              <ProviderEmbed title="Book a free consultation" src={BOOKING_EMBED_URL}>
                {/* shown until the client's provider URL is configured */}
                <div className="book-embed__pending" role="status">
                  <p className="book-embed__title">Scheduling is being connected</p>
                  <p>
                    This is where the booking calendar and intake form will appear,
                    provided securely by our scheduling partner — it isn&rsquo;t live
                    yet. In the meantime, email T directly to arrange your free
                    consultation:{' '}
                    <a href={emailEntry.href}>{emailEntry.href.replace('mailto:', '')}</a>.
                  </p>
                </div>
              </ProviderEmbed>
            ) : (
              /* no consent (unknown or rejected): no iframe, no embed script.
                 Rejecting never blocks booking — Acuity's own page still works. */
              <div className="book-embed__pending" role="status">
                <p className="book-embed__title">Booking calendar not loaded</p>
                <p>
                  To load the secure booking calendar, please accept cookies — or{' '}
                  <a href={BOOKING_DIRECT_URL} target="_blank" rel="noopener noreferrer">
                    book directly on Acuity
                  </a>.
                </p>
              </div>
            )}
          </div>

          <p className="note">
            Your booking and details are handled securely by {PROVIDER_NAME} —
            they&rsquo;re never stored on this site.
          </p>
        </div>
      </section>
    </main>
  )
}
