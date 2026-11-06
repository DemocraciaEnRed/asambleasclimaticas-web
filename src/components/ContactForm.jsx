'use client'
import { useState } from 'react'
import { CONTACT_URL } from '@/lib/site'

// Posts JSON to the back office. The field names are the contract the backend has to accept.
export default function ContactForm({ t }) {
  const C = t.contactPage
  const [state, setState] = useState('idle') // idle | sending | sent | error

  async function submit(ev) {
    ev.preventDefault()
    const form = ev.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.website) return // honeypot: bots fill hidden fields
    if (!CONTACT_URL) return setState('offline')
    setState('sending')
    try {
      const r = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang: t.lang }),
      })
      if (!r.ok) throw new Error(r.status)
      form.reset()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="icon" style={{ '--icon': 'url(/images/iconos/07.svg)' }} aria-hidden="true" />
        <p className="lead">{C.sent}</p>
        <button type="button" className="paren caps" onClick={() => setState('idle')}>
          <span aria-hidden="true">(</span>{C.another}<span aria-hidden="true">)</span>
        </button>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={submit} noValidate={false}>
      <label>
        <span className="caps">{C.name}</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span className="caps">{C.email}</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span className="caps">{C.country}</span>
        <select name="country" defaultValue="">
          <option value="" disabled>{C.choose}</option>
          {C.countries.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label>
        <span className="caps">{C.reason}</span>
        <select name="reason" defaultValue="">
          <option value="" disabled>{C.choose}</option>
          {C.reasons.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label className="wide">
        <span className="caps">{C.message}</span>
        <textarea name="message" rows={5} required />
      </label>
      <label className="hp" aria-hidden="true">
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="muted wide">{C.privacy}</p>
      <div className="wide form-end">
        <button type="submit" className="send" disabled={state === 'sending'}>
          <span className="icon" style={{ '--icon': 'url(/images/iconos/06.svg)' }} aria-hidden="true" />
          {state === 'sending' ? C.sending : C.send}
        </button>
        <p role="status" className="form-msg">
          {state === 'error' && C.error}
          {state === 'offline' && C.offline}
        </p>
      </div>
    </form>
  )
}
