import './Creed.css'

/* The four-word creed band — Faith · Intention · Tenacity · Testimonials.
   Pillar copy can be overridden per page; defaults to the home concept's. */
const HOME_PILLARS = [
  { n: 'i.', title: 'Faith', body: 'Believe in the person you are becoming. Keep your “why” at the heart of your journey.' },
  { n: 'ii.', title: 'Intention', body: 'Every session has direction. Thoughtfully designed to help you progress, with every rep taking you one step closer to your goals.' },
  { n: 'iii.', title: 'Tenacity', body: 'Real change takes grit and determination. I keep you consistent and accountable when motivation runs thin.' },
  { n: 'iv.', title: 'Testimonials', body: 'Real people. Real journeys. Real results. The experiences of our clients speak for the impact of training with purpose, consistency, and intention.' },
]

export default function Creed({ eyebrow = 'What I Stand For', heading, pillars = HOME_PILLARS }) {
  return (
    <section className="creed">
      <div className="wrap">
        <div className="creed-head">
          <span className="eyebrow center reveal">{eyebrow}</span>
          <h2 className="display reveal d1">{heading}</h2>
        </div>
        <div className="creed-grid">
          {pillars.map((p, i) => (
            <div key={p.title} className={`creed-item reveal${i ? ` d${i}` : ''}`}>
              <div className="creed-item__n">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
