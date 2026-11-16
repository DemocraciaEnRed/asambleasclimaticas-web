'use client'
import { useState } from 'react'
import { useTable, Filter, PageHead, Status, Badge, fmtDate } from '@/components/admin/ui'
import { STATUSES, label } from '@/lib/admin/model'

// Inbox for the public contact form. Messages are read-only; only their status changes.
export default function MessagesAdmin() {
  const { rows, error, reload, save } = useTable('messages')
  const [status, setStatus] = useState('active')
  const [country, setCountry] = useState('all')
  const [openId, setOpenId] = useState(null)

  const countries = [...new Set((rows || []).map((m) => m.country).filter(Boolean))].sort().map((c) => [c, c])
  const shown = (rows || [])
    .filter((m) => (status === 'active' ? m.status !== 'archived' : status === 'all' || m.status === status))
    .filter((m) => country === 'all' || m.country === country)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))

  const setState = (m, s) => save({ ...m, status: s })
  const toggle = (m) => {
    setOpenId(openId === m.id ? null : m.id)
    if (m.status === 'new') setState(m, 'read')
  }

  return (
    <>
      <PageHead title="Mensajes" />
      <div className="adm-filters">
        <label className="adm-filter">
          <span className="caps">Estado</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Sin archivar</option>
            {STATUSES.map(([v, n]) => <option key={v} value={v}>{n}</option>)}
            <option value="all">Todos</option>
          </select>
        </label>
        <Filter label="País" value={country} onChange={setCountry} options={countries} />
        <p className="muted" aria-live="polite">{shown.length} mensajes</p>
      </div>

      <Status rows={rows} error={error} reload={reload} />
      {rows && (shown.length ? (
        <ul className="adm-inbox">
          {shown.map((m) => (
            <li key={m.id} className={m.status === 'new' ? 'is-new' : undefined}>
              <button className="adm-msg-head" aria-expanded={openId === m.id} onClick={() => toggle(m)}>
                <b>{m.name}</b>
                <span>{m.reason || 'Sin motivo'} · {m.country || 'Sin país'}</span>
                <span className="muted nowrap">{fmtDate(m.created_at)}</span>
                <Badge off={m.status !== 'new'}>{label(STATUSES, m.status)}</Badge>
              </button>
              {openId === m.id && (
                <div className="adm-msg-body">
                  <p className="adm-msg-text">{m.message}</p>
                  <p className="muted">Escribió en {m.lang === 'pt' ? 'portugués' : 'español'} desde el sitio.</p>
                  <div className="adm-actions">
                    <a className="adm-btn is-primary" href={`mailto:${m.email}?subject=${encodeURIComponent('(re)surgentes: tu mensaje')}`}>Responder a {m.email}</a>
                    {m.status !== 'archived'
                      ? <button className="adm-btn" onClick={() => setState(m, 'archived')}>Archivar</button>
                      : <button className="adm-btn" onClick={() => setState(m, 'read')}>Desarchivar</button>}
                    {m.status === 'read' && <button className="adm-btn" onClick={() => setState(m, 'new')}>Marcar como nuevo</button>}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : <p className="adm-empty">No hay mensajes con estos filtros.</p>)}
    </>
  )
}
