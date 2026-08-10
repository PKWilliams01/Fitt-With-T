import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero({ onNavigate, introActive }) {
  const mediaRef = useRef(null)

  /* FIT-55 — gentle parallax: the photo pulls at a slower rate than the page.
     Skipped entirely for prefers-reduced-motion users. */
  useEffect(() => {
    const el = mediaRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--py', `${-window.scrollY * 0.12}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className={`hero${introActive ? '' : ' hero--reveal'}`}>
      {/* FIT-53 — full-bleed photo zone (hero.jpeg) under the readability overlay */}
      <div className="hero-media" aria-hidden="true" ref={mediaRef} />

      {/* FIT-51 — centred headline + CTA */}
      <div className="hero-centre">
        <h1 className="hero-h1 rise d2">
          More than a programme — <em>a mindset shift</em>
        </h1>
        <p className="hero-sub rise d3">
          Every journey starts somewhere. This could be yours.
        </p>
        <button
          className="btn-outline rise d4"
          onClick={() => onNavigate('book')}
        >
          Train with me
        </button>
      </div>

      {/* creed strip pinned at the bottom of the hero */}
      <div className="hero-creed rise d4">
        <span>Faith</span><span>Intention</span><span>Tenacity</span>
      </div>
    </section>
  )
}
