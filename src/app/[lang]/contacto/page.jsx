import ContactForm from '@/components/ContactForm'
import Share from '@/components/Share'
import { CONSORTIUM, SITE, link } from '@/lib/site'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang)
  return { title: t.contactPage.title, description: t.contactPage.intro }
}

export default async function Contact({ params: { lang } }) {
  const t = await getDictionary(lang)
  const C = t.contactPage
  return (
    <>
      <section className="page-head wrap">
        <h1>{C.title}</h1>
        <p className="lead">{C.intro}</p>
      </section>

      <section className="wrap contact-grid">
        <ContactForm t={t} />
        <aside className="channels">
          <h2 className="caps small-title">{C.orgsTitle}</h2>
          <ul>
            {CONSORTIUM.map((o) => (
              <li key={o.name}>
                {o.url ? <a href={o.url} target="_blank" rel="noopener noreferrer">{o.name}</a> : <span>{o.name}</span>}
              </li>
            ))}
          </ul>
          <h2 className="caps small-title">{C.shareTitle}</h2>
          <p className="muted">{C.shareText}</p>
          <Share t={t} url={`${SITE}${link(lang)}`} title={t.home.title} />
        </aside>
      </section>
    </>
  )
}
