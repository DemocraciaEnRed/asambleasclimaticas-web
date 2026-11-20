// El backoffice habla con un único store que tiene esta interfaz:
//
//   session()               -> { email } | null
//   onAuth(cb)              -> unsubscribe()       cb(session) al entrar/salir
//   signIn(email)           -> { session } (local) | { sent: true } (Supabase envía un enlace mágico)
//   signOut()
//   list(table)             -> rows                table: 'events' | 'resources' | 'messages'
//   save(table, row)        -> saved row           crea si row.id está vacío
//   saveMany(table, rows)                          actualización en lote (reordenar)
//   remove(table, id)
//
// Con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY definidas al compilar usa Supabase;
// si no, un store local en este navegador, cargado desde src/content, así la interfaz funciona antes de tener Supabase.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const MODE = SUPABASE_URL && SUPABASE_KEY ? 'supabase' : 'local'

let store
export function getStore() {
  store ||= (MODE === 'supabase' ? import('./supabase') : import('./local')).then((m) => m.createStore())
  return store
}
