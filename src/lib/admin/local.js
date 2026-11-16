import agenda from '@/content/agenda.json'
import recursos from '@/content/recursos.json'
import { eventId } from './model'

// Local stand-in for Supabase: same interface, data kept in this browser's localStorage.
// Nothing leaves the browser; use "Exportar JSON" to take changes to src/content.

const KEY = 'resurgentes-admin:v1:'
const memory = {} // fallback when localStorage is blocked (private mode, disabled site data)

function read(name, seed) {
  try {
    const raw = localStorage.getItem(KEY + name)
    if (raw) return JSON.parse(raw)
  } catch {}
  return memory[name] ?? seed()
}

function write(name, value) {
  memory[name] = value
  try { localStorage.setItem(KEY + name, JSON.stringify(value)) } catch {}
}

const seeds = {
  events: () => agenda.map((e) => ({ end: '', place: '', url: '', text: { es: '', pt: '' }, ...e, published: true })),
  resources: () => recursos.map((r, i) => ({ youtube: '', ...r, id: `r${i + 1}`, position: i, published: true })),
  // Two sample messages so the inbox can be tried out. They never reach the public site.
  messages: () => [
    { id: 'm1', created_at: new Date(Date.now() - 864e5).toISOString(), name: 'Ejemplo: Ana Pereira', email: 'ana@example.org', country: 'Brasil', reason: 'Quiero una asamblea en mi ciudad', message: 'Mensaje de ejemplo del modo local. En producción acá llegan los mensajes del formulario de contacto.', lang: 'pt', status: 'new' },
    { id: 'm2', created_at: new Date(Date.now() - 6 * 864e5).toISOString(), name: 'Ejemplo: Redacción', email: 'prensa@example.org', country: 'Argentina', reason: 'Prensa', message: 'Otro mensaje de ejemplo, ya leído.', lang: 'es', status: 'read' },
  ],
}

const SESSION = 'session'

export function createStore() {
  const listeners = new Set()
  const emit = (s) => listeners.forEach((cb) => cb(s))
  const rows = (table) => read(table, seeds[table])

  return {
    mode: 'local',
    async session() { return read(SESSION, () => null) },
    onAuth(cb) { listeners.add(cb); return () => listeners.delete(cb) },
    async signIn(email) {
      const session = { email: email.trim().toLowerCase() }
      write(SESSION, session)
      emit(session)
      return { session }
    },
    async signOut() { write(SESSION, null); emit(null) },

    async list(table) { return rows(table) },
    async save(table, row) {
      const all = rows(table)
      const saved = { ...row, updated_at: new Date().toISOString() }
      if (!saved.id) {
        saved.id = table === 'events' ? eventId(saved, new Set(all.map((r) => r.id))) : `${table[0]}${Date.now()}`
        if (table === 'resources') saved.position = Math.max(-1, ...all.map((r) => r.position)) + 1
        write(table, [...all, saved])
      } else {
        write(table, all.map((r) => (r.id === saved.id ? saved : r)))
      }
      return saved
    },
    async saveMany(table, changed) {
      const byId = new Map(changed.map((r) => [r.id, r]))
      write(table, rows(table).map((r) => byId.get(r.id) || r))
    },
    async remove(table, id) { write(table, rows(table).filter((r) => r.id !== id)) },

    // Local only: throw away edits and start again from src/content.
    async reset() { ['events', 'resources', 'messages'].forEach((t) => write(t, seeds[t]())) },
  }
}
