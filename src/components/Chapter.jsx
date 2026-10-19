import Reveal from './Reveal.jsx'
import { useParallax } from '../hooks/useParallax.js'

export default function Chapter({ chapter, flip }) {
  const media = useParallax(70)

  return (
    <article className={`chapter ${flip ? 'chapter--flip' : ''}`} id={chapter.id}>
      <Reveal className="chapter__media">
        <img ref={media} src={chapter.photo} alt={chapter.alt} loading="lazy" />
      </Reveal>

      <Reveal delay={120}>
        <h3 className="chapter__title">{chapter.title}</h3>
        <p className="chapter__body">{chapter.body}</p>

        <ul className="facts">
          {chapter.facts.map((fact) => (
            <li className="fact" key={fact.value}>
              <div className="fact__value">{fact.value}</div>
              <div className="fact__note">{fact.note}</div>
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  )
}
