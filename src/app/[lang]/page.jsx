import People from '@/components/People'
import { Cutout, Paren, Partners, ResourceList } from '@/components/bits'
import { link, resourcesFor, tint } from '@/lib/site'
import { getDictionary } from './dictionaries'

export default async function Home({ params: { lang } }) {
  const t = await getDictionary(lang)
  const cities = Object.fromEntries(t.assemblies.map((a) => [a.code, a.city]))
  const picks = resourcesFor(lang).filter((r) => r.type === 'report').slice(0, 4)

  return (
    <>
      {/* Key visual: blurred city, cream cutouts bleeding off the edges. */}
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

      <section className="people-wrap wrap">
        <div className="people-head">
          <h2>{t.home.dotsTitle}</h2>
          <p className="muted">{t.home.dotsText}</p>
        </div>
        <People lang={lang} assemblies={t.assemblies} label={t.home.dotsTitle} />
      </section>

      <section className="posters-wrap">
        <h2 className="wrap">{t.home.assembliesTitle}</h2>
        <div className="posters">
          {t.assemblies.map((a) => (
            <a key={a.code} className="poster" href={link(lang, `asambleas/${a.code}/`)} style={tint(a.code)}>
              <Cutout code={a.code} className="poster-art" />
              <span className="poster-country caps">{a.country}</span>
              <span className="poster-city">{a.city}</span>
              <span className="poster-q">{a.topic}</span>
              <span className="poster-num">({a.people})</span>
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

      <section className="wrap home-library">
        <h2>{t.home.libraryTitle}</h2>
        <ResourceList t={t} items={picks} showAssembly cities={cities} />
        <Paren href={link(lang, 'biblioteca/')}>{t.home.libraryCta}</Paren>
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

      <Partners title={t.aboutPage.partnersTitle} />
    </>
  )
}
