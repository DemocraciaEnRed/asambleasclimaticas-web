import { link, tint } from '@/lib/site'
import { getDictionary } from '../dictionaries'

function StageIcon({ status, label }) {
  if (status === 'done') {
    return (
      <svg className="stage-icon" viewBox="0 0 32 32" role="img" aria-label={label}>
        <path d="M7 16.5l6 6L25 9" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (status === 'progress') {
    return (
      <svg className="stage-icon" viewBox="0 0 32 32" role="img" aria-label={label}>
        <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M16 9v7l5 3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg className="stage-icon" viewBox="0 0 32 32" role="img" aria-label={label}>
      <path d="M9 9l14 14M23 9L9 23" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

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

      {/* Cada fila es una etapa del camino de incidencia; el ícono indica si está cumplida, en curso o pendiente. */}
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
                      <StageIcon status={a.stages[s]} label={word[a.stages[s]]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="legend">
          <ul className="stage-legend" aria-label={P.stagesTitle}>
            <li><StageIcon status="done" label={P.done} /><span>{P.done}</span></li>
            <li><StageIcon status="progress" label={P.inProgress} /><span>{P.inProgress}</span></li>
            <li><StageIcon status="pending" label={P.pending} /><span>{P.pending}</span></li>
          </ul>
        </div>
      </section>
    </>
  )
}
