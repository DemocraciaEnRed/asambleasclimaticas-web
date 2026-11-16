'use client'
import Link from 'next/link'
import { useStore } from '@/components/admin/AdminShell'
import { useTable, PageHead, fmtDate } from '@/components/admin/ui'
import { today } from '@/lib/admin/model'

function Card({ href, title, n, children }) {
  return (
    <Link href={href} className="adm-card">
      <span className="caps">{title}</span>
      <b className="num">{n ?? '…'}</b>
      <span>{children}</span>
    </Link>
  )
}

export default function Overview() {
  const store = useStore()
  const events = useTable('events')
  const resources = useTable('resources')
  const messages = useTable('messages')

  const now = today()
  const upcoming = events.rows?.filter((e) => e.published && (e.end || e.date) >= now).sort((a, b) => a.date.localeCompare(b.date))
  const unread = messages.rows?.filter((m) => m.status === 'new').length
  const missingPt = [...(events.rows || []), ...(resources.rows || [])].filter((r) => !r.title?.pt).length

  async function reset() {
    if (!window.confirm('Se pierden todos los cambios hechos en este navegador y se vuelve a los JSON del repositorio. ¿Seguir?')) return
    await store.reset()
    window.location.reload()
  }

  return (
    <>
      <PageHead title="Resumen" />
      <div className="adm-cards">
        <Card href="/admin/mensajes/" title="Mensajes nuevos" n={unread}>sin leer</Card>
        <Card href="/admin/agenda/" title="Próximos eventos" n={upcoming?.length}>publicados en la agenda</Card>
        <Card href="/admin/biblioteca/" title="Biblioteca" n={resources.rows?.length}>recursos cargados</Card>
        <Card href="/admin/agenda/" title="Traducciones" n={events.rows && resources.rows ? missingPt : undefined}>títulos sin portugués</Card>
      </div>

      {upcoming?.length > 0 && (
        <section className="adm-section">
          <h2 className="caps">Lo próximo en la agenda</h2>
          <ul className="adm-list">
            {upcoming.slice(0, 5).map((e) => <li key={e.id}><span className="muted nowrap">{fmtDate(e.date)}</span> {e.title.es}</li>)}
          </ul>
        </section>
      )}

      {store.mode === 'local' && (
        <section className="adm-section">
          <h2 className="caps">Modo local</h2>
          <p>Los datos salen de <code>src/content</code> y los cambios quedan en este navegador. Cuando se conecte Supabase, esta misma pantalla va a leer y escribir la base real.</p>
          <button className="adm-btn is-danger" onClick={reset}>Descartar cambios locales</button>
        </section>
      )}
    </>
  )
}
