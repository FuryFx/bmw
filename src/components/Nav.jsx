import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { nav } from '../data/content.js'

export default function Nav() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${stuck ? 'is-stuck' : ''}`}>
      <div className="nav__inner">
        <NavLink to="/" className="nav__mark">
          BMW M5 <span>E39</span>
        </NavLink>

        <nav className="nav__links" aria-label="Розділи сайту">
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={{ '--d': `${100 + i * 70}ms` }}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
