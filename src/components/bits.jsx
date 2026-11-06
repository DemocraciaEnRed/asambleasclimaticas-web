/* eslint-disable @next/next/no-img-element */
import { CONSORTIUM, PAGES, PARTNERS, link, tint } from '@/lib/site'
import Logo from './Logo'

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

// Institutional footer: the consortium's logos and sites, as the brief asks.
export function Footer({ t }) {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a href={link(t.lang)} aria-label={t.logoAlt}><Logo lang={t.lang} light tagline={t.tagline} /></a>
          <p>{t.footer.text}</p>
        </div>
        <nav aria-label={t.menu}>
          <a href={link(t.lang)}>{t.nav.home}</a>
          {PAGES.map(([key, path]) => <a key={key} href={link(t.lang, path)}>{t.nav[key]}</a>)}
          <a href={t.pacto.url}>{t.pacto.title}</a>
        </nav>
        <div className="foot-orgs">
          <h2 className="caps">{t.aboutPage.consortiumTitle}</h2>
          <ul>
            {CONSORTIUM.map((o) => (
              <li key={o.name}>
                {o.url
                  ? <a href={o.url} target="_blank" rel="noopener noreferrer"><img src={o.logo} alt={o.name} loading="lazy" /></a>
                  : <img src={o.logo} alt={o.name} loading="lazy" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="wrap muted foot-legal">{t.footer.license}</p>
    </footer>
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
