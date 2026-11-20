'use client'
import { useState } from 'react'

// Compartir con los íconos web de la marca. En el celular, el menú nativo de compartir cubre todas las apps;
// en el resto, el botón copia el enlace. WhatsApp tiene su propio botón: es por donde circulan estos enlaces en la región.
export default function Share({ t, url, title }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const text = encodeURIComponent(title)

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title, url }) } catch { /* cancelado */ }
      return
    }
    await navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="share">
      <span className="caps">{t.labels.share}</span>
      <a className="share-btn" href={`https://wa.me/?text=${text}%20${u}`} target="_blank" rel="noopener noreferrer">
        <span className="icon" style={{ '--icon': 'url(/images/iconos/01.svg)' }} aria-hidden="true" />WhatsApp
      </a>
      <button type="button" className="share-btn" onClick={share}>
        <span className="icon" style={{ '--icon': 'url(/images/iconos/09.svg)' }} aria-hidden="true" />
        {copied ? t.labels.copied : t.labels.shareMore}
      </button>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={`https://x.com/intent/post?text=${text}&url=${u}`} target="_blank" rel="noopener noreferrer">X</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span className="sr" role="status">{copied ? t.labels.copied : ''}</span>
    </div>
  )
}
