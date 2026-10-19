import { useEffect, useRef } from 'react'

/**
 * Shifts an element inside its frame as it crosses the viewport.
 * Scroll-linked, so the motion always answers the reader's own action.
 */
export function useParallax(strength = 60) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let visible = false

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const mid = rect.top + rect.height / 2
      const ratio = (mid - window.innerHeight / 2) / window.innerHeight
      el.style.setProperty('--shift', `${(-ratio * strength).toFixed(2)}px`)
    }

    const onScroll = () => {
      if (!visible || frame) return
      frame = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) update()
      },
      { rootMargin: '120px' }
    )

    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
