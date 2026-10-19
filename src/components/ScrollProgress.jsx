import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollProgress() {
  const fill = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const el = fill.current
    if (!el) return

    let raf = 0

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 8 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleY(${p.toFixed(4)})`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Page height changes as images settle, so keep the scale honest.
    const ro = new ResizeObserver(onScroll)
    ro.observe(document.body)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      ro.disconnect()
    }
  }, [pathname])

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress__fill" ref={fill} />
    </div>
  )
}
