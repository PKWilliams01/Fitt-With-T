import useReveal from '../hooks/useReveal'
import ServiceCard from '../components/ServiceCard'
import './Services.css'

/* Coaching tiers — copy taken verbatim from the approved concept
   (fitt-with-t-FINAL.html #page-packages). No prices anywhere. */
const TIERS = [
  {
    name: 'Faith Starter',
    freq: '1 session / week',
    desc: "The perfect first step into training. We build the fundamentals — movement, confidence, and a routine that sticks. Ideal if you're new or returning after time away.",
    includes: [
      'One 1:1 coaching session each week',
      'A plan built around your goals & life',
      'Form & technique coaching',
      'Friendly, no-judgement support',
    ],
    featured: true,
    ribbon: 'Start here',
    ctaVariant: 'primary',
  },
  {
    name: 'Intentional Progress',
    freq: '2 sessions / week',
    desc: "For when you're ready to commit properly. Twice-weekly sessions and a structured plan mean faster, more visible progress towards your goals.",
    includes: [
      'Two 1:1 sessions each week',
      'Structured, progressive programme',
      'Regular check-ins & accountability',
      'Guidance between sessions',
    ],
    ctaVariant: 'ghost',
  },
  {
    name: 'Tenacity Elite',
    freq: '3 sessions / week',
    desc: 'The full commitment. Maximum coaching, accountability and momentum for those chasing serious, lasting transformation.',
    includes: [
      'Three 1:1 sessions each week',
      'Fully tailored programme',
      'Priority scheduling',
      'Closest support & accountability',
    ],
    ctaVariant: 'ghost',
  },
]

export default function ServicesPage({ onNavigate }) {
  const revealRef = useReveal()

  return (
    <main className="services-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Coaching</span>
          <h1 className="display reveal d1">Ways to <em>train together</em></h1>
          <p className="reveal d2">
            Every journey starts with a free taster so we know it's the right fit.
            We'll talk through the plan and pricing that suits you once you're ready —
            no pressure upfront.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="services-grid">
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
          <p className="note">
            Pricing is discussed after your taster, once we know it's the right fit —
            package inclusions are examples to confirm.
          </p>
        </div>
      </section>
    </main>
  )
}
