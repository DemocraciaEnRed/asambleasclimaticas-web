// The back office talks to one store with this interface:
//
//   session()               -> { email } | null
//   onAuth(cb)              -> unsubscribe()       cb(session) on login/logout
//   signIn(email)           -> { session } (local) | { sent: true } (Supabase sends a magic link)
//   signOut()
//   list(table)             -> rows                table: 'events' | 'resources' | 'messages'
//   save(table, row)        -> saved row           creates when row.id is empty
//   saveMany(table, rows)                          bulk update (reordering)
//   remove(table, id)
//
// With NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set at build time it uses Supabase;
// otherwise a local store in this browser, seeded from src/content, so the UI works before Supabase exists.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const MODE = SUPABASE_URL && SUPABASE_KEY ? 'supabase' : 'local'

let store
export function getStore() {
  store ||= (MODE === 'supabase' ? import('./supabase') : import('./local')).then((m) => m.createStore())
  return store
}
