'use client'
import { useEffect } from 'react'

// La raíz solo elige el idioma: los navegadores en portugués van a /pt/, el resto a /es/.
export default function Root() {
  useEffect(() => {
    const lang = (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'es'
    window.location.replace(`/${lang}/`)
  }, [])
  return <noscript><a href="/es/">Español</a> · <a href="/pt/">Português</a></noscript>
}
