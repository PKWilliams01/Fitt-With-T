import useReveal from '../hooks/useReveal'
import Testimonial from '../components/Testimonial'
import './Results.css'

/* Labelled placeholder photo zones — verbatim from the approved concept
   (#page-results). Deliberately span women & men, beginners→advanced,
   younger & older, so everyone sees themselves. Real photos (with the
   client's permission) replace these on the live site. */
const GALLERY = [
  { label: 'Before / after transformation', span: 'gtall' },
  { label: 'Client training (female)' },
  { label: 'Client training (male)' },
  { label: 'Session in action', span: 'gwide' },
  { label: 'Strength milestone' },
  { label: 'Mobility / older client' },
  { label: 'Gymnastics / skill shot', span: 'gwide' },
  { label: 'Happy client portrait' },
]

export default function ResultsPage({ onNavigate }) {
  const revealRef = useReveal()

  return (
    <main className="results-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Results &amp; Testimonials</span>
          <h1 className="display reveal d1">Real people, real <em>progress</em></h1>
          <p className="reveal d2">
            Transformations and words from clients. This grows as more journeys
            complete — the proof behind the method.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <ul className="gal-grid">
            {GALLERY.map(({ label, span }) => (
              <li key={label} className={`photo reveal${span ? ` ${span}` : ''}`}>
                <span className="pc" aria-hidden="true">&#10022;</span>
                <span className="pl">{label}</span>
              </li>
            ))}
          </ul>
          <p className="note">
            Labelled photo zones — deliberately spanning women and men, beginners
            to advanced, so everyone sees themselves here. Filled with T's real
            photos (with permission) on the live site.
          </p>

          <div className="results-wall reveal d1">
            <Testimonial
              stars={5}
              quote="[ T's real 12-week client testimonial drops in here — her client's genuine words once she shares them. ]"
              author="12-week client"
              role="Completed programme"
            />
          </div>
          <p className="note">
            A growing wall of reviews — clients are invited to leave a written
            testimonial or Google review as they finish their programme.
          </p>
        </div>
      </section>
    </main>
  )
}
