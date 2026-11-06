import recursos from '@/content/recursos.json'

export const LANGS = ['es', 'pt']

// Each assembly gets one brand color and one brand illustration.
export const LOOK = {
  br: { color: 'var(--verde)', art: 1 },
  ar: { color: 'var(--azul)', art: 3 },
  co: { color: 'var(--naranja)', art: 4 },
  mx: { color: 'var(--rosa)', art: 2 },
  red: { color: 'var(--cafe)', art: 1 },
}

export const PAGES = [
  ['home', ''],
  ['assemblies', 'asambleas/'],
  ['impact', 'incidencia/'],
  ['library', 'biblioteca/'],
  ['about', 'nosotros/'],
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
