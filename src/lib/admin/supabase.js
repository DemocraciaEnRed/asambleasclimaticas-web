import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY, ADMIN_EMAIL } from './store'
import { eventId } from './model'

// Store de Supabase. Las tablas y reglas de acceso están en supabase/schema.sql.
// "end" es palabra reservada en SQL, por eso la columna es end_date; la interfaz sigue usando `end`.

const toRow = {
  events: ({ end, updated_at, ...e }) => ({ ...e, end_date: end || null }),
  resources: ({ updated_at, ...r }) => r,
  messages: ({ id, status }) => ({ id, status }), // la bandeja solo cambia el estado
}
const fromRow = {
  events: ({ end_date, ...e }) => ({ ...e, end: end_date || '', place: e.place || '', url: e.url || '', text: e.text || { es: '', pt: '' } }),
  resources: (r) => ({ ...r, youtube: r.youtube || '' }),
  messages: (m) => m,
}
const ORDER = { events: ['date', false], resources: ['position', true], messages: ['created_at', false] }

const fail = (error) => { if (error) throw new Error(error.message) }

export function createStore() {
  const sb = createClient(SUPABASE_URL, SUPABASE_KEY)
  const asSession = (s) => (s?.user ? { email: s.user.email } : null)

  return {
    mode: 'supabase',
    async session() {
      const { data } = await sb.auth.getSession()
      return asSession(data.session)
    },
    onAuth(cb) {
      const { data } = sb.auth.onAuthStateChange((_event, s) => cb(asSession(s)))
      return () => data.subscription.unsubscribe()
    },
    async signIn(password) {
      // Contraseña única del equipo: Supabase la verifica contra la cuenta ADMIN_EMAIL.
      const { data, error } = await sb.auth.signInWithPassword({ email: ADMIN_EMAIL, password })
      if (error) throw new Error(error.message === 'Invalid login credentials' ? 'Contraseña incorrecta.' : error.message)
      return { session: asSession(data.session) }
    },
    async signOut() { await sb.auth.signOut() },

    async list(table) {
      const [col, ascending] = ORDER[table]
      const { data, error } = await sb.from(table).select('*').order(col, { ascending })
      fail(error)
      return data.map(fromRow[table])
    },
    async save(table, row) {
      const out = toRow[table](row)
      if (!out.id) {
        if (table === 'events') {
          const { data } = await sb.from('events').select('id')
          out.id = eventId(row, new Set((data || []).map((r) => r.id)))
        } else {
          delete out.id // uuid generado por la base de datos
        }
        if (table === 'resources') {
          const { data } = await sb.from('resources').select('position').order('position', { ascending: false }).limit(1)
          out.position = (data?.[0]?.position ?? -1) + 1
        }
      }
      const q = table === 'messages'
        ? sb.from(table).update({ status: out.status }).eq('id', out.id).select().single()
        : sb.from(table).upsert(out).select().single()
      const { data, error } = await q
      fail(error)
      return fromRow[table](data)
    },
    async saveMany(table, rows) {
      const { error } = await sb.from(table).upsert(rows.map(toRow[table]))
      fail(error)
    },
    async remove(table, id) {
      const { error } = await sb.from(table).delete().eq('id', id)
      fail(error)
    },
  }
}
