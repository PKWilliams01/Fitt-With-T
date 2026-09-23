import useReveal from '../hooks/useReveal'
import Carousel from '../components/Carousel'
import TestimonialForm from '../components/TestimonialForm'
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
            complete, the proof behind the method.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="results-wall reveal d1">
            <Carousel autoplay autoplayDelay={6000} loop pauseOnHover />
          </div>
          <p className="note">
            A growing wall of reviews. Clients are invited to leave a written
            testimonial or Google review as they finish their programme.
          </p>
        </div>
      </section>

      <section className="results-share">
        <div className="wrap">
          <div className="results-share__head">
            <span className="eyebrow center reveal">Your turn</span>
            <h2 className="display reveal d1">Trained with T? <em>Share your story</em></h2>
            <p className="reveal d2">
              A few words about your experience means the world, and helps the next
              person take their first step. T reviews every submission before anything
              goes on the wall.
            </p>
          </div>
          <div className="reveal d1">
            <TestimonialForm />
          </div>
        </div>
      </section>
    </main>
  )
}
