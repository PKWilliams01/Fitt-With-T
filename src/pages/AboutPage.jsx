import { useEffect, useRef, useState, useCallback } from 'react'
import portrait from '../assets/Portrait.jpeg'
import gymFloor from '../assets/WhatsApp Image 2026-06-10 at 8.30.30 PM.jpeg'
import gymTrophy from '../assets/WhatsApp Image 2026-06-10 at 8.39.49 PM.jpeg'
import gymVault from '../assets/WhatsApp Image 2026-06-10 at 8.30.29 PM.jpeg'
import gymBars from '../assets/About Poortrait 3.jpeg'
import gymPortrait from '../assets/About Portrait 2.jpeg'
import './About.css'

const journeyPhotos = [
  { src: portrait, caption: 'Coach & founder, Fitt With T', alt: 'Tommera, coach and founder of Fitt With T', position: 'center 20%' },
  { src: gymBars, caption: 'Uneven bars — national competition', alt: 'Tommera mid-release on the uneven bars during a gymnastics competition', position: 'center 30%' },
  { src: gymFloor, caption: 'Floor routine', alt: 'Tommera performing a floor routine, arm raised mid-pose', position: 'center 25%' },
  { src: gymPortrait, caption: 'Competition ready', alt: 'Portrait of Tommera in her gymnastics leotard against a brick wall', position: 'center 15%' },
  { src: gymVault, caption: 'Sticking the vault', alt: 'Tommera landing a vault in front of a competition crowd', position: 'center 35%' },
  { src: gymTrophy, caption: '12 years of competition — podium moments', alt: 'Tommera smiling and holding a trophy and medals after a competition', position: 'center 20%' },
]

const JOURNEY_INTERVAL_MS = 5000

/* Full-bleed editorial slideshow — leads the page. Auto-advances with a
   slim progress bar (restarted per-slide via `key`), pauses on
   hover/focus, and drops autoplay + the progress animation entirely
   under prefers-reduced-motion, leaving only the manual controls. */
function JourneySlideshow({ photos }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, JOURNEY_INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused, reduceMotion, photos.length])

  const goTo = useCallback((i) => setIndex((i + photos.length) % photos.length), [photos.length])
  const active = photos[index]

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slideshow-stage">
        {photos.map((photo, i) => (
          <img
            key={photo.src}
            className={`slideshow-slide${i === index ? ' is-active' : ''}`}
            src={photo.src}
            alt={photo.alt}
            style={{ objectPosition: photo.position }}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i === index ? undefined : true}
          />
        ))}

        <div className="slideshow-scrim" aria-hidden="true" />

        <div className="slideshow-meta">
          <p className="slideshow-caption">{active.caption}</p>
          <span className="slideshow-count">{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
        </div>

        <button
          type="button"
          className="slideshow-nav slideshow-nav--prev"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="slideshow-nav slideshow-nav--next"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
        >
          <span aria-hidden="true">›</span>
        </button>

        <div className="slideshow-progress" role="tablist" aria-label="Choose a photo">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show photo ${i + 1}: ${photo.caption}`}
              className={`slideshow-track${i === index ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
            >
              {i === index && !paused && !reduceMotion && (
                <span key={index} className="slideshow-track-fill" style={{ animationDuration: `${JOURNEY_INTERVAL_MS}ms` }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

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

      <section className="journey reveal">
        <div className="journey-wrap">
          <JourneySlideshow photos={journeyPhotos} />
        </div>
      </section>

      <section className="about-story">
        <div className="wrap">
          <div className="story-copy reveal">
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
