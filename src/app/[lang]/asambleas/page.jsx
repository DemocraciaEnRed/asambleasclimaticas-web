import { Cutout } from '@/components/bits'
import { link, tint } from '@/lib/site'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang)
  return { title: t.assembliesPage.title, description: t.assembliesPage.intro }
}

export default async function Assemblies({ params: { lang } }) {
  const t = await getDictionary(lang)
  return (
    <>
      <section className="page-head wrap">
        <h1>{t.assembliesPage.title}</h1>
        <p className="lead">{t.assembliesPage.intro}</p>
      </section>

      <section className="strips">
        {t.assemblies.map((a, i) => (
          <a key={a.code} href={link(lang, `asambleas/${a.code}/`)} className={`strip ${i % 2 ? 'is-flip' : ''}`} style={tint(a.code)}>
            <Cutout code={a.code} className="strip-art" />
            <span className="strip-text wrap">
              <span className="caps">{a.country}, {a.dates}</span>
              <span className="strip-city">{a.city}</span>
              <span className="strip-q">{a.topic}</span>
              <span className="caps strip-more">({t.labels.seeAssembly})</span>
            </span>
          </a>
        ))}
      </section>

      <section className="compare wrap">
        <h2>{t.assembliesPage.compareTitle}</h2>
        <div className="table-scroll" tabIndex={0} role="region" aria-label={t.assembliesPage.compareTitle}>
          <table>
            <thead>
              <tr>{t.assembliesPage.columns.map((c) => <th key={c} scope="col" className="caps">{c}</th>)}</tr>
            </thead>
            <tbody>
              {t.assemblies.map((a) => (
                <tr key={a.code} style={tint(a.code)}>
                  <th scope="row"><a href={link(lang, `asambleas/${a.code}/`)}>{a.city}</a></th>
                  <td className="num">{a.people}</td>
                  <td className="num">{a.sessions}</td>
                  <td>{a.topic}</td>
                  <td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
