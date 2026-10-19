import { useEffect, useState } from 'react'

export default function Preloader({ progress, ready, onDone }) {
  const [flash, setFlash] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const pct = Math.round(progress * 100)

  useEffect(() => {
    if (!ready) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers = []

    if (reduce) {
      setLeaving(true)
      timers.push(setTimeout(onDone, 220))
    } else {
      setFlash(true)
      timers.push(setTimeout(() => setLeaving(true), 240))
      timers.push(setTimeout(onDone, 1250))
    }

    return () => timers.forEach(clearTimeout)
  }, [ready, onDone])

  return (
    <div
      className={`preloader ${flash ? 'is-flash' : ''} ${leaving ? 'is-done' : ''}`}
      style={{ '--p': progress }}
      role="status"
      aria-live="polite"
      aria-label={`Завантаження ${pct} відсотків`}
    >
      <div className="preloader__glow" aria-hidden="true" />

      <div className="preloader__inner">
        <div className="preloader__badge">
          <img src="/photos/roundel.png" alt="" />
        </div>

        <div className="preloader__plaque">
          <span className="preloader__fill" aria-hidden="true" />

          <span className="preloader__readout">
            <span className="preloader__word">Завантаження</span>
            <span className="preloader__pct">
              {pct}
              <i>%</i>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
