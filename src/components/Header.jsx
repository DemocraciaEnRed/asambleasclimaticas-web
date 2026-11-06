'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PAGES, link } from '@/lib/site'
import Logo from './Logo'

export default function Header({ t }) {
  const pathname = usePathname() || `/${t.lang}/`
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Same page, other language: /es/asambleas/br/ -> /pt/asambleas/br/
  const rest = pathname.split('/').slice(2).join('/')
  const onHero = rest === ''
  const current = (path) => rest.startsWith(path)

  // Over the home key visual the header melts into the photo; once you scroll it turns into solid paper.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const clear = onHero && !scrolled && !open
  return (
    <header className={`top ${clear ? 'is-clear' : ''} ${open ? 'is-open' : ''}`}>
      <a className="skip" href="#contenido">{t.skip}</a>
      <a href={link(t.lang)} className="top-logo" aria-label={`${t.logoAlt}, ${t.nav.home}`}>
        <Logo lang={t.lang} light={clear} tagline={t.tagline} />
      </a>
      <button className="top-toggle caps" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
        {open ? t.close : t.menu}
      </button>
      <nav id="menu" className="top-nav" aria-label={t.menu}>
        {PAGES.map(([key, path]) => (
          <a key={key} href={link(t.lang, path)} aria-current={current(path) ? 'page' : undefined} onClick={() => setOpen(false)}>
            {t.nav[key]}
          </a>
        ))}
        <a className="top-lang caps" href={`/${t.other.lang}/${rest}`} hrefLang={t.other.lang} lang={t.other.lang}>
          <span aria-hidden="true">{t.other.short}</span>
          <span className="sr">{t.other.label}</span>
        </a>
      </nav>
    </header>
  )
}
