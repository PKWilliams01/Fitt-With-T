import Hero from '../components/Hero'
import Creed from '../components/Creed'
import ServiceCard from '../components/ServiceCard'
import Testimonial from '../components/Testimonial'
import useReveal from '../hooks/useReveal'
import './Home.css'

const MARQUEE_WORDS = [
  'Strength', 'Confidence', 'Fat Loss', 'Mobility',
  'Beginners Welcome', 'All Levels', 'Faith-Driven',
]

const TIERS = [
  {
    name: 'Faith Starter',
    freq: '1 session / week',
    desc: 'The first step. Build the basics, find your rhythm, and start moving with real confidence.',
    includes: ['One 1:1 session each week', 'A plan built around your goals', 'Technique & form coaching'],
    featured: true,
    ribbon: 'Start here',
    ctaVariant: 'primary',
  },
  {
    name: 'Intentional Progress',
    freq: '2 sessions / week',
    desc: 'Commit properly. Twice-weekly coaching and a structured plan for faster, visible progress.',
    includes: ['Two 1:1 sessions each week', 'Progressive programming', 'Check-ins & accountability'],
    ctaVariant: 'ghost',
  },
  {
    name: 'Tenacity Elite',
    freq: '3 sessions / week',
    desc: 'All in. Maximum support and momentum for serious, lasting transformation.',
    includes: ['Three 1:1 sessions each week', 'Fully tailored programme', 'Priority scheduling & support'],
    ctaVariant: 'ghost',
  },
]

export default function HomePage({ onNavigate }) {
  const revealRef = useReveal()

  return (
    <main ref={revealRef}>
      <Hero onNavigate={onNavigate} />

      {/* sliding marquee strip */}
      <div className="marquee">
        <div className="marquee__track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <span key={copy} className="marquee__set">
              {MARQUEE_WORDS.map((word) => (
                <span key={word} className="marquee__word">
                  <span className="marquee__dot">&#10022;</span> {word}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* welcome / intro */}
      <section className="welcome">
        <div className="wrap split">
          <div className="photo reveal">
            <span className="pc">T</span>
            <span className="pl">T training a client</span>
          </div>
          <div className="welcome__copy">
            <span className="eyebrow reveal">Welcome</span>
            <h2 className="display reveal d1">Coaching that meets <em>you</em> where you are</h2>
            <p className="reveal d2">
              No intimidation, no jargon, no judgement. Whether you're stepping into a gym for
              the first time, rebuilding after a break, or chasing a specific goal — we start
              from where you are and build something that fits your life.
            </p>
            <p className="reveal d2">
              My clients are women and men, younger and older, complete beginners and returners.
              What they share is the want to feel stronger, more capable and more at home in
              their own body.
            </p>
            <button className="btn btn-ghost reveal d3" onClick={() => onNavigate('about')}>
              My story <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* what I stand for — creed band */}
      <Creed heading={<>Four words I <em>coach by</em></>} />

      {/* coaching options */}
      <section className="coaching">
        <div className="wrap">
          <div className="coaching__head">
            <span className="eyebrow center reveal">Coaching</span>
            <h2 className="display reveal d1">Find your <em>starting point</em></h2>
          </div>
          <div className="coaching__grid">
            {TIERS.map((tier, i) => (
              <ServiceCard
                key={tier.name}
                {...tier}
                delay={i}
                ctaLabel="Book a taster"
                onCta={() => onNavigate('book')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* featured testimonial */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testimonials__head">
            <span className="eyebrow center reveal">Testimonials</span>
          </div>
          <div className="reveal d1">
            <Testimonial
              quote="The best PT ever!! Thank you for getting me across the finish line of my first half marathon and rehabbing me through injury. I'm very excited for this next phase of our training and the PBs I'll collect along the way!"
              author="A Fitt With T client"
            />
          </div>
          <p className="note reveal d2">More reviews join here as clients finish their programmes.</p>
        </div>
      </section>

      {/* closing CTA band */}
      <section>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2 className="display">Your first session is <em>free</em></h2>
            <p>
              Fill in a short intake form, pick a time, and let's see if we're a fit.
              No pressure, no commitment — just a conversation and a workout.
            </p>
            <button className="btn btn-dark" onClick={() => onNavigate('book')}>
              Book your free taster <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
