'use client'
import { useEffect, useState } from 'react'
import { AGENDA_URL, localize, tint } from '@/lib/site'

const today = () => new Date().toISOString().slice(0, 10)

function When({ e, lang }) {
  const locale = lang === 'pt' ? 'pt-BR' : 'es-AR'
  const d = new Date(`${e.date}T12:00:00`)
  const month = d.toLocaleDateString(locale, { month: 'short' }).replace('.', '')
  const end = e.end && new Date(`${e.end}T12:00:00`)
  if (e.precision === 'month') {
    const endMonth = end && end.getMonth() !== d.getMonth() ? `–${end.toLocaleDateString(locale, { month: 'short' }).replace('.', '')}` : ''
    return <time dateTime={e.date.slice(0, 7)} className="ev-when is-month"><b className="num">{month}{endMonth}</b><span className="caps">{d.getFullYear()}</span></time>
  }
  const day = String(d.getDate()).padStart(2, '0')
  const range = end ? `–${String(end.getDate()).padStart(2, '0')}` : ''
  return <time dateTime={e.date} className="ev-when"><b className="num">{day}{range}</b><span className="caps">{month} {d.getFullYear()}</span></time>
}

// Google Calendar template link: adds an upcoming activity without downloading anything.
function calendarLink(e) {
  const d = (s) => s.replaceAll('-', '')
  const endDay = new Date(`${e.end || e.date}T12:00:00`)
  endDay.setDate(endDay.getDate() + 1)
  const dates = `${d(e.date)}/${d(endDay.toISOString().slice(0, 10))}`
  const q = new URLSearchParams({ action: 'TEMPLATE', text: e.title, dates, details: e.text || '', location: e.place || '' })
  return `https://calendar.google.com/calendar/render?${q}`
}

function Item({ e, t, lang, cities, upcoming }) {
  const A = t.agendaPage
  return (
    <li className="ev" style={tint(e.assembly)}>
      <When e={e} lang={lang} />
      <div className="ev-body">
        <p className="caps ev-meta">{A.kinds[e.kind]} / {cities[e.assembly] || A.network}</p>
        <h3>{e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer">{e.title}</a> : e.title}</h3>
        {e.text && <p>{e.text}</p>}
        {e.place && <p className="muted">{e.place}</p>}
        {upcoming && e.kind === 'activity' && (
          <a className="ev-cal" href={calendarLink(e)} target="_blank" rel="noopener noreferrer">{A.addToCalendar}</a>
        )}
      </div>
    </li>
  )
}

export default function Agenda({ t, lang, initial, cities, limit }) {
  const A = t.agendaPage
  const [items, setItems] = useState(initial)
  const [kind, setKind] = useState('all')
  const [now, setNow] = useState(null)

  // Dates are compared in the visitor's browser, so "upcoming" is right even long after the build.
  useEffect(() => {
    setNow(today())
    if (!AGENDA_URL) return
    fetch(AGENDA_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => setItems(localize(lang, data)))
      .catch(() => {}) // keep the bundled agenda if the back office is down
  }, [lang])

  const ref = now || '0000'
  const shown = items.filter((e) => kind === 'all' || e.kind === kind)
  const upcoming = shown.filter((e) => (e.end || e.date) >= ref).reverse()
  const past = shown.filter((e) => (e.end || e.date) < ref)

  if (limit) {
    const list = upcoming.length ? upcoming : past
    return <ol className="events">{list.slice(0, limit).map((e) => <Item key={e.id} e={e} t={t} lang={lang} cities={cities} upcoming={upcoming.length > 0} />)}</ol>
  }

  return (
    <>
      <fieldset className="filter">
        <legend className="caps">{A.filter}</legend>
        {[['all', A.all], ['activity', A.kinds.activity], ['news', A.kinds.news]].map(([v, name]) => (
          <button key={v} type="button" aria-pressed={kind === v} onClick={() => setKind(v)}>{name}</button>
        ))}
      </fieldset>

      <h2 className="ev-group">{A.upcoming}</h2>
      {upcoming.length
        ? <ol className="events">{upcoming.map((e) => <Item key={e.id} e={e} t={t} lang={lang} cities={cities} upcoming />)}</ol>
        : <p className="empty">{A.noUpcoming}</p>}

      <h2 className="ev-group">{A.past}</h2>
      <ol className="events is-past">{past.map((e) => <Item key={e.id} e={e} t={t} lang={lang} cities={cities} />)}</ol>
    </>
  )
}
