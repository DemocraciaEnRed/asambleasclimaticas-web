import Shell from '@/lib/shell'
import Header from '@/components/Header'
import { Footer } from '@/components/bits'
import { LANGS } from '@/lib/site'
import { getDictionary } from './dictionaries'

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang)
  return {
    metadataBase: new URL('https://resurgentes.org'),
    title: { absolute: t.logoAlt, template: '%s | (re)surgentes' },
    description: t.aboutPage.intro,
    alternates: { languages: { [t.other.lang]: `/${t.other.lang}/` } },
    openGraph: { description: t.aboutPage.intro, images: '/images/share-landing.png', type: 'website', locale: t.lang === 'pt' ? 'pt_BR' : 'es_AR' },
    twitter: { card: 'summary_large_image', images: { url: '/images/share-landing.png', alt: '(re)surgentes' } },
  }
}

// Root layout for each language: /es/... renders <html lang="es">, /pt/... renders <html lang="pt">.
export default async function LangLayout({ children, params: { lang } }) {
  const t = await getDictionary(lang)
  return (
    <Shell lang={t.lang}>
      <Header t={t} />
      <main id="contenido">{children}</main>
      <Footer t={t} />
    </Shell>
  )
}
