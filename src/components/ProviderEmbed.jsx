import { useState } from 'react'
import { isConfigured } from '../config/provider'
import './ProviderEmbed.css'

/* Hosts a single external provider embed (booking / intake).
   One responsibility: render someone else's embed responsively. It NEVER
   inspects, reads or stores anything inside the iframe — no postMessage
   listener, no contentWindow access. Its only state is the frame's own
   load status.

   Until a real https embed URL is configured it renders `children`, so the
   host page owns the "not connected yet" message and its fallback. */
export default function ProviderEmbed({ title, src, children }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (!isConfigured(src)) return children

  return (
    <div className="embed">
      <div className="embed__frame">
        {!loaded && !failed && (
          <p className="embed__loading" role="status">Loading the secure form…</p>
        )}
        <iframe
          className="embed__iframe"
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>

      {/* always available, so it still works if the embed silently fails */}
      <p className="embed__fallback">
        Trouble loading?{' '}
        <a href={src} target="_blank" rel="noopener noreferrer">Open the secure form</a>
        <span aria-hidden="true"> ↗</span>
      </p>
    </div>
  )
}
