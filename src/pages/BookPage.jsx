import useReveal from '../hooks/useReveal'
import { SOCIALS, isMail } from '../data/socials'
import './Book.css'

const emailEntry = SOCIALS.find((s) => isMail(s.href))

/* Free-taster steps — sets expectations before the embed loads. */
const STEPS = [
  ['Pick a time', 'Choose a slot that works for you — no charge, no commitment.'],
  ['Share a few details', 'A short intake covers your goals and any health basics, so T can coach you safely from session one.'],
  ['Meet & move', 'We talk through what you want, then do a relaxed first session together.'],
]

/*
 * Booking + the ~15-question health intake are handled entirely by a
 * certified provider (Acuity / Square / Calendly) — per CLAUDE.md this is
 * special-category health data under UK GDPR and must never be collected by
 * a hand-rolled form or stored in this codebase. The client owns that
 * provider account. This section is scaffolding only: once the client
 * shares her scheduling embed/link, drop the provider's own <iframe> or
 * embed script here in place of BOOKING_EMBED_URL. Nothing else changes.
 */
const BOOKING_EMBED_URL = null

export default function BookPage() {
  const revealRef = useReveal()

  return (
    <main className="book-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Book a taster</span>
          <h1 className="display reveal d1">Let&rsquo;s start with a <em>free session</em></h1>
          <p className="reveal d2">
            No pressure and no charge — just a chance to meet, talk through your
            goals, and feel how T coaches before you commit to anything.
          </p>
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

          <div className="book-embed reveal d2">
            {BOOKING_EMBED_URL ? (
              <iframe
                className="book-embed__frame"
                src={BOOKING_EMBED_URL}
                title="Book a free taster session"
                loading="lazy"
              />
            ) : (
              <div className="book-embed__pending" role="status">
                <p className="book-embed__title">Scheduling is being connected</p>
                <p>
                  This is where the booking calendar and intake form will appear,
                  provided securely by our scheduling partner — it isn&rsquo;t live
                  yet. In the meantime, email T directly to arrange your free
                  taster:{' '}
                  <a href={emailEntry.href}>{emailEntry.href.replace('mailto:', '')}</a>.
                </p>
              </div>
            )}
          </div>

          <p className="note">
            Your intake answers (goals, health basics) are collected securely by
            our scheduling partner — never stored on this site.
          </p>
        </div>
      </section>
    </main>
  )
}
