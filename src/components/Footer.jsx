import { Link } from 'react-router-dom'
import { nav } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p className="footer__name">Oleksandr Storchak</p>

        <div className="footer__links">
          {nav.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
