import { useEffect, useRef } from 'react'

/* Reveal-on-scroll: returns a ref to attach to a container. Every `.reveal`
   inside it gets `.in` added as it scrolls into view. Skipped under
   prefers-reduced-motion, where CSS keeps those elements fully visible. */
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return ref
}
