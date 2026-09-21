import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'
import { TESTIMONIALS } from '../data/testimonials'
import './Carousel.css'

/* Draggable testimonial carousel (adapted from a react-bits carousel, re-skinned
   to the brand). Each card shows a client quote + name; cards rotate slightly in
   3D as you drag/advance. Keyboard + indicator navigation, optional autoplay. */
const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 }

function CarouselItem({ item, index, itemWidth, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset]
  const rotateY = useTransform(x, range, [58, 0, -58], { clamp: false })

  return (
    <motion.div
      className="tcard"
      style={{ width: itemWidth, height: '100%', rotateY }}
      transition={transition}
    >
      <span className="tcard__mark" aria-hidden="true">&rdquo;</span>
      <blockquote className="tcard__quote">{item.quote}</blockquote>
      <figcaption className="tcard__author">
        <span className="tcard__avatar" aria-hidden="true">{item.name.trim().charAt(0)}</span>
        <span className="tcard__name">{item.name}</span>
      </figcaption>
    </motion.div>
  )
}

export default function Carousel({
  items = TESTIMONIALS,
  baseWidth = 460,
  autoplay = false,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true
}) {
  /* responsive width: use baseWidth on wide screens, shrink to fit on narrow
     ones so the card never overflows the viewport */
  const [effectiveWidth, setEffectiveWidth] = useState(() =>
    typeof window === 'undefined' ? baseWidth : Math.min(baseWidth, window.innerWidth - 32)
  )
  useEffect(() => {
    const onResize = () => setEffectiveWidth(Math.min(baseWidth, window.innerWidth - 32))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [baseWidth])

  const containerPadding = 16
  const itemWidth = effectiveWidth - containerPadding * 2
  const trackItemOffset = itemWidth + GAP

  const itemsForRender = useMemo(() => {
    if (!loop) return items
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const containerRef = useRef(null)
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current
      const onEnter = () => setIsHovered(true)
      const onLeave = () => setIsHovered(false)
      container.addEventListener('mouseenter', onEnter)
      container.addEventListener('mouseleave', onLeave)
      return () => {
        container.removeEventListener('mouseenter', onEnter)
        container.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [pauseOnHover])

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined
    if (pauseOnHover && isHovered) return undefined
    const timer = setInterval(() => {
      setPosition(prev => prev + 1)
    }, autoplayDelay)
    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length])

  useEffect(() => {
    const start = loop ? 1 : 0
    setPosition(start)
    x.set(-start * trackItemOffset)
  }, [items.length, loop, trackItemOffset, x])

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1))
    }
  }, [itemsForRender.length, loop, position])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false)
      return
    }
    const lastCloneIndex = itemsForRender.length - 1
    if (position === lastCloneIndex) {
      setIsJumping(true)
      setPosition(1)
      x.set(-1 * trackItemOffset)
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false) })
      return
    }
    if (position === 0) {
      setIsJumping(true)
      setPosition(items.length)
      x.set(-items.length * trackItemOffset)
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false) })
      return
    }
    setIsAnimating(false)
  }

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0
    if (direction === 0) return
    setPosition(prev => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return Math.max(0, Math.min(next, max))
    })
  }

  const dragProps = loop
    ? {}
    : { dragConstraints: { left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0), right: 0 } }

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1)

  return (
    <div
      ref={containerRef}
      className="carousel-container"
      style={{ width: `${effectiveWidth}px` }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <motion.div
        className="carousel-track"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.name ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className="carousel-indicators-container">
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={activeIndex === index}
              animate={{ scale: activeIndex === index ? 1.25 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
