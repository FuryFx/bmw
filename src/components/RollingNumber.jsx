import { useEffect, useRef, useState } from 'react'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
/* Three passes of 0—9 so each digit spins twice before it settles. */
const CYCLES = 3
const STOPS = DIGITS.length * CYCLES

export default function RollingNumber({ value, stagger = 90, duration = 1700 }) {
  const ref = useRef(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRun(true)
      return
    }

    let cancelled = false

    // Wait for the curtain as well as the scroll, so the count is never
    // spent behind the preloader.
    const start = () => {
      if (cancelled) return
      if (document.documentElement.classList.contains('is-ready')) setRun(true)
      else requestAnimationFrame(start)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect()
          start()
        }
      },
      { threshold: 0.35 }
    )

    io.observe(el)

    // Fallback for the case where the element is already on screen and the
    // observer does not deliver: measure once the curtain is up.
    const check = setTimeout(() => {
      const box = el.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) {
        io.disconnect()
        start()
      }
    }, 600)

    return () => {
      cancelled = true
      clearTimeout(check)
      io.disconnect()
    }
  }, [])

  const chars = String(value).split('')

  return (
    <span className="roll" ref={ref} aria-label={String(value)}>
      {chars.map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span className="roll__sep" key={i} aria-hidden="true">
              {ch === ' ' ? ' ' : ch}
            </span>
          )
        }

        const stop = DIGITS.length * (CYCLES - 1) + Number(ch)

        return (
          <span className="roll__slot" key={i} aria-hidden="true">
            <span
              className="roll__col"
              style={{
                transform: run ? `translateY(-${(stop * 100) / STOPS}%)` : 'translateY(0)',
                transitionDuration: `${duration}ms`,
                transitionDelay: `${i * stagger}ms`
              }}
            >
              {Array.from({ length: CYCLES }, (_, c) =>
                DIGITS.map((d) => (
                  <span className="roll__d" key={`${c}-${d}`}>
                    {d}
                  </span>
                ))
              )}
            </span>
          </span>
        )
      })}
    </span>
  )
}
