import { Cutout } from '@/components/bits'
import { link, tint } from '@/lib/site'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({ params: { lang } }) {
  const t = await getDictionary(lang)
  return { title: t.impactPage.title, description: t.impactPage.intro }
}

export default async function Impact({ params: { lang } }) {
  const t = await getDictionary(lang)
  const P = t.impactPage
  const word = { done: P.done, pending: P.pending, progress: P.inProgress }

  return (
    <>
      <section className="page-head wrap">
        <h1>{P.title}</h1>
        <p className="lead">{P.intro}</p>
      </section>

      {/* Each row is a stage of the incidence path; a filled cutout means the assembly got there. */}
      <section className="wrap stages">
        <h2>{P.stagesTitle}</h2>
        <div className="table-scroll" tabIndex={0} role="region" aria-label={P.stagesTitle}>
          <table className="stage-table">
            <thead>
              <tr>
                <td />
                {t.assemblies.map((a) => (
                  <th key={a.code} scope="col" style={tint(a.code)}>
                    <a href={link(lang, `asambleas/${a.code}/`)}>{a.city}</a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {P.stages.map((stage, s) => (
                <tr key={stage}>
                  <th scope="row">{stage}</th>
                  {t.assemblies.map((a) => (
                    <td key={a.code} style={tint(a.code)} className={`st st-${a.stages[s]}`}>
                      <Cutout code={a.code} className="st-mark" />
                      <span className="st-word">{word[a.stages[s]]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="impact-list">
        {t.assemblies.map((a) => (
          <article key={a.code} className="impact" style={tint(a.code)}>
            <div className="wrap impact-grid">
              <header>
                <p className="caps">{a.country}</p>
                <h2><a href={link(lang, `asambleas/${a.code}/`)}>{a.city}</a></h2>
                <p className="impact-status">{a.status}</p>
              </header>
              <div>
                <p>{a.after}</p>
                <ol className="trail">
                  {a.milestones.map((m) => (
                    <li key={m.what}>
                      <span className="caps">{m.when}</span>
                      <span>{m.what}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
