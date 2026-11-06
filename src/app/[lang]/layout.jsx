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
    title: { absolute: t.logoAlt, template: '%s | (re)surgentes' },
    description: t.aboutPage.intro,
    alternates: { languages: { [t.other.lang]: `/${t.other.lang}/` } },
  }
}

export default async function LangLayout({ children, params: { lang } }) {
  const t = await getDictionary(lang)
  return (
    <div lang={t.lang}>
      <Header t={t} />
      <main id="contenido">{children}</main>
      <Footer t={t} />
    </div>
  )
}
