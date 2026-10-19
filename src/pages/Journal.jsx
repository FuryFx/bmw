import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Reveal from '../components/Reveal.jsx'
import { journalIntro, posts } from '../data/content.js'

function Article({ post, onClose }) {
  useEffect(() => {
    document.body.classList.add('is-locked')
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className="article"
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button className="article__close" onClick={onClose} autoFocus>
        Закрити
      </button>

      <div className="article__sheet">
        <div className="article__media">
          <img src={post.photo} alt={post.alt} />
        </div>

        <div className="article__body">
          <div className="post__meta">
            <span>{post.date}</span>
            <span>{post.read}</span>
          </div>

          <h2 className="article__title">{post.title}</h2>

          <div className="article__text">
            {post.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Journal() {
  const [open, setOpen] = useState(null)

  return (
    <div className="page">
      <section className="section on-deep">
        <div className="shell">
          <Reveal>
            <h1 className="display">{journalIntro.title}</h1>
          </Reveal>
          <Reveal className="lead" delay={140} style={{ marginTop: '1.6rem' }}>
            {journalIntro.body}
          </Reveal>
        </div>
      </section>

      <section className="section on-dark">
        <div className="shell">
          <div className="posts">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 2) * 120}>
                <button className="post" onClick={() => setOpen(post)}>
                  <div className="post__media">
                    <img src={post.photo} alt={post.alt} loading="lazy" />
                  </div>

                  <div className="post__body">
                    <div className="post__meta">
                      <span>{post.date}</span>
                      <span>{post.read}</span>
                    </div>
                    <h2 className="post__title">{post.title}</h2>
                    <p className="post__excerpt">{post.excerpt}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {open && <Article post={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
