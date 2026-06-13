import { useEffect, useState } from 'react'
import logo from '../assets/logo-transparent.png'
import './IntroLogo.css'

/* One-time intro: the logo fades up big and centred, holds long enough to
   read, then fades out as the espresso overlay dissolves into the home hero.
   Plays once per browser session; skipped under prefers-reduced-motion. */
export default function IntroLogo({ onDone }) {
  const skip =
    sessionStorage.getItem('introPlayed') === '1' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [gone, setGone] = useState(skip)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (skip) {
      onDone?.()
      return
    }
    document.body.classList.add('intro-active')
    return () => document.body.classList.remove('intro-active')
  }, [skip, onDone])

  if (gone) return null

  /* logo has finished fade-in -> hold -> fade-out: hand off to the page
     (reveal hero + nav logo) and dissolve the overlay away */
  function handleLogoEnd() {
    sessionStorage.setItem('introPlayed', '1')
    document.body.classList.remove('intro-active')
    onDone?.()
    setFading(true)
  }

  return (
    <div
      className={`intro${fading ? ' intro--fading' : ''}`}
      aria-hidden="true"
      onTransitionEnd={() => setGone(true)}
    >
      <img
        className="intro__logo"
        src={logo}
        alt=""
        onAnimationEnd={handleLogoEnd}
      />
    </div>
  )
}
