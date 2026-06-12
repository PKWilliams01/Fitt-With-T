import './Hero.css'

export default function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-wrap">

        <div className="hero-copy">
          <span className="hero-eyebrow">Personal Training · North London</span>
          <h1 className="hero-h1">
            <span className="ln"><span>Train with</span></span>
            <span className="ln"><span><em>faith.</em></span></span>
            <span className="ln"><span>Built for you.</span></span>
          </h1>
          <div className="hero-sub">
            <p>
              Strength, confidence and real change — for anyone who's ever felt
              out of place in a gym. One coach, one plan, all in your corner.
              Beginners especially welcome.
            </p>
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate('book')}>
              Book a free taster →
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate('about')}>
              Meet T
            </button>
          </div>
        </div>

        {/* FIT-53 — photo placeholder, aria-hidden: decorative */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-photo">
            <img src="/hero.jpeg" alt="Tommera — personal trainer, Fitt With T" className="hero-photo__img" />
          </div>
          <div className="hero-creed">
            <div className="hero-creed__word">Faith</div>
            <div className="hero-creed__word">Intention</div>
            <div className="hero-creed__word">Tenacity</div>
          </div>
        </div>

      </div>

      <div className="scroll-cue" aria-hidden="true">Scroll</div>
    </section>
  )
}
