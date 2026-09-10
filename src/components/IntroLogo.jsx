import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo-transparent.png'
import './IntroLogo.css'

/* One-time intro: the logo rises + fades in (CSS, ease-out — the same motion
   feel used elsewhere), holds long enough to read, then the espresso overlay
   dissolves into the home hero. Plays once per browser session; skipped under
   prefers-reduced-motion. */
const HOLD = 2300 // reveal + hold before the overlay dissolves

export default function IntroLogo({ onDone }) {
  const skip =
    sessionStorage.getItem('introPlayed') === '1' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [gone, setGone] = useState(skip)
  const [fading, setFading] = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (skip) {
      onDoneRef.current?.()
      return
    }
    document.body.classList.add('intro-active')
    const toFinish = setTimeout(() => {
      sessionStorage.setItem('introPlayed', '1')
      document.body.classList.remove('intro-active')
      onDoneRef.current?.()
      setFading(true)
    }, HOLD)
    return () => {
      clearTimeout(toFinish)
      document.body.classList.remove('intro-active')
    }
  }, [skip])

  if (gone) return null

  return (
    <div
      className={`intro${fading ? ' intro--fading' : ''}`}
      aria-hidden="true"
      onTransitionEnd={(e) => {
        if (fading && e.propertyName === 'opacity') setGone(true)
      }}
    >
      <img className="intro__logo" src={logo} alt="" />
    </div>
  )
}
