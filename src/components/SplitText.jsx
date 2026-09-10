import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP)

/* Reusable letter/word/line reveal built on GSAP SplitText.
   - trigger="scroll" (default): animates when scrolled into view (headings).
   - trigger="load": animates on mount (used by the intro overlay, which is
     already in view). `startDelay` (seconds) lets callers cascade several
     instances. Respects prefers-reduced-motion by rendering the text plainly. */
const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  trigger = 'scroll',
  startDelay = 0,
  onLetterAnimationComplete
}) => {
  const ref = useRef(null)
  const animationCompletedRef = useRef(false)
  const onCompleteRef = useRef(onLetterAnimationComplete)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete
  }, [onLetterAnimationComplete])

  useEffect(() => {
    if (document.fonts.status === 'loaded') setFontsLoaded(true)
    else document.fonts.ready.then(() => setFontsLoaded(true))
  }, [])

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return
      if (animationCompletedRef.current) return

      const el = ref.current
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (el._rbsplitInstance) {
        try { el._rbsplitInstance.revert() } catch (_) { /* noop */ }
        el._rbsplitInstance = null
      }

      /* reduced motion: no split, no motion — just show the text and report done */
      if (reduced) {
        gsap.set(el, { opacity: 1 })
        animationCompletedRef.current = true
        onCompleteRef.current?.()
        return
      }

      const scrollTrigger =
        trigger === 'scroll'
          ? (() => {
              const startPct = (1 - threshold) * 100
              const m = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
              const val = m ? parseFloat(m[1]) : 0
              const unit = m ? m[2] || 'px' : 'px'
              const sign = val === 0 ? '' : val < 0 ? `-=${Math.abs(val)}${unit}` : `+=${val}${unit}`
              return { trigger: el, start: `top ${startPct}%${sign}`, once: true, fastScrollEnd: true, anticipatePin: 0.4 }
            })()
          : undefined

      let targets
      const assignTargets = self => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines
        if (!targets) targets = self.chars || self.words || self.lines
      }

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self)
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              delay: startDelay,
              stagger: delay / 1000,
              ...(scrollTrigger ? { scrollTrigger } : {}),
              onComplete: () => {
                animationCompletedRef.current = true
                onCompleteRef.current?.()
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          )
        }
      })

      el._rbsplitInstance = splitInstance

      return () => {
        ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill() })
        try { splitInstance.revert() } catch (_) { /* noop */ }
        el._rbsplitInstance = null
      }
    },
    {
      dependencies: [
        text, delay, duration, ease, splitType,
        JSON.stringify(from), JSON.stringify(to),
        threshold, rootMargin, trigger, startDelay, fontsLoaded
      ],
      scope: ref
    }
  )

  const Tag = tag || 'p'
  return (
    <Tag
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        willChange: 'transform, opacity'
      }}
    >
      {text}
    </Tag>
  )
}

export default SplitText
