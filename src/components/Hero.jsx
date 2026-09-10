import LightRays from './LightRays'
import './Hero.css'

/* Hero background: rose-gold light rays (ogl/WebGL) streaming from the top
   over a dark espresso base; a scrim + text-shadow keep the cream type legible.
   The WebGL ray loop is skipped for prefers-reduced-motion users. */
const animate =
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hero({ onNavigate, introActive }) {
  return (
    <section className={`hero${introActive ? '' : ' hero--reveal'}`}>
      {animate && (
        <div className="hero-rays" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="#b3705c"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
      )}
      <div className="hero-scrim" aria-hidden="true" />

      {/* centred headline + CTA */}
      <div className="hero-centre">
        <h1 className="hero-h1 rise d2">
          More than a programme<br /><em>a mindset shift</em>
        </h1>
        <p className="hero-sub rise d3">
          Every journey starts somewhere. This could be yours.
        </p>
        <button
          className="btn-outline rise d4"
          onClick={() => onNavigate('packages')}
        >
          Train with me
        </button>
      </div>

      {/* creed strip pinned at the bottom of the hero — one per word */}
      <div className="hero-creed rise d4">
        <span className="hero-creed__item">
          <span className="hero-creed__dot" aria-hidden="true">&#10022;</span>Faith
        </span>
        <span className="hero-creed__item">
          <span className="hero-creed__dot" aria-hidden="true">&#10022;</span>Intention
        </span>
        <span className="hero-creed__item">
          <span className="hero-creed__dot" aria-hidden="true">&#10022;</span>Tenacity
        </span>
        <span className="hero-creed__item">
          <span className="hero-creed__dot" aria-hidden="true">&#10022;</span>Testimonials
        </span>
      </div>
    </section>
  )
}
