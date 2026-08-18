import Testimonial from './Testimonial'
import './TestimonialMarquee.css'

const MIN_FOR_MARQUEE = 4

function initials(name) {
  const letters = name.match(/\b[A-Za-z]/g)
  return letters ? letters.slice(0, 2).join('').toUpperCase() : '✦'
}

function MarqueeCard({ name, credit, quote }) {
  return (
    <figure className="tmq-card">
      <blockquote className="tmq-card__quote">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="tmq-card__who">
        <span className="tmq-card__avatar" aria-hidden="true">{initials(name)}</span>
        <span className="tmq-card__id">
          <b>{name}</b>
          {credit && <small>{credit}</small>}
        </span>
      </figcaption>
    </figure>
  )
}

function MarqueeRow({ items, reverse }) {
  return (
    <div className={`tmq-row${reverse ? ' tmq-row--reverse' : ''}`}>
      <div className="tmq-track">
        <ul className="tmq-group">
          {items.map((t, i) => (
            <li className="tmq-item" key={`${t.name}-${i}`}><MarqueeCard {...t} /></li>
          ))}
        </ul>
        {/* duplicate purely for the seamless loop — not real content */}
        <ul className="tmq-group" aria-hidden="true">
          {items.map((t, i) => (
            <li className="tmq-item" key={`d-${t.name}-${i}`}><MarqueeCard {...t} /></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* Scrolling wall of client reviews. Only activates once there are enough
   real testimonials to look intentional (4+) — otherwise it falls back to
   the existing single-featured Testimonial layout, which also reads fine
   for 2-3 since it's a centred, wrapping list. Never renders demo content:
   an empty array renders nothing. */
export default function TestimonialMarquee({ testimonials = [] }) {
  if (testimonials.length === 0) return null

  if (testimonials.length < MIN_FOR_MARQUEE) {
    return (
      <>
        {testimonials.map((t, i) => (
          <Testimonial key={`${t.name}-${i}`} quote={t.quote} author={t.name} role={t.credit} />
        ))}
      </>
    )
  }

  const mid = Math.ceil(testimonials.length / 2)
  return (
    <div className="tmq" aria-label="Client testimonials">
      <div className="tmq-viewport">
        <MarqueeRow items={testimonials.slice(0, mid)} />
        <MarqueeRow items={testimonials.slice(mid)} reverse />
      </div>
    </div>
  )
}
