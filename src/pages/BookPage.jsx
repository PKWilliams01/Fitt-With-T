import { useState } from 'react'
import ProviderEmbed from '../components/ProviderEmbed'
import { PROVIDER_NAME, INTAKE_EMBED_URL, BOOKING_EMBED_URL } from '../config/provider'
import './Book.css'

const STEPS = [{ n: 1, label: 'Secure intake' }, { n: 2, label: 'Pick a time' }]

export default function BookPage() {
  const [step, setStep] = useState(1) // presentation only — never holds form data

  return (
    <main className="book-page">
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center">Book a Taster</span>
          <h1 className="display">Start with a <em>free taster</em></h1>
          <p>Two steps: a short intake form so I can train you safely, then pick a time to meet.</p>
        </div>
      </header>

      <section>
        <div className="wrap book-shell">
          <ol className="book-steps" aria-label="Booking steps">
            {STEPS.map((s) => (
              <li key={s.n} className={`book-step${step === s.n ? ' book-step--current' : ''}`}
                  aria-current={step === s.n ? 'step' : undefined}>
                <span className="book-step__n">{s.n}</span> {s.label}
              </li>
            ))}
          </ol>

          {step === 1 && (
            <div className="book-card">
              <h2>1 · Your intake form</h2>
              <p className="book-sub">A few questions so training is safe and built around you.</p>
              <p className="book-secure">
                <span className="book-secure__icon" aria-hidden="true">🔒</span>
                Your details are handled securely by {PROVIDER_NAME} — they’re never stored on this site.
              </p>
              <ProviderEmbed title="Secure intake form" src={INTAKE_EMBED_URL} />
              <div className="book-actions">
                <button className="btn btn-primary" onClick={() => setStep(2)}>
                  Next: pick a time <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="book-card">
              <h2>2 · Pick a time</h2>
              <p className="book-sub">Choose a day and slot that suits you for your free taster.</p>
              <ProviderEmbed title="Booking calendar" src={BOOKING_EMBED_URL} />
              <div className="book-actions">
                <button className="btn btn-ghost" onClick={() => setStep(1)}>
                  <span aria-hidden="true">←</span> Back to intake
                </button>
              </div>
            </div>
          )}

          <p className="book-note">
            Your intake and booking are handled by {PROVIDER_NAME} on their own secure
            system. Nothing you enter is collected or stored by this website.
          </p>
        </div>
      </section>
    </main>
  )
}
