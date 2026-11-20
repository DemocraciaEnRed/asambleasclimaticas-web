'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getStore, MODE } from '@/lib/admin/store'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

const NAV = [
  ['/admin/', 'Resumen'],
  ['/admin/agenda/', 'Agenda'],
  ['/admin/biblioteca/', 'Biblioteca'],
  ['/admin/mensajes/', 'Mensajes'],
]

function Login({ store }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function submit(ev) {
    ev.preventDefault()
    setState('sending')
    try {
      const r = await store.signIn(email)
      setState(r.sent ? 'sent' : 'idle')
    } catch (e) {
      setError(e.message)
      setState('error')
    }
  }

  return (
    <main className="adm-login">
      <p className="caps">(re)surgentes</p>
      <h1>Backoffice</h1>
      {state === 'sent' ? (
        <p className="lead" role="status">Te mandamos un link a <b>{email}</b>. Abrilo desde este navegador para entrar.</p>
      ) : (
        <form onSubmit={submit} className="adm-stack">
          <label className="adm-field">
            <span className="caps">Email</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button className="adm-btn is-primary" disabled={state === 'sending'}>
            {MODE === 'local' ? 'Entrar' : state === 'sending' ? 'Enviando…' : 'Recibir link de acceso'}
          </button>
          {state === 'error' && <p className="adm-error" role="alert">No pudimos mandar el link: {error}</p>}
          <p className="muted">
            {MODE === 'local'
              ? 'Modo local: cualquier email entra. Todavía no hay Supabase conectado.'
              : 'Solo pueden entrar las personas invitadas al equipo.'}
          </p>
        </form>
      )}
    </main>
  )
}

export default function AdminShell({ children }) {
  const [store, setStore] = useState(null)
  const [session, setSession] = useState(undefined) // undefined mientras carga
  const [open, setOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    let off = () => {}
    getStore().then(async (s) => {
      setStore(s)
      setSession(await s.session())
      off = s.onAuth(setSession)
    })
    return () => off()
  }, [])

  useEffect(() => setOpen(false), [path])

  if (session === undefined) return <p className="adm-loading">Cargando…</p>
  if (!session) return <Login store={store} />

  return (
    <StoreContext.Provider value={store}>
      <a className="skip" href="#adm-main">Ir al contenido</a>
      <header className="adm-top">
        <Link href="/admin/" className="adm-brand"><b>(re)surgentes</b> <span className="caps">Backoffice</span></Link>
        <button type="button" className="adm-toggle caps" aria-expanded={open} aria-controls="adm-nav" onClick={() => setOpen(!open)}>Menú</button>
        <nav id="adm-nav" className={`adm-nav${open ? ' is-open' : ''}`}>
          {NAV.map(([href, name]) => (
            <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{name}</Link>
          ))}
          <span className="adm-user">
            <span className="muted">{session.email}</span>
            <button type="button" className="adm-link" onClick={() => store.signOut()}>Salir</button>
          </span>
        </nav>
      </header>
      {MODE === 'local' && (
        <p className="adm-banner">
          <b>Modo local.</b> Los cambios se guardan solo en este navegador. Para publicarlos, exportá el JSON y reemplazá el archivo en <code>src/content</code>.
        </p>
      )}
      <main id="adm-main" className="adm-main">{children}</main>
    </StoreContext.Provider>
  )
}
