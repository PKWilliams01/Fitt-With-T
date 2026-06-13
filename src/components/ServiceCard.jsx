import './ServiceCard.css'

/* A single coaching tier card. NO prices (per brief). The CTA target and
   label are passed in so the card never owns routing. */
export default function ServiceCard({
  name,
  freq,
  desc,
  includes = [],
  featured = false,
  ribbon,
  ctaLabel = 'Book a taster',
  ctaVariant = 'ghost',
  onCta,
  delay = 0,
}) {
  return (
    <article className={`service-card reveal${delay ? ` d${delay}` : ''}${featured ? ' service-card--featured' : ''}`}>
      {ribbon && <span className="service-card__ribbon">{ribbon}</span>}
      <h3 className="service-card__name">{name}</h3>
      <p className="service-card__freq">{freq}</p>
      <p className="service-card__desc">{desc}</p>
      <ul className="service-card__incl">
        {includes.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <button className={`btn btn-${ctaVariant} service-card__cta`} onClick={onCta}>
        {ctaLabel} <span aria-hidden="true">&rarr;</span>
      </button>
    </article>
  )
}
