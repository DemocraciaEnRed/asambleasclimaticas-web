'use client'
import { useState } from 'react'
import { useTable, Editor, Field, Input, Bilingual, Filter, PageHead, Status, Badge, download } from '@/components/admin/ui'
import { ASSEMBLIES, TYPES, LANGS, label, emptyResource, checkResource, exportResources, youtubeId } from '@/lib/admin/model'

function ResourceFields(form) {
  const { draft } = form
  const yt = draft.type === 'video' ? youtubeId(draft.url) : ''
  return (
    <>
      <Field label="Tipo"><Input form={form} path="type" as="select" options={TYPES} /></Field>
      <Field label="Asamblea"><Input form={form} path="assembly" as="select" options={ASSEMBLIES} /></Field>
      <Bilingual form={form} path="title" label="Título" required />
      <Field label="Link" error={form.errors.url} wide
        hint={draft.type === 'video' ? (yt ? `Video de YouTube detectado: ${yt}. Se muestra embebido.` : 'Si es de YouTube, se muestra embebido.') : 'PDF, nota, carpeta de Drive, publicación…'}>
        <Input form={form} path="url" type="url" placeholder="https://" required />
      </Field>
      <Field label="Fuente" error={form.errors.source} hint="Quién lo publicó: medio u organización.">
        <Input form={form} path="source" list="adm-sources" />
      </Field>
      <Field label="Idioma del material"><Input form={form} path="lang" as="select" options={LANGS} /></Field>
      <label className="adm-check is-wide">
        <Input form={form} path="published" type="checkbox" /> Publicado en el sitio
      </label>
    </>
  )
}

export default function LibraryAdmin() {
  const { rows, error, reload, save, remove, saveMany } = useTable('resources')
  const [editing, setEditing] = useState(null)
  const [assembly, setAssembly] = useState('all')
  const [type, setType] = useState('all')
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  const sorted = [...(rows || [])].sort((a, b) => a.position - b.position)
  const shown = sorted.filter((r) => (assembly === 'all' || r.assembly === assembly) && (type === 'all' || r.type === type))
  const sources = [...new Set(sorted.map((r) => r.source).filter(Boolean))].sort()

  // Intercambia la posición con el vecino visible en el filtro actual, que es el orden que ve la gente.
  const move = (i, dir) => {
    const a = shown[i], b = shown[i + dir]
    saveMany([{ ...a, position: b.position }, { ...b, position: a.position }])
  }

  const onSave = (r) => save({ ...r, youtube: r.type === 'video' ? youtubeId(r.url) : '' })

  const reorder = (targetId) => {
    if (!dragging || dragging === targetId) return
    const nextShown = [...shown]
    const from = nextShown.findIndex((r) => r.id === dragging)
    const to = nextShown.findIndex((r) => r.id === targetId)
    if (from < 0 || to < 0) return
    const [moved] = nextShown.splice(from, 1)
    nextShown.splice(to, 0, moved)

    const visibleIds = new Set(shown.map((r) => r.id))
    let visibleIndex = 0
    const nextGlobal = sorted
      .map((r) => visibleIds.has(r.id) ? nextShown[visibleIndex++] : r)
      .map((r, position) => ({ ...r, position }))

    saveMany(nextGlobal)
  }

  return (
    <>
      <PageHead title="Biblioteca">
        <button className="adm-btn" onClick={() => download('recursos.json', exportResources(rows || []))} disabled={!rows}>Exportar JSON</button>
        <button className="adm-btn is-primary" onClick={() => setEditing(emptyResource())}>Nuevo recurso</button>
      </PageHead>

      <div className="adm-filters">
        <Filter label="Asamblea" value={assembly} onChange={setAssembly} options={ASSEMBLIES} />
        <Filter label="Tipo" value={type} onChange={setType} options={TYPES} />
        <p className="muted" aria-live="polite">{shown.length} de {rows?.length ?? 0} · El orden es el de la biblioteca pública.</p>
      </div>

      <Status rows={rows} error={error} reload={reload} />
      {rows && (shown.length ? (
        <table className="adm-table">
          <thead><tr><th><span className="sr">Orden</span></th><th>Título</th><th>Asamblea</th><th>Tipo</th><th>Fuente</th><th>Estado</th></tr></thead>
          <tbody>
            {shown.map((r, i) => (
              <tr
                key={r.id}
                draggable
                className={dragging === r.id ? 'adm-row is-dragging' : dragOver === r.id ? 'adm-row is-drag-over' : 'adm-row'}
                onDragStart={(e) => {
                  setDragging(r.id)
                  e.dataTransfer.effectAllowed = 'move'
                  e.dataTransfer.setData('text/plain', r.id)
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.dataTransfer.dropEffect = 'move'
                  setDragOver(r.id)
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault()
                  reorder(r.id)
                  setDragging(null)
                  setDragOver(null)
                }}
                onDragEnd={() => {
                  setDragging(null)
                  setDragOver(null)
                }}
              >
                <td className="adm-order">
                  <span className="adm-drag-handle" aria-label={`Arrastrar ${r.title.es}`} title="Arrastrar para ordenar">⠿</span>
                  <button className="adm-icon" aria-label={`Subir ${r.title.es}`} disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                  <button className="adm-icon" aria-label={`Bajar ${r.title.es}`} disabled={i === shown.length - 1} onClick={() => move(i, 1)}>↓</button>
                </td>
                <td data-label="Título">
                  <button className="adm-row-link" onClick={() => setEditing(r)}>{r.title.es}</button>
                  {!r.title.pt && <Badge off>falta PT</Badge>}
                </td>
                <td data-label="Asamblea">{label(ASSEMBLIES, r.assembly)}</td>
                <td data-label="Tipo">{label(TYPES, r.type)}</td>
                <td data-label="Fuente">{r.source} <span className="muted">({r.lang.toUpperCase()})</span></td>
                <td data-label="Estado">{r.published ? <Badge>Publicado</Badge> : <Badge off>Borrador</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p className="adm-empty">No hay recursos con estos filtros.</p>)}

      <datalist id="adm-sources">{sources.map((s) => <option key={s} value={s} />)}</datalist>

      {editing && (
        <Editor title={editing.id ? 'Editar recurso' : 'Nuevo recurso'} record={editing} check={checkResource}
          onSave={onSave} onDelete={remove} onClose={() => setEditing(null)}>
          {ResourceFields}
        </Editor>
      )}
    </>
  )
}
