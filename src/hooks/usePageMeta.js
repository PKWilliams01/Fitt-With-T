import { useEffect } from 'react'

/* Per-page <title> and <meta name="description">. The site uses state-based
   routing (no router), so head tags are set imperatively when a page mounts or
   its text changes. Reusable on every page: call usePageMeta(title, desc) at
   the top of the page component. index.html carries a static default for
   crawlers that don't run JS. */
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
