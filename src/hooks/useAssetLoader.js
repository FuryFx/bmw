import { useEffect, useRef, useState } from 'react'

/** The curtain lifts no later than this, whatever the network does. */
const WATCHDOG_MS = 12000

/**
 * Loads the site's images and reports real byte progress, so the preloader
 * shows how much is actually left rather than running a decorative timer.
 * Falls back to plain image loading when streaming isn't available.
 */
export function useAssetLoader(assets, { minDuration = 1400 } = {}) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const startedAt = useRef(Date.now())

  useEffect(() => {
    let alive = true
    let settled = false

    const loaded = new Array(assets.length).fill(0)
    const totals = new Array(assets.length).fill(0)

    const report = () => {
      if (!alive) return
      const total = totals.reduce((a, b) => a + b, 0)
      const done = loaded.reduce((a, b) => a + b, 0)
      const value = total > 0 ? done / total : 0
      setProgress((prev) => (value > prev ? value : prev))
    }

    const viaImage = (asset, i) =>
      new Promise((resolve) => {
        const img = new Image()
        const done = () => {
          totals[i] = totals[i] || 1
          loaded[i] = totals[i]
          report()
          resolve()
        }
        img.onload = done
        img.onerror = done
        img.src = asset.src
      })

    const viaStream = async (asset, i) => {
      const res = await fetch(asset.src)
      const length = Number(res.headers.get('content-length'))
      if (!res.ok || !res.body || !length) throw new Error('no-stream')

      totals[i] = length
      const reader = res.body.getReader()

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        loaded[i] += value.length
        report()
      }

      // Warm the decode, but never await it: decode() on a detached image can
      // stay pending forever in Chromium, which would stall the whole curtain.
      const warm = new Image()
      warm.src = asset.src
    }

    const finish = () => {
      if (!alive || settled) return
      settled = true
      setProgress(1)

      const wait = Math.max(0, minDuration - (Date.now() - startedAt.current))
      setTimeout(() => alive && setReady(true), wait)
    }

    const watchdog = setTimeout(finish, WATCHDOG_MS)

    Promise.all(
      assets.map(async (asset, i) => {
        try {
          await viaStream(asset, i)
        } catch {
          await viaImage(asset, i)
        }
      })
    ).finally(() => {
      clearTimeout(watchdog)
      finish()
    })

    return () => {
      alive = false
      clearTimeout(watchdog)
    }
  }, [assets, minDuration])

  return { progress, ready }
}
