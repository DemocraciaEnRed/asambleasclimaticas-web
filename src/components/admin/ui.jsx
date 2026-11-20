'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useStore } from './AdminShell'

// Carga una tabla y expone save/remove, que mantienen la lista sincronizada.
export function useTable(table) {
  const store = useStore()
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    setError('')
    return store.list(table).then(setRows, (e) => setError(e.message))
  }, [store, table])

  useEffect(() => { reload() }, [reload])

  const save = async (row) => {
    const saved = await store.save(table, row)
    setRows((all) => (all.some((r) => r.id === saved.id) ? all.map((r) => (r.id === saved.id ? saved : r)) : [...all, saved]))
    return saved
  }
  const remove = async (id) => {
    await store.remove(table, id)
    setRows((all) => all.filter((r) => r.id !== id))
  }
  const saveMany = async (changed) => {
    await store.saveMany(table, changed)
    const byId = new Map(changed.map((r) => [r.id, r]))
    setRows((all) => all.map((r) => byId.get(r.id) || r))
  }
  return { rows, error, reload, save, remove, saveMany }
}

// Lee/escribe una ruta anidada como "title.es" en un objeto plano.
export const get = (o, path) => path.split('.').reduce((v, k) => v?.[k], o)
export function set(o, path, value) {
  const [k, ...rest] = path.split('.')
  return { ...o, [k]: rest.length ? set(o[k] || {}, rest.join('.'), value) : value }
}

export function Field({ label, error, hint, wide, children }) {
  return (
    <label className={`adm-field${wide ? ' is-wide' : ''}${error ? ' has-error' : ''}`}>
      <span className="caps">{label}</span>
      {children}
      {error ? <span className="adm-error">{error}</span> : hint && <span className="muted">{hint}</span>}
    </label>
  )
}

// Campo ligado a una ruta del registro en borrador. `as` elige input | textarea | select.
export function Input({ form, path, as = 'input', options, ...props }) {
  const { draft, setDraft, errors } = form
  const value = get(draft, path) ?? ''
  const onChange = (e) => setDraft((d) => set(d, path, e.target.type === 'checkbox' ? e.target.checked : e.target.value))
  if (as === 'select') {
    return <select value={value} onChange={onChange} aria-invalid={!!errors[path]} {...props}>
      {options.map(([v, name]) => <option key={v} value={v}>{name}</option>)}
    </select>
  }
  if (as === 'textarea') return <textarea value={value} onChange={onChange} aria-invalid={!!errors[path]} rows={3} {...props} />
  if (props.type === 'checkbox') return <input checked={!!value} onChange={onChange} {...props} />
  return <input value={value} onChange={onChange} aria-invalid={!!errors[path]} {...props} />
}

// El mismo texto en español y en portugués, uno al lado del otro.
export function Bilingual({ form, path, label, as, required }) {
  return (
    <div className="adm-pair is-wide">
      {[['es', 'ES'], ['pt', 'PT']].map(([l, tag]) => (
        <Field key={l} label={`${label} · ${tag}`} error={form.errors[`${path}.${l}`]}
          hint={l === 'pt' && !required ? 'Si queda vacío, se muestra el español.' : undefined}>
          <Input form={form} path={`${path}.${l}`} as={as} lang={l} required={required && l === 'es'} />
        </Field>
      ))}
    </div>
  )
}

// Editor modal: guarda un borrador, valida al guardar y se cierra con Escape o el fondo.
export function Editor({ title, record, check, onSave, onDelete, onClose, children }) {
  const ref = useRef(null)
  const [draft, setDraft] = useState(record)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState('')

  // Sin close() en el cleanup: dispara el evento close del diálogo, que desmontaría el editor
  // durante el doble montaje de React en desarrollo. Al desmontar, el diálogo se quita igual.
  useEffect(() => {
    if (!ref.current.open) ref.current.showModal()
  }, [])

  async function submit(ev) {
    ev.preventDefault()
    const found = check(draft)
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    setFailure('')
    try {
      await onSave(draft)
      onClose()
    } catch (e) {
      setFailure(e.message)
      setBusy(false)
    }
  }

  async function del() {
    if (!window.confirm('¿Borrar definitivamente? No se puede deshacer.')) return
    setBusy(true)
    try { await onDelete(record.id); onClose() } catch (e) { setFailure(e.message); setBusy(false) }
  }

  return (
    <dialog ref={ref} className="adm-dialog" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <form onSubmit={submit} noValidate>
        <header className="adm-dialog-head">
          <h2>{title}</h2>
          <button type="button" className="adm-link" onClick={onClose}>Cerrar</button>
        </header>
        <div className="adm-grid">{children({ draft, setDraft, errors })}</div>
        <footer className="adm-dialog-foot">
          {failure && <p className="adm-error" role="alert">No se pudo guardar: {failure}</p>}
          {Object.keys(errors).length > 0 && <p className="adm-error" role="alert">Revisá los campos marcados.</p>}
          {onDelete && record.id && <button type="button" className="adm-btn is-danger" onClick={del} disabled={busy}>Borrar</button>}
          <button type="submit" className="adm-btn is-primary" disabled={busy}>{busy ? 'Guardando…' : 'Guardar'}</button>
        </footer>
      </form>
    </dialog>
  )
}

// Descarga los datos como un .json con el mismo formato que los de src/content.
export function download(name, data) {
  const blob = new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' })
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name })
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

export function Filter({ label, value, onChange, options }) {
  return (
    <label className="adm-filter">
      <span className="caps">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">Todo</option>
        {options.map(([v, name]) => <option key={v} value={v}>{name}</option>)}
      </select>
    </label>
  )
}

export function PageHead({ title, children }) {
  return (
    <div className="adm-head">
      <h1>{title}</h1>
      <div className="adm-actions">{children}</div>
    </div>
  )
}

export function Status({ rows, error, reload }) {
  if (error) return <p className="adm-error" role="alert">No se pudieron cargar los datos: {error} <button className="adm-link" onClick={reload}>Reintentar</button></p>
  if (!rows) return <p className="muted">Cargando…</p>
  return null
}

export const Badge = ({ off, children }) => <span className={`adm-badge${off ? ' is-off' : ''}`}>{children}</span>

export const fmtDate = (iso) => new Date(iso.length === 10 ? `${iso}T12:00:00` : iso)
  .toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
