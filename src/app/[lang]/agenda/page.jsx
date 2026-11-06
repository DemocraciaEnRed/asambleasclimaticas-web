import Agenda from '@/components/Agenda'
import { agendaFor } from '@/lib/site'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang)
  return { title: t.agendaPage.title, description: t.agendaPage.intro }
}

export default async function AgendaPage({ params: { lang } }) {
  const t = await getDictionary(lang)
  const cities = Object.fromEntries(t.assemblies.map((a) => [a.code, a.city]))
  return (
    <>
      <section className="page-head wrap">
        <h1>{t.agendaPage.title}</h1>
        <p className="lead">{t.agendaPage.intro}</p>
      </section>
      <section className="wrap agenda">
        <Agenda t={t} lang={lang} initial={agendaFor(lang)} cities={cities} />
      </section>
    </>
  )
}
