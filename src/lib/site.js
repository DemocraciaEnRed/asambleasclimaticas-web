import recursos from '@/content/recursos.json'
import agenda from '@/content/agenda.json'

export const LANGS = ['es', 'pt']

// Cada asamblea tiene un color y una ilustración de la marca.
export const LOOK = {
  br: { color: 'var(--verde)', art: 1 },
  ar: { color: 'var(--azul)', art: 3 },
  co: { color: 'var(--naranja)', art: 4 },
  mx: { color: 'var(--rosa)', art: 2 },
  red: { color: 'var(--cafe)', art: 1 },
}

// Navegación principal. A la home se llega desde el logo.
export const PAGES = [
  ['assemblies', 'asambleas/'],
  ['impact', 'incidencia/'],
  ['agenda', 'agenda/'],
  ['library', 'biblioteca/'],
  ['about', 'nosotros/'],
  ['contact', 'contacto/'],
]

// Organizaciones que llevaron adelante las asambleas (footer). Los logos vienen del CDN de Democracia en Red, como en pacto.resurgentes.org.
const CDN = 'https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas'
export const CONSORTIUM = [
  { name: 'Delibera Brasil', logo: `${CDN}/delibera-logo.png`, url: 'https://deliberabrasil.org' },
  { name: 'Democracia en Red', logo: `${CDN}/der-logo.png`, url: 'https://democraciaenred.org' },
  { name: 'Extituto', logo: `${CDN}/extituto-logo.png`, url: null },
  { name: 'SUR, Instituto del Sur Urbano', logo: `${CDN}/sur-logo.png`, url: null },
]

export const PARTNERS = [
  ['der', 'Democracia en Red'],
  ['open-society', 'Open Society Foundations'],
  ['ned', 'National Endowment for Democracy'],
  ['friedrich', 'Friedrich-Ebert-Stiftung'],
  ['corona', 'Fundación Corona'],
  ['artemisas', 'Artemisas'],
  ['labicpa', 'LabICPA'],
]

export const SITE = 'https://resurgentes.org'

// Backoffice (Supabase), definido al compilar. Sin él, la agenda usa el JSON de src/content
// y el formulario de contacto muestra su mensaje "sin conexión". La anon key es pública a propósito: el acceso
// lo limitan las reglas de seguridad por fila (RLS) de supabase/schema.sql.
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const SB_HEADERS = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }

// Cada endpoint es null cuando el backoffice no está configurado.
export const AGENDA_API = SB_URL && SB_KEY ? {
  url: `${SB_URL}/rest/v1/events?select=id,date,end:end_date,precision,kind,assembly,place,url,title,text&published=eq.true`,
  headers: SB_HEADERS,
} : null

export const CONTACT_API = SB_URL && SB_KEY ? {
  url: `${SB_URL}/rest/v1/messages`,
  // return=minimal: el público puede insertar mensajes pero no leerlos.
  headers: { ...SB_HEADERS, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
} : null

export const link = (lang, path = '') => `/${lang}/${path}`

// Propiedades CSS que tiñen un recorte con el color de una asamblea.
export const tint = (code) => ({
  '--c': LOOK[code].color,
  '--art': `url(/images/marca/ilustracion-${LOOK[code].art}.png)`,
})

export const resourcesFor = (lang, assembly) =>
  recursos
    .filter((r) => !assembly || r.assembly === assembly)
    .map((r) => ({ ...r, title: r.title[lang] }))

// Actividades de la agenda en un idioma, las más nuevas primero. Misma forma que debe devolver el backoffice.
export const localize = (lang, items) =>
  items
    .map((e) => ({ ...e, title: e.title[lang] || e.title.es, text: e.text?.[lang] || e.text?.es || '' }))
    .sort((a, b) => b.date.localeCompare(a.date))

export const agendaFor = (lang) => localize(lang, agenda)
