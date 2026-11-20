/* eslint-disable @next/next/no-img-element */

// El PNG del logo completo trae el lema incrustado a un tamaño que no se lee
// por debajo de ~20rem. En tamaños chicos se muestra solo el logotipo (recortado del mismo archivo)
// y el lema va como texto, así se lee, se puede seleccionar y se traduce.
export default function Logo({ lang, light, tagline }) {
  return (
    <span className={`logo ${light ? 'is-light' : ''}`}>
      <img className="logo-mark" src={`/images/marca/logo-${lang}${light ? '-crema' : ''}.png`} alt="" width="1145" height="449" />
      <span className="logo-tag caps">{tagline}</span>
    </span>
  )
}
