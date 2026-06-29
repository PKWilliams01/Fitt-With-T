import './Marquee.css'

const PHRASES = [
  'Strength', 'Confidence', 'Fat Loss', 'Mobility',
  'Beginners Welcome', 'All Levels', 'Faith-Driven',
]

/* The phrases are coaching outcomes, so each one is a quiet shortcut into
   the Coaching page — a scannable, low-pressure path for a curious visitor.
   `dim` renders the loop-duplicate set: aria-hidden + non-focusable so it
   doesn't create double tab-stops or repeat for screen readers. */
function Group({ onNavigate, dim = false }) {
  return (
    <ul className="mq__group" {...(dim ? { 'aria-hidden': 'true' } : {})}>
      {PHRASES.map((p) => (
        <li className="mq__item" key={`${dim ? 'd-' : ''}${p}`}>
          <button
            type="button"
            className="mq__link"
            onClick={() => onNavigate?.('packages')}
            tabIndex={dim ? -1 : undefined}
          >
            {p}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function Marquee({ onNavigate }) {
  return (
    <section className="mq" aria-label="Explore coaching">
      <div className="mq__viewport">
        <div className="mq__track">
          <Group onNavigate={onNavigate} />
          <Group onNavigate={onNavigate} dim />
        </div>
      </div>
    </section>
  )
}
