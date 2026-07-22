import useReveal from '../hooks/useReveal'
import { SOCIALS, isMail } from '../data/socials'
import { useCookieConsent } from '../context/CookieConsent'
import './Privacy.css'

const emailEntry = SOCIALS.find((s) => isMail(s.href))
const EMAIL = emailEntry.href.replace('mailto:', '')

/* Third parties that actually receive data, with their own policies. Keep
   this list in step with what the site really loads — it is the substance
   of the cookie notice. */
const PROCESSORS = [
  ['Acuity Scheduling (Squarespace)', 'Booking and the pre-session health questionnaire.', 'https://www.squarespace.com/privacy'],
  ['Basin', 'Delivers contact-form messages to Tommera.', 'https://usebasin.com/privacy'],
]

export default function PrivacyPage({ onNavigate }) {
  const revealRef = useReveal()
  const { reopen } = useCookieConsent()

  return (
    <main className="privacy-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Legal</span>
          <h1 className="display reveal d1">Privacy &amp; <em>cookies</em></h1>
          <p className="reveal d2">
            How this website handles your information — in plain English.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap privacy">
          <p className="privacy__updated">Last updated: 22 July 2026</p>

          <h2>The short version</h2>
          <p>
            This website doesn&rsquo;t collect or store your personal data. It has no
            accounts, no analytics and no tracking of its own. Two things do involve
            other companies: booking a session (handled by Acuity) and sending a
            message through the contact form (delivered by Basin).
          </p>

          <h2>Cookies we set</h2>
          <p>
            Only one, and it&rsquo;s strictly necessary: a record of your cookie choice
            (<code>fwt_cookie_consent</code>), stored in your browser so you aren&rsquo;t
            asked on every visit. We also remember, for the current tab only, that the
            opening animation has played. Neither identifies you, and neither is shared.
          </p>

          <h2>Cookies set only if you accept</h2>
          <p>
            The booking calendar is Acuity&rsquo;s, embedded from their servers. When it
            loads it sets its own cookies, including third-party advertising and
            analytics cookies from Google, plus reCAPTCHA, Datadog and Stripe. Because
            those aren&rsquo;t necessary for the site to work, the calendar is
            <strong> not loaded at all</strong> until you choose &ldquo;Accept&rdquo;.
          </p>
          <p>
            If you decline, nothing from Acuity is loaded and none of those cookies are
            set — you can still book using the direct link on the booking page, which
            takes you to Acuity&rsquo;s own site.
          </p>
          <p>
            You can change your mind at any time using{' '}
            <button className="privacy__inline-btn" onClick={reopen}>Manage cookies</button>{' '}
            in the footer.
          </p>

          <h2>The contact form</h2>
          <p>
            If you send a message, the name, email address and message you type are
            passed to Basin, who deliver it to Tommera&rsquo;s inbox. They aren&rsquo;t
            stored on this website. Please don&rsquo;t include health details in the
            contact form — those belong in the booking questionnaire, which is handled
            securely by Acuity.
          </p>

          <h2>Booking and health information</h2>
          <p>
            Booking and the short health questionnaire happen entirely inside
            Acuity&rsquo;s system, in Tommera&rsquo;s own account. Health information is
            sensitive, so it is deliberately never sent to, processed by, or stored on
            this website — we only display Acuity&rsquo;s booking page.
          </p>

          <h2>Who else receives data</h2>
          <ul className="privacy__list">
            {PROCESSORS.map(([name, what, href]) => (
              <li key={name}>
                <strong>{name}</strong> — {what}{' '}
                <a href={href} target="_blank" rel="noopener noreferrer">Their privacy policy</a>
              </li>
            ))}
          </ul>
          <p>
            Fonts are served from this website itself, so browsing these pages
            doesn&rsquo;t contact any font provider.
          </p>

          <h2>Your rights</h2>
          <p>
            Under UK GDPR you can ask what personal data is held about you, have it
            corrected or deleted, or object to how it&rsquo;s used. Because this site
            stores nothing itself, such requests relate to information held in
            Tommera&rsquo;s Acuity account or her email. To make a request, or if
            something here isn&rsquo;t clear, email{' '}
            <a href={emailEntry.href}>{EMAIL}</a>.
          </p>
          <p>
            If you&rsquo;re unhappy with how a request is handled, you can complain to
            the UK&rsquo;s Information Commissioner&rsquo;s Office at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
          </p>

          <button className="btn btn-ghost privacy__back" onClick={() => onNavigate('home')}>
            <span aria-hidden="true">&larr;</span> Back to home
          </button>
        </div>
      </section>
    </main>
  )
}
