import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Creed from '../components/Creed'
import ServiceCard from '../components/ServiceCard'
import Testimonial from '../components/Testimonial'
import SocialLinks from '../components/SocialLinks'
import useReveal from '../hooks/useReveal'
import './Home.css'

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

export default function HomePage({ onNavigate, introActive }) {
  const revealRef = useReveal()

  return (
    <main ref={revealRef}>
      <Hero onNavigate={onNavigate} introActive={introActive} />

      {/* sliding marquee strip */}
      <Marquee onNavigate={onNavigate} />

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
            <p className="lead reveal d2">No intimidation. No jargon. No judgement.</p>
            <p className="reveal d2">
              Whether it&rsquo;s your first time in the gym, a fresh start after time away, or a
              step towards a specific goal, you&rsquo;ll be met exactly where you are and guided
              towards where you want to be.
            </p>
            <p className="reveal d2">
              My clients come from all walks of life &mdash; women and men, young and older,
              complete beginners and those returning to their fitness journey. What connects them
              all is a shared desire to feel stronger, more capable, and truly confident in their
              own bodies.
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

      {/* follow along — dedicated social section */}
      <section className="social">
        <div className="wrap social__inner">
          <span className="eyebrow center reveal">Social</span>
          <h2 className="display reveal d1">Follow <em>along</em></h2>
          <p className="reveal d2">Day-to-day coaching, client wins and a little motivation.</p>
          <div className="social__links reveal d2">
            <SocialLinks />
          </div>
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
