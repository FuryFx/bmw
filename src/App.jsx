import { useCallback, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'

import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Home from './pages/Home.jsx'
import Model from './pages/Model.jsx'
import Journal from './pages/Journal.jsx'
import { ASSETS } from './data/content.js'
import { useAssetLoader } from './hooks/useAssetLoader.js'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function Site() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<Model />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  // Long enough for the opening plaque animation to finish playing.
  const { progress, ready } = useAssetLoader(ASSETS, { minDuration: 2600 })
  const [cleared, setCleared] = useState(false)

  const onDone = useCallback(() => setCleared(true), [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', !cleared)
    document.documentElement.classList.toggle('is-ready', cleared)
    return () => document.body.classList.remove('is-locked')
  }, [cleared])

  return (
    <HashRouter>
      {!cleared && <Preloader progress={progress} ready={ready} onDone={onDone} />}
      <Cursor />
      <Site />
    </HashRouter>
  )
}
