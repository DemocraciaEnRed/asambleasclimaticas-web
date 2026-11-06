'use client'
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { PAGES, link } from '@/lib/site'

export default function Header({ t }) {
  const pathname = usePathname() || `/${t.lang}/`
  const [open, setOpen] = useState(false)
  // Same page, other language: /es/asambleas/br/ -> /pt/asambleas/br/
  const rest = pathname.split('/').slice(2).join('/')
  const current = (path) => (path === '' ? rest === '' : rest.startsWith(path))

  return (
    <header className={`top ${open ? 'is-open' : ''}`}>
      <a className="skip" href="#contenido">{t.skip}</a>
      <a href={link(t.lang)} className="top-logo">
        <img src={`/images/marca/logo-${t.lang}.png`} alt={t.logoAlt} width="1145" height="449" />
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
