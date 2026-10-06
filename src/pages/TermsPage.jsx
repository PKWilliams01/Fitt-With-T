import useReveal from '../hooks/useReveal'
import './Privacy.css'   // shared long-form legal typography (.privacy classes)
import './Terms.css'

/* STRUCTURE ONLY — section headings + clearly-bracketed placeholders.
   No final legal wording is written here: the business owner (client) is
   responsible for supplying or approving the actual terms. Each placeholder
   is hard-bracketed and visually flagged so it cannot ship as finished copy. */
const SECTIONS = [
  [
    'Acceptable use of this site',
    '[PLACEHOLDER — client to complete: how visitors may and may not use the website.]',
  ],
  [
    'Intellectual property & content ownership',
    '[PLACEHOLDER — client to complete: who owns the site content, logo, text and images, and how they may be used.]',
  ],
  [
    'Limitation of liability & disclaimer',
    '[PLACEHOLDER — client to complete: fitness and health disclaimer and limits of liability. This is legal wording the client must provide or have professionally reviewed.]',
  ],
  [
    'Third-party services & links',
    '[PLACEHOLDER — client to complete: this site links to and embeds third-party services, including Acuity Scheduling (booking and health questionnaire) and Basin (contact form). State that those providers’ own terms apply when you use them.]',
  ],
  [
    'Governing law',
    '[PLACEHOLDER — client to complete: confirm that these terms are governed by the laws of England & Wales.]',
  ],
]

export default function TermsPage({ onNavigate }) {
  const revealRef = useReveal()

  return (
    <main className="terms-page privacy-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Legal</span>
          <h1 className="display reveal d1">Website <em>terms</em></h1>
          <p className="reveal d2">The terms for using this website.</p>
        </div>
      </header>

      <section>
        <div className="wrap privacy">
          <p className="terms__draft" role="status">
            DRAFT — pending client review. The sections below are placeholders only.
          </p>
          <p className="privacy__updated">Last updated: [DATE — client to set on publish]</p>

          {SECTIONS.map(([heading, placeholder]) => (
            <div key={heading}>
              <h2>{heading}</h2>
              <p className="terms__placeholder">{placeholder}</p>
            </div>
          ))}

          <button className="btn btn-ghost privacy__back" onClick={() => onNavigate('home')}>
            <span aria-hidden="true">&larr;</span> Back to home
          </button>
        </div>
      </section>
    </main>
  )
}
