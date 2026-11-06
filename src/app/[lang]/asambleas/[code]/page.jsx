import { Cutout, Paren, ResourceList, Share } from '@/components/bits'
import { SITE, link, resourcesFor, tint } from '@/lib/site'
import { getDictionary } from '../../dictionaries'

export function generateStaticParams() {
  return ['br', 'ar', 'co', 'mx'].map((code) => ({ code }))
}

export async function generateMetadata({ params: { lang, code } }) {
  const t = await getDictionary(lang)
  const a = t.assemblies.find((x) => x.code === code)
  return { title: a.city, description: a.topic }
}

export default async function Assembly({ params: { lang, code } }) {
  const t = await getDictionary(lang)
  const i = t.assemblies.findIndex((x) => x.code === code)
  const a = t.assemblies[i]
  const prev = t.assemblies[(i + 3) % 4]
  const next = t.assemblies[(i + 1) % 4]
  const all = resourcesFor(lang, code)
  const videos = all.filter((r) => r.youtube)
  const rest = all.filter((r) => !r.youtube)
  const L = t.labels

  return (
    <article style={tint(code)}>
      <header className="a-head">
        <Cutout code={code} className="a-head-art" />
        <div className="wrap a-head-inner">
          <p className="caps">{a.country}, {a.region}</p>
          <h1>{a.city}</h1>
          <p className="a-q">{a.topic}</p>
        </div>
      </header>

      <div className="a-facts">
        <dl className="wrap">
          <div><dd className="num">({a.people})</dd><dt>{L.people}</dt></div>
          <div><dd className="num">({a.sessions})</dd><dt>{L.sessions}</dt></div>
          <div><dt className="caps">{L.dates}</dt><dd>{a.dates}</dd></div>
          <div><dt className="caps">{L.status}</dt><dd><b>{a.status}</b></dd></div>
        </dl>
      </div>

      <div className="wrap a-body">
        <section>
          <h2>{L.how}</h2>
          {a.how.map((p) => <p key={p}>{p}</p>)}
          <p className="muted"><b>{L.leader}:</b> {a.leader}</p>
        </section>

        <section className="a-outcome">
          <h2>{L.outcome}</h2>
          <p className="big-quote">{a.outcome}</p>
        </section>

        <section>
          <h2>{L.after}</h2>
          <p>{a.after}</p>
          <ol className="trail">
            {a.milestones.map((m) => (
              <li key={m.what}>
                <span className="caps">{m.when}</span>
                <span>{m.what}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="caps small-title">{L.actors}</h2>
          <ul className="tags">{a.actors.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
      </div>

      {videos.length > 0 && (
        <section className="a-videos">
          <div className="wrap">
            <h2>{L.videos}</h2>
            <div className="video-grid">
              {videos.map((v) => (
                <figure key={v.youtube}>
                  <div className="video">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.youtube}`}
                      title={v.title}
                      loading="lazy"
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <figcaption>{v.title}, {v.source}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="wrap a-resources">
          <h2>{L.resources}</h2>
          <ResourceList t={t} items={rest} />
        </section>
      )}

      <div className="wrap a-end">
        <Share t={t} url={`${SITE}${link(lang, `asambleas/${code}/`)}`} title={`${a.city}: ${a.topic}`} />
        <nav className="a-pager" aria-label={t.nav.assemblies}>
          <Paren href={link(lang, `asambleas/${prev.code}/`)}>{L.prev}: {prev.city}</Paren>
          <Paren href={link(lang, `asambleas/${next.code}/`)}>{L.next}: {next.city}</Paren>
        </nav>
      </div>
    </article>
  )
}
