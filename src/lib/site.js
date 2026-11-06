import recursos from '@/content/recursos.json'
import agenda from '@/content/agenda.json'

export const LANGS = ['es', 'pt']

// Each assembly gets one brand color and one brand illustration.
export const LOOK = {
  br: { color: 'var(--verde)', art: 1 },
  ar: { color: 'var(--azul)', art: 3 },
  co: { color: 'var(--naranja)', art: 4 },
  mx: { color: 'var(--rosa)', art: 2 },
  red: { color: 'var(--cafe)', art: 1 },
}

// Main navigation. Home is reached through the logo.
export const PAGES = [
  ['assemblies', 'asambleas/'],
  ['impact', 'incidencia/'],
  ['agenda', 'agenda/'],
  ['library', 'biblioteca/'],
  ['about', 'nosotros/'],
  ['contact', 'contacto/'],
]

// Organizations that ran the assemblies (footer). Logos come from Democracia en Red's CDN, as on pacto.resurgentes.org.
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

// Optional back-office endpoints, set at build time. Without them the site uses the JSON in src/content.
export const AGENDA_URL = process.env.NEXT_PUBLIC_AGENDA_URL || ''
export const CONTACT_URL = process.env.NEXT_PUBLIC_CONTACT_URL || ''

export const link = (lang, path = '') => `/${lang}/${path}`

// CSS custom properties that tint a cutout with an assembly's color.
export const tint = (code) => ({
  '--c': LOOK[code].color,
  '--art': `url(/images/marca/ilustracion-${LOOK[code].art}.png)`,
})

export const resourcesFor = (lang, assembly) =>
  recursos
    .filter((r) => !assembly || r.assembly === assembly)
    .map((r) => ({ ...r, title: r.title[lang] }))

// Agenda items in one language, newest first. Same shape the back office must return.
export const localize = (lang, items) =>
  items
    .map((e) => ({ ...e, title: e.title[lang] || e.title.es, text: e.text?.[lang] || e.text?.es || '' }))
    .sort((a, b) => b.date.localeCompare(a.date))

export const agendaFor = (lang) => localize(lang, agenda)
