import { link, tint } from '@/lib/site'

// Every person drawn by lot is one brand cutout in their city's color.
// The rows read like the brand's pattern sheets; hovering a row lines its people up.
export default function People({ lang, assemblies, label }) {
  return (
    <ul className="people" aria-label={label}>
      {assemblies.map((a) => (
        <li key={a.code} style={tint(a.code)}>
          <a href={link(lang, `asambleas/${a.code}/`)} className="people-row">
            <span className="people-label">
              <span className="num">({a.people})</span>
              <span className="people-city">{a.city}</span>
            </span>
            <span className="people-field" aria-hidden="true">
              {Array.from({ length: a.people }, (_, i) => (
                <i key={i} style={{ '--r': `${((i * 47 + a.people * 13) % 90) - 45}deg` }} />
              ))}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
