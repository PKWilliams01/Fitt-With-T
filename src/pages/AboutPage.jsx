import { useEffect, useRef } from 'react'
import portrait from '../assets/Portrait.jpeg'
import './About.css'

export default function AboutPage({ onNavigate }) {
  const rootRef = useRef(null)

  /* Reveal-in: page-head animates on load (already in view), the split and
     creed reveal as they scroll in. Skipped under prefers-reduced-motion,
     where .reveal stays fully visible via the CSS fallback. */
  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main className="about-page" ref={rootRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow eyebrow--center reveal">About</span>
          <h1 className="display reveal d1">Meet <em>Tommera</em></h1>
          <p className="reveal d2">The coach behind Fitt With T.</p>
        </div>
      </header>

      <section className="about-story">
        <div className="wrap split">
          <figure className="photo reveal">
            <img className="photo-img" src={portrait} alt="Tommera, coach and founder of Fitt With T" />
          </figure>

          <div className="story-copy reveal d1">
            <span className="eyebrow">My Story</span>
            <h2 className="display">Faith, fitness &amp; <em>purpose</em></h2>

            <p className="lead">Hey, I'm Tommera — and I'm really glad you're here.</p>

            <p>
              I've spent most of my life in the world of fitness, starting out as a
              gymnast and competing at both a national and international level for over
              12 years. It taught me discipline, resilience, and just how powerful the
              body (and mind!) can be. But most importantly, it gave me a real passion
              for helping others find their <strong>strength</strong> in a way that
              works for them.
            </p>

            <p>
              After coming back from a serious injury and surgery, I saw for myself how
              tough it can be to rebuild. That's why I'm so <strong>passionate</strong>{' '}
              about creating a training space that's supportive, understanding and meets
              you exactly where you are, whether you're just starting out or already on
              your fitness journey.
            </p>

            <p>
              I <strong>love</strong> working with people from all walks of life, not
              just athletes. It doesn't matter if you're a complete beginner, someone
              looking to build confidence in the gym, recovering from injury, or just
              trying to move more — I've got you. I'll be your coach, cheerleader, and
              accountability partner, every step of the way.
            </p>

            <p>
              At the heart of it all, I want you to feel encouraged, capable, and never
              alone in this. Because your fitness journey is <em>yours</em> — I'm just
              here to help you make it feel a little less overwhelming and a lot more
              empowering.
            </p>

            <p className="sig">— T</p>

            <button className="btn btn-primary" onClick={() => onNavigate('book')}>
              Train with me <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="creed">
        <div className="wrap">
          <div className="creed-head">
            <span className="eyebrow eyebrow--center reveal">My Approach</span>
            <h2 className="display reveal d1">Faith · Intention · Tenacity · <em>Testimonials</em></h2>
          </div>

          <div className="creed-grid">
            <article className="creed-item reveal">
              <span className="creed-n">i.</span>
              <h3>Faith</h3>
              <p>Keeping your bigger 'why' in view. We train with purpose, not just for appearances.</p>
            </article>
            <article className="creed-item reveal d1">
              <span className="creed-n">ii.</span>
              <h3>Intention</h3>
              <p>Considered, progressive plans. Every rep is moving you somewhere specific.</p>
            </article>
            <article className="creed-item reveal d2">
              <span className="creed-n">iii.</span>
              <h3>Tenacity</h3>
              <p>Encouragement and accountability so you stay consistent long enough to see change.</p>
            </article>
            <article className="creed-item reveal d3">
              <span className="creed-n">iv.</span>
              <h3>Testimonials</h3>
              <p>Real stories from real people — the results speak for the method.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
