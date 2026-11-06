import Library from '@/components/Library'
import { resourcesFor } from '@/lib/site'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang)
  return { title: t.libraryPage.title, description: t.libraryPage.intro }
}

export default async function LibraryPage({ params: { lang } }) {
  const t = await getDictionary(lang)
  const cities = Object.fromEntries(t.assemblies.map((a) => [a.code, a.city]))
  return (
    <>
      <section className="page-head wrap">
        <h1>{t.libraryPage.title}</h1>
        <p className="lead">{t.libraryPage.intro}</p>
      </section>
      <section className="wrap library">
        <Library t={t} items={resourcesFor(lang)} cities={cities} />
      </section>
    </>
  )
}
