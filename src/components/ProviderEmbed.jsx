import { useState } from 'react'
import { isConfigured } from '../config/provider'
import './ProviderEmbed.css'

/* Hosts a single external provider embed. It NEVER inspects, reads or stores
   anything inside the iframe — no postMessage listener, no contentWindow
   access. Its only state is the load status of the frame itself. */
export default function ProviderEmbed({ title, src }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const ready = isConfigured(src)

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

      {/* always available, so it works even if the embed silently fails */}
      <p className="embed__fallback">
        Trouble loading?{' '}
        <a href={src} target="_blank" rel="noopener noreferrer">Open the secure form</a>
        <span aria-hidden="true"> ↗</span>
      </p>

      {!ready && (
        <p className="embed__caption">
          Placeholder — the live secure form connects here once the provider URL is added.
        </p>
      )}
    </div>
  )
}
