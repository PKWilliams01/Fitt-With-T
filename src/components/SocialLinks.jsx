import { SOCIAL_PLATFORMS } from '../data/socials'
import './SocialLinks.css'

const InstagramIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)
const TikTokIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M16.5 3c.36 2.3 1.9 3.94 4.5 4.1v2.93c-1.46 0-2.84-.45-4.02-1.23v6.07c0 3.5-2.84 6.13-6.24 6.13C7.84 21 5 18.5 5 15.43c0-3.16 2.62-5.7 5.86-5.55v3.02c-.3-.1-.62-.15-.96-.15-1.46 0-2.64 1.2-2.64 2.68s1.18 2.68 2.64 2.68c1.5 0 2.72-1.18 2.72-2.78V3h1.88z" />
  </svg>
)
const ICONS = { Instagram: InstagramIcon, TikTok: TikTokIcon }

/* Reusable social links. One job: render Instagram / TikTok.
   When a platform has no confirmed href yet, it renders as a clearly
   labelled, non-navigating placeholder (so nothing points to a dead or wrong
   account). As soon as a real href is supplied it becomes a proper,
   focusable link with no other change. */
export default function SocialLinks({ items = SOCIAL_PLATFORMS }) {
  return (
    <ul className="social-links">
      {items.map(({ label, href }) => (
        <li key={label} className="social-links__item">
          {href ? (
            <a
              className="social-links__link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
            >
              <span className="social-links__icon" aria-hidden="true">{ICONS[label]}</span>
              {label}
            </a>
          ) : (
            <span
              className="social-links__link social-links__link--soon"
              aria-label={`${label} — handle coming soon`}
            >
              <span className="social-links__icon" aria-hidden="true">{ICONS[label]}</span>
              {label}
              <span className="social-links__soon">soon</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
