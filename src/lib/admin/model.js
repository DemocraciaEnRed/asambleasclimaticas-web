// Lo que edita el backoffice: opciones de campos, registros vacíos, validación y exportación a JSON.
// Los registros mantienen la forma de src/content/*.json, más `published` (y `position` en los recursos).

export const ASSEMBLIES = [
  ['br', 'Bujarú (BR)'],
  ['ar', 'Mar del Plata (AR)'],
  ['co', 'Buenaventura (CO)'],
  ['mx', 'Nuevo León (MX)'],
  ['red', 'Red regional'],
]
export const KINDS = [['activity', 'Actividad'], ['news', 'Novedad']]
export const PRECISIONS = [['day', 'Día exacto'], ['month', 'Solo mes']]
export const TYPES = [['report', 'Informe'], ['press', 'Prensa'], ['video', 'Video'], ['social', 'Redes'], ['gallery', 'Fotos y videos']]
export const LANGS = [['es', 'Español'], ['pt', 'Português'], ['en', 'English']]
export const STATUSES = [['new', 'Nuevo'], ['read', 'Leído'], ['archived', 'Archivado']]

export const label = (options, value) => options.find(([v]) => v === value)?.[1] || value || '—'

export const today = () => new Date().toISOString().slice(0, 10)

export const emptyEvent = () => ({
  id: '', date: today(), end: '', precision: 'day', kind: 'activity', assembly: 'red',
  place: '', url: '', title: { es: '', pt: '' }, text: { es: '', pt: '' }, published: true,
})

export const emptyResource = () => ({
  id: '', assembly: 'red', type: 'report', lang: 'es', source: '',
  title: { es: '', pt: '' }, url: '', youtube: '', position: 0, published: true,
})

const isUrl = (s) => { try { return /^https?:$/.test(new URL(s).protocol) } catch { return false } }

// Devuelve { campo: mensaje } por cada problema; un objeto vacío significa que el registro se puede guardar.
export function checkEvent(e) {
  const err = {}
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '')) err.date = 'Elegí una fecha.'
  if (e.end && e.end < e.date) err.end = 'El fin no puede ser antes del inicio.'
  if (!e.title?.es?.trim()) err['title.es'] = 'El título en español es obligatorio.'
  if (e.url && !isUrl(e.url)) err.url = 'Tiene que ser un link completo (https://…).'
  if (e.kind === 'news' && !e.url) err.url = 'Las novedades necesitan el link a la nota.'
  return err
}

export function checkResource(r) {
  const err = {}
  if (!r.title?.es?.trim()) err['title.es'] = 'El título en español es obligatorio.'
  if (!isUrl(r.url || '')) err.url = 'Tiene que ser un link completo (https://…).'
  if (!r.source?.trim()) err.source = 'Indicá quién lo publicó.'
  return err
}

// Saca el id del video de cualquier enlace de YouTube (watch, youtu.be, shorts, embed).
export function youtubeId(url = '') {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1)
    if (!u.hostname.endsWith('youtube.com')) return ''
    return u.searchParams.get('v') || u.pathname.match(/\/(?:shorts|embed)\/([\w-]+)/)?.[1] || ''
  } catch { return '' }
}

// Id estable y legible para una actividad nueva de la agenda: "mx-glosa-ciudadana-2025-09".
export function eventId(e, taken) {
  const slug = (e.title.es || 'evento').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 4).join('-')
  const base = `${e.assembly}-${slug}-${e.date.slice(0, 7)}`
  let id = base
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`
  return id
}

// Quita los valores vacíos para que la exportación coincida con el JSON escrito a mano (sin ruido tipo "place": "").
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== '' && v != null && !(typeof v === 'object' && !Object.values(v).some(Boolean))))

// Los mismos archivos que lee hoy el sitio público: solo lo publicado, sin los campos del backoffice.
export function exportEvents(events) {
  return events
    .filter((e) => e.published)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(({ id, date, end, precision, kind, assembly, place, title, text, url }) =>
      clean({ id, date, end, precision, kind, assembly, place, title: clean(title), text: clean(text || {}), url }))
}

export function exportResources(resources) {
  return resources
    .filter((r) => r.published)
    .sort((a, b) => a.position - b.position)
    .map(({ assembly, type, lang, source, title, url, youtube }) =>
      clean({ assembly, type, lang, source, title: clean(title), url, youtube: type === 'video' ? youtube || youtubeId(url) : '' }))
}
