import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import { SOCIALS, isMail } from '../data/socials'
import './Contact.css'

/* FAQ — verbatim from the approved concept (#page-contact). */
const FAQ = [
  ['Do I need to be fit to start?', 'Not at all — the Faith Starter is built for total beginners and anyone coming back after a break. We start exactly where you are.'],
  ['Is this only for women?', 'No. While many of my clients are women, I coach men too, of all ages — beginners to advanced. Everyone’s welcome and everyone gets a plan built for them.'],
  ['What happens at the free taster?', 'We meet, talk through your goals, and do a relaxed first session so you can feel how I coach — no pressure to continue.'],
  ['What’s the intake form for?', 'A few questions about your goals, health and lifestyle so I can train you safely and tailor your sessions. Your answers stay private and secure.'],
  ['How does pricing work?', 'We discuss the right package and pricing after your taster, once we know it’s a good fit — so you’re never committing blind.'],
]

const emailEntry = SOCIALS.find((s) => isMail(s.href))
const socialEntries = SOCIALS.filter((s) => !isMail(s.href))

const EMPTY = { name: '', email: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* FIT-70 — PLACEHOLDER submit. The form must post ONLY to an endpoint T
   owns and authorises (e.g. a Formspree/Basin form, or our own handler).
   Intentionally left unwired. DO NOT point this at a third-party endpoint
   from a snippet — replace the body before launch. Client-side validation
   below is for UX only; the real endpoint must validate server-side too. */
function sendContactMessage(_values) {
  // TODO: wire to the authorised form endpoint.
  return Promise.resolve()
}

export default function ContactPage({ onNavigate }) {
  const revealRef = useReveal()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function validate(v) {
    const e = {}
    if (!v.name.trim()) e.name = 'Please tell me your name.'
    if (!v.email.trim()) e.email = 'Please add your email.'
    else if (!EMAIL_RE.test(v.email)) e.email = 'That email doesn’t look right.'
    if (!v.message.trim()) e.message = 'Add a short message so I know how to help.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    sendContactMessage(values) // placeholder until wired to a real endpoint
    setSent(true)
    setValues(EMPTY)
  }

  return (
    <main className="contact-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Get in touch</span>
          <h1 className="display reveal d1">Not quite sure yet? <em>Let’s chat</em></h1>
          <p className="reveal d2">
            No pressure and no commitment — if you’ve got a question or just want to
            see whether we’re a fit, drop me a message below. I read every one myself
            and I’ll get back to you personally.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap contact-grid">
          <div className="contact-form-wrap reveal">
            {sent ? (
              <p className="contact-sent" role="status">
                Thank you — your message is on its way. I’ll be in touch very soon.
              </p>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="cf-name">Your name</label>
                  <input id="cf-name" name="name" type="text" value={values.name}
                    onChange={handleChange} required autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cf-name-err' : undefined} />
                  {errors.name && <p className="field-err" id="cf-name-err" role="alert">{errors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" value={values.email}
                    onChange={handleChange} required autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'cf-email-err' : undefined} />
                  {errors.email && <p className="field-err" id="cf-email-err" role="alert">{errors.email}</p>}
                </div>

                <div className="field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" name="message" rows="5" value={values.message}
                    onChange={handleChange} required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'cf-message-err' : undefined} />
                  {errors.message && <p className="field-err" id="cf-message-err" role="alert">{errors.message}</p>}
                </div>

                <button className="btn btn-primary" type="submit">
                  Send message <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </div>

          <aside className="contact-direct reveal d1">
            <div>
              <h2 className="contact-direct__h">Reach me directly</h2>
              <p>Prefer email? <a href={emailEntry.href}>{emailEntry.href.replace('mailto:', '')}</a></p>
              <p className="contact-direct__note">Based in North London &amp; surrounding areas.</p>
            </div>
            <div>
              <h2 className="contact-direct__h">Follow along</h2>
              <ul className="contact-direct__socials">
                {socialEntries.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                       aria-label={`${s.label} (opens in a new tab)`}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn btn-ghost" onClick={() => onNavigate('book')}>
              Or book a free taster <span aria-hidden="true">→</span>
            </button>
          </aside>
        </div>
      </section>

      <section className="contact-faq-section">
        <div className="wrap">
          <div className="faq-head">
            <span className="eyebrow center reveal">Good to know</span>
            <h2 className="display reveal d1">Questions, <em>answered</em></h2>
          </div>
          <div className="faq reveal d1">
            {FAQ.map(([q, a]) => (
              <details className="fitem" key={q}>
                <summary className="fq">{q}<span className="pm" aria-hidden="true">+</span></summary>
                <p className="fa">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
