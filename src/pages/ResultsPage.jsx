import useReveal from '../hooks/useReveal'
import TestimonialMarquee from '../components/TestimonialMarquee'
import { TESTIMONIALS } from '../data/testimonials'
import './Results.css'

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
          <div className="results-wall reveal d1">
            <TestimonialMarquee testimonials={TESTIMONIALS} />
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
