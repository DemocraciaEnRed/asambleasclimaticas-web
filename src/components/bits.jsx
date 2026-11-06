/* eslint-disable @next/next/no-img-element */
import { PAGES, PARTNERS, link, tint } from '@/lib/site'

// A brand illustration cut out of cream paper, tinted through a CSS mask.
export function Cutout({ code, className = '' }) {
  return <span className={`cutout ${className}`} style={tint(code)} aria-hidden="true" />
}

// The brand's call to action: tracked caps between parentheses, like the "(re)" in the logo.
export function Paren({ href, children, light }) {
  return (
    <a className={`paren caps ${light ? 'is-light' : ''}`} href={href}>
      <span aria-hidden="true">(</span>{children}<span aria-hidden="true">)</span>
    </a>
  )
}

export function Partners({ title }) {
  return (
    <section className="partners wrap">
      <h2 className="caps small-title">{title}</h2>
      <ul>
        {PARTNERS.map(([file, name]) => (
          <li key={file}><img src={`/images/logos/${file}.png`} alt={name} loading="lazy" /></li>
        ))}
      </ul>
    </section>
  )
}

export function Footer({ t }) {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <img src={`/images/marca/logo-${t.lang}-crema.png`} alt={t.logoAlt} width="1145" height="449" loading="lazy" />
        <nav aria-label={t.menu}>
          {PAGES.map(([key, path]) => <a key={key} href={link(t.lang, path)}>{t.nav[key]}</a>)}
          <a href={t.pacto.url}>{t.pacto.title}</a>
        </nav>
        <div>
          <p>{t.footer.text}</p>
          <p className="muted">{t.footer.license}</p>
        </div>
      </div>
    </footer>
  )
}

export function Share({ t, url, title }) {
  const u = encodeURIComponent(url)
  const text = encodeURIComponent(title)
  const targets = [
    ['WhatsApp', `https://wa.me/?text=${text}%20${u}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['X', `https://x.com/intent/post?text=${text}&url=${u}`],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
  ]
  return (
    <div className="share">
      <span className="caps">{t.labels.share}</span>
      {targets.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name}</a>)}
    </div>
  )
}

export function ResourceList({ t, items, showAssembly, cities }) {
  return (
    <ul className="resources">
      {items.map((r) => (
        <li key={r.url} style={tint(r.assembly)}>
          <a href={r.url} target="_blank" rel="noopener noreferrer">
            <span className="res-kind caps">{t.libraryPage.types[r.type]}</span>
            <span className="res-title">{r.title}</span>
            <span className="res-meta">
              {showAssembly && <b>{cities[r.assembly] || t.libraryPage.network}</b>}
              {r.source}, {r.lang.toUpperCase()}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
