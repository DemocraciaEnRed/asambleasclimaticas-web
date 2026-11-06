import Agenda from '@/components/Agenda'
import { Cutout, Paren } from '@/components/bits'
import { agendaFor, link, tint } from '@/lib/site'
import { getDictionary } from './dictionaries'

export default async function Home({ params: { lang } }) {
  const t = await getDictionary(lang)
  const cities = Object.fromEntries(t.assemblies.map((a) => [a.code, a.city]))

  return (
    <>
      {/* Key visual: blurred city, cream cutouts bleeding off the edges. The header floats over it. */}
      <section className="kv">
        <Cutout code="co" className="kv-left" />
        <Cutout code="br" className="kv-right" />
        <div className="kv-inner wrap">
          <p className="caps kv-tag">{t.tagline}</p>
          <h1>{t.home.title}</h1>
          <Paren href={link(lang, 'asambleas/')} light>{t.home.cta}</Paren>
        </div>
      </section>

      <section className="intro wrap">
        <h2>{t.home.whatTitle}</h2>
        <div className="intro-text">
          {t.home.what.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="posters-wrap">
        <h2 className="wrap">{t.home.assembliesTitle}</h2>
        <div className="posters">
          {t.assemblies.map((a) => (
            <a key={a.code} className="poster" href={link(lang, `asambleas/${a.code}/`)} style={tint(a.code)}>
              <Cutout code={a.code} className="poster-art" />
              <span className="poster-num">({a.people})</span>
              {/* Text sits on a cream paper label: legible on every brand color, pink included. */}
              <span className="poster-label">
                <span className="caps">{a.country}</span>
                <span className="poster-city">{a.city}</span>
                <span className="poster-q">{a.topic}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="process wrap">
        <h2>{t.process.title}</h2>
        <ol>
          {t.process.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="after">
        <div className="wrap">
          <h2>{t.home.afterTitle}</h2>
          <ul>
            {t.assemblies.map((a) => (
              <li key={a.code} style={tint(a.code)}>
                <span className="after-city">{a.city}</span>
                <span className="after-status">{a.status}</span>
              </li>
            ))}
          </ul>
          <Paren href={link(lang, 'incidencia/')} light>{t.home.afterCta}</Paren>
        </div>
      </section>

      <section className="wrap home-agenda">
        <div className="section-head">
          <h2>{t.home.agendaTitle}</h2>
          <Paren href={link(lang, 'agenda/')}>{t.home.agendaCta}</Paren>
        </div>
        <Agenda t={t} lang={lang} initial={agendaFor(lang)} cities={cities} limit={3} />
      </section>

      <section className="pacto">
        <div className="wrap pacto-grid">
          <h2>{t.pacto.title}</h2>
          <div>
            <p>{t.pacto.text}</p>
            <Paren href={t.pacto.url}>{t.pacto.cta}</Paren>
          </div>
        </div>
      </section>
    </>
  )
}
