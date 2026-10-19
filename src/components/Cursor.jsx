import { useEffect, useRef } from 'react'

const HOT = 'a, button, [role="button"], [data-cursor]'

export default function Cursor() {
  const root = useRef(null)

  useEffect(() => {
    // Pointer devices only — a touch screen keeps its own behaviour.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const el = root.current
    if (!el) return

    document.documentElement.classList.add('has-cursor')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduce ? 1 : 0.2

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf = 0

    const tick = () => {
      x += (tx - x) * ease
      y += (ty - y) * ease
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      el.classList.remove('is-gone')
    }

    const onOver = (e) => {
      const hot = e.target instanceof Element && e.target.closest(HOT)
      el.classList.toggle('is-hot', Boolean(hot))
    }

    const onLeave = () => el.classList.add('is-gone')
    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="cursor is-gone" ref={root} aria-hidden="true">
      <span className="cursor__ring" />
    </div>
  )
}
