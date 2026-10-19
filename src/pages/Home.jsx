import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import RollingNumber from '../components/RollingNumber.jsx'
import { hero, homeIntro, teasers } from '../data/content.js'

/* Uses the cut-out car when it exists, otherwise the full photograph. */
function useCutout(src) {
  const [found, setFound] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setFound(true)
    img.onerror = () => setFound(false)
    img.src = src
  }, [src])

  return found
}

export default function Home() {
  const cut = useCutout('/photos/car.webp')

  return (
    <div className="page">
      <section className="hero">
        <div className="hero__aura" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />

        <div className="hero__inner">
          <div className="hero__badge">
            <b>{hero.badge}</b>
            <span>{hero.years}</span>
          </div>

          <h1 className="hero__title">{hero.chassis}</h1>

          <div className="hero__sub">Перша M5 з V8</div>

          <p className="hero__lede">{hero.lede}</p>

          <div className={`hero__car ${cut ? 'hero__car--cut' : 'hero__car--photo'}`}>
            <img
              src={cut ? '/photos/car.webp' : '/photos/1.jpg'}
              alt="BMW M5 E39 у кольорі Le Mans Blue, вигляд збоку"
            />
            {cut && <div className="hero__shadow" aria-hidden="true" />}
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <i />
          Гортайте
        </div>
      </section>

      <section className="band on-dark">
        <div className="shell">
          <ul className="figures">
            {hero.figures.map((f, i) => (
              <Reveal as="li" className="figure" key={f.unit + f.value} delay={i * 90}>
                <div className="figure__value">
                  <RollingNumber value={f.value} />
                </div>
                <div className="figure__unit">{f.unit}</div>
                <div className="figure__note">{f.note}</div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section on-light">
        <div className="shell">
          <Reveal>
            <h2 className="h1">{homeIntro.title}</h2>
          </Reveal>
          <Reveal className="prose" delay={120} style={{ marginTop: '1.6rem' }}>
            <p>{homeIntro.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="section on-dark">
        <div className="shell">
          <Reveal>
            <h2 className="h2">Далі</h2>
          </Reveal>

          <div className="teasers" style={{ marginTop: '2.6rem' }}>
            {teasers.map((t, i) => (
              <Reveal key={t.title} delay={i * 120}>
                <Link to={t.to} className="teaser">
                  <div className="teaser__media">
                    <img src={t.photo} alt={t.alt} loading="lazy" />
                  </div>
                  <div className="kicker">{t.eyebrow}</div>
                  <h3 className="teaser__title">{t.title}</h3>
                  <p className="teaser__body">{t.body}</p>
                  <div className="teaser__more">Читати</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
