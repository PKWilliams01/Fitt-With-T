import './Testimonial.css'

/* Featured client quote. Name / role / stars are optional so unconfirmed
   details aren't fabricated — fill them in here once the client shares them. */
export default function Testimonial({ quote, author, role, stars, initial = '\u2726' }) {
  return (
    <figure className="testimonial">
      <div className="testimonial__mark" aria-hidden="true">&rdquo;</div>
      {stars > 0 && (
        <div className="testimonial__stars" aria-label={`Rated ${stars} out of 5`}>
          {'\u2605'.repeat(stars)}
        </div>
      )}
      <blockquote className="testimonial__quote">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="testimonial__who">
        <span className="testimonial__avatar" aria-hidden="true">{initial}</span>
        <span className="testimonial__id">
          <b>{author}</b>
          {role && <small>{role}</small>}
        </span>
      </figcaption>
    </figure>
  )
}
