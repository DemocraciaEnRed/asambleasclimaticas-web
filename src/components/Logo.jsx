/* eslint-disable @next/next/no-img-element */

// The full lockup PNG has the tagline baked in at a size that becomes unreadable
// below ~20rem. Small sizes show only the wordmark (cropped from the same file)
// and set the tagline as live text, so it stays legible, selectable and translatable.
export default function Logo({ lang, light, tagline }) {
  return (
    <span className={`logo ${light ? 'is-light' : ''}`}>
      <img className="logo-mark" src={`/images/marca/logo-${lang}${light ? '-crema' : ''}.png`} alt="" width="1145" height="449" />
      <span className="logo-tag caps">{tagline}</span>
    </span>
  )
}
