import Reveal from '../components/Reveal.jsx'
import Chapter from '../components/Chapter.jsx'
import RollingNumber from '../components/RollingNumber.jsx'
import { history, engine, chapters, interior, specs } from '../data/content.js'

export default function Model() {
  return (
    <div className="page">
      <section className="section on-deep">
        <div className="shell">
          <Reveal>
            <h1 className="display">Модель</h1>
          </Reveal>
          <Reveal className="lead" delay={140} style={{ marginTop: '1.6rem' }}>
            {history.lead}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-bottom on-light">
        <div className="shell">
          <div className="history">
            <Reveal>
              <h2 className="h2">{history.title}</h2>
            </Reveal>

            <Reveal className="history__body prose" delay={120}>
              {history.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>

        </div>
      </section>

      <section className="section section--compact on-light">
        <div className="shell shell--narrow">
          <Reveal>
            <h2 className="h2">Хронологія</h2>
          </Reveal>

          <ul className="timeline">
            {history.timeline.map((t, i) => (
              <li className="timeline__item" key={t.year}>
                <div className="timeline__year">
                  <RollingNumber value={t.year} stagger={70} duration={1500} />
                </div>
                <div className="timeline__text">{t.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section on-deep" id="engine">
        <div className="shell">
          <div className="engine">
            <Reveal className="engine__media">
              <img src={engine.photo} alt={engine.alt} loading="lazy" />
            </Reveal>

            <Reveal delay={120}>
              <div className="kicker">Двигун</div>
              <h2 className="h2" style={{ marginTop: '0.5rem' }}>
                {engine.title}
              </h2>
              <p className="chapter__body">{engine.body}</p>

              <ul className="engine__points">
                {engine.points.map((p) => (
                  <li className="engine__point" key={p.value}>
                    <b>{p.value}</b>
                    <span>{p.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--stack on-dark">
        <div className="shell">
          {chapters.map((chapter, i) => (
            <Chapter key={chapter.id} chapter={chapter} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="section on-deep" id="interior">
        <div className="shell">
          <Reveal>
            <h2 className="h2">{interior.title}</h2>
          </Reveal>

          <Reveal className="prose" delay={110} style={{ marginTop: '1.2rem' }}>
            <p>{interior.body}</p>
          </Reveal>

          <div className="interior">
            <Reveal className="interior__shot" delay={160}>
              <img src={interior.wide.photo} alt={interior.wide.alt} loading="lazy" />
            </Reveal>

            <Reveal className="interior__shot interior__shot--tight" delay={260}>
              <img src={interior.tight.photo} alt={interior.tight.alt} loading="lazy" />
            </Reveal>
          </div>

          <div className="interior__below">
            <Reveal delay={120}>
              <p className="interior__caption">{interior.caption}</p>
            </Reveal>

            <Reveal as="ul" className="facts facts--row" delay={200}>
              {interior.facts.map((fact) => (
                <li className="fact" key={fact.value}>
                  <div className="fact__value">{fact.value}</div>
                  <div className="fact__note">{fact.note}</div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--top on-light" id="specs">
        <div className="shell">
          <Reveal>
            <h2 className="h2">Характеристики</h2>
          </Reveal>

          <div className="specs" style={{ marginTop: '1.6rem' }}>
            {specs.map((s) => (
              <div className="spec" key={s.label}>
                <span className="spec__label">{s.label}</span>
                <span className="spec__value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
