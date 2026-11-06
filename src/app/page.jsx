'use client'
import { useEffect } from 'react'

// The root only picks a language: Portuguese browsers go to /pt/, everyone else to /es/.
export default function Root() {
  useEffect(() => {
    const lang = (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'es'
    window.location.replace(`/${lang}/`)
  }, [])
  return <noscript><a href="/es/">Español</a> · <a href="/pt/">Português</a></noscript>
}
