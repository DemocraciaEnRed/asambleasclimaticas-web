'use client'
import { useState } from 'react'
import { useTable, Editor, Field, Input, Bilingual, Filter, PageHead, Status, Badge, download, fmtDate } from '@/components/admin/ui'
import { ASSEMBLIES, KINDS, PRECISIONS, label, emptyEvent, checkEvent, exportEvents, today } from '@/lib/admin/model'

function EventFields(form) {
  return (
    <>
      <Field label="Tipo"><Input form={form} path="kind" as="select" options={KINDS} /></Field>
      <Field label="Asamblea"><Input form={form} path="assembly" as="select" options={ASSEMBLIES} /></Field>
      <Field label="Fecha" error={form.errors.date}><Input form={form} path="date" type="date" required /></Field>
      <Field label="Hasta (opcional)" error={form.errors.end} hint="Para actividades de varios días.">
        <Input form={form} path="end" type="date" min={form.draft.date} />
      </Field>
      <Field label="Cómo mostrar la fecha"><Input form={form} path="precision" as="select" options={PRECISIONS} /></Field>
      <Field label="Lugar (opcional)"><Input form={form} path="place" placeholder="Ciudad, provincia" /></Field>
      <Bilingual form={form} path="title" label="Título" required />
      <Bilingual form={form} path="text" label="Descripción" as="textarea" />
      <Field label="Link (opcional)" error={form.errors.url} wide hint="Nota de prensa, publicación o documento. Las novedades lo necesitan.">
        <Input form={form} path="url" type="url" placeholder="https://" />
      </Field>
      <label className="adm-check is-wide">
        <Input form={form} path="published" type="checkbox" /> Publicado en el sitio
      </label>
    </>
  )
}

export default function AgendaAdmin() {
  const { rows, error, reload, save, remove } = useTable('events')
  const [editing, setEditing] = useState(null)
  const [assembly, setAssembly] = useState('all')
  const [kind, setKind] = useState('all')
  const [when, setWhen] = useState('all')

  const now = today()
  const shown = (rows || [])
    .filter((e) => (assembly === 'all' || e.assembly === assembly) && (kind === 'all' || e.kind === kind))
    .filter((e) => when === 'all' || (when === 'upcoming') === ((e.end || e.date) >= now))
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHead title="Agenda">
        <button className="adm-btn" onClick={() => download('agenda.json', exportEvents(rows || []))} disabled={!rows}>Exportar JSON</button>
        <button className="adm-btn is-primary" onClick={() => setEditing(emptyEvent())}>Nuevo evento</button>
      </PageHead>

      <div className="adm-filters">
        <Filter label="Asamblea" value={assembly} onChange={setAssembly} options={ASSEMBLIES} />
        <Filter label="Tipo" value={kind} onChange={setKind} options={KINDS} />
        <Filter label="Cuándo" value={when} onChange={setWhen} options={[['upcoming', 'Próximos'], ['past', 'Pasados']]} />
        <p className="muted" aria-live="polite">{shown.length} de {rows?.length ?? 0}</p>
      </div>

      <Status rows={rows} error={error} reload={reload} />
      {rows && (shown.length ? (
        <table className="adm-table">
          <thead><tr><th>Fecha</th><th>Título</th><th>Asamblea</th><th>Tipo</th><th>Estado</th></tr></thead>
          <tbody>
            {shown.map((e) => (
              <tr key={e.id}>
                <td data-label="Fecha" className="nowrap">{fmtDate(e.date)}{e.end && <> – {fmtDate(e.end)}</>}</td>
                <td data-label="Título">
                  <button className="adm-row-link" onClick={() => setEditing(e)}>{e.title.es}</button>
                  {!e.title.pt && <Badge off>falta PT</Badge>}
                </td>
                <td data-label="Asamblea">{label(ASSEMBLIES, e.assembly)}</td>
                <td data-label="Tipo">{label(KINDS, e.kind)}</td>
                <td data-label="Estado">{e.published ? <Badge>Publicado</Badge> : <Badge off>Borrador</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p className="adm-empty">No hay eventos con estos filtros.</p>)}

      {editing && (
        <Editor title={editing.id ? 'Editar evento' : 'Nuevo evento'} record={editing} check={checkEvent}
          onSave={save} onDelete={remove} onClose={() => setEditing(null)}>
          {EventFields}
        </Editor>
      )}
    </>
  )
}
