import { Paren, Partners } from '@/components/bits'
import { link } from '@/lib/site'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang)
  return { title: t.aboutPage.title, description: t.aboutPage.intro }
}

export default async function About({ params: { lang } }) {
  const t = await getDictionary(lang)
  const A = t.aboutPage
  return (
    <>
      <section className="page-head wrap">
        <h1>{A.title}</h1>
        <p className="lead">{A.intro}</p>
      </section>

      <section className="about-photo" aria-hidden="true" />

      <section className="wrap about-text">
        <p className="big-quote">{A.goal}</p>
        <p>{A.whatIs}</p>
      </section>

      <section className="pattern-band" aria-hidden="true" />

      <section className="wrap consortium">
        <h2>{A.consortiumTitle}</h2>
        <ul>
          {A.consortium.map((o) => (
            <li key={o.name}>
              {o.url ? <a href={o.url} target="_blank" rel="noopener noreferrer">{o.name}</a> : <span>{o.name}</span>}
              <span className="caps">{o.city}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap contact">
        <h2>{A.contactTitle}</h2>
        <p className="lead">{t.contactPage.intro}</p>
        <Paren href={link(lang, 'contacto/')}>{t.contactPage.send}</Paren>
      </section>

      <Partners title={A.partnersTitle} />
    </>
  )
}
