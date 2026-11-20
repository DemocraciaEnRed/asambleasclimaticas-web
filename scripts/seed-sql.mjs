// Escribe supabase/seed.sql a partir de src/content/*.json, para que Supabase arranque con lo mismo que muestra hoy el sitio.
// Uso: npm run seed:sql
import { readFileSync, writeFileSync } from 'node:fs'

const read = (p) => JSON.parse(readFileSync(new URL(`../src/content/${p}`, import.meta.url), 'utf8'))
const q = (v) => (v == null || v === '' ? 'null' : `'${String(v).replaceAll("'", "''")}'`)
const j = (v) => (v && Object.keys(v).length ? `${q(JSON.stringify(v))}::jsonb` : 'null')

const events = read('agenda.json').map((e) =>
  `(${[q(e.id), q(e.date), q(e.end), q(e.precision || 'day'), q(e.kind), q(e.assembly), q(e.place), q(e.url), j(e.title), j(e.text)].join(', ')})`)

const resources = read('recursos.json').map((r, i) =>
  `(${[q(r.assembly), q(r.type), q(r.lang), q(r.source), j(r.title), q(r.url), q(r.youtube), i].join(', ')})`)

const sql = `-- Generado por scripts/seed-sql.mjs a partir de src/content. Correr después de schema.sql, sobre una base vacía.
begin;

insert into public.events (id, date, end_date, precision, kind, assembly, place, url, title, text) values
${events.join(',\n')}
on conflict (id) do nothing;

insert into public.resources (assembly, type, lang, source, title, url, youtube, position) values
${resources.join(',\n')};

commit;
`

writeFileSync(new URL('../supabase/seed.sql', import.meta.url), sql)
console.log(`supabase/seed.sql: ${events.length} events, ${resources.length} resources`)
