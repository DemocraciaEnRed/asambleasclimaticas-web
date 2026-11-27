# Conectar el backoffice a Supabase

Mientras no haya Supabase, `/admin/` funciona en **modo local**: entra cualquier contraseña, los datos salen de `src/content/*.json` y los cambios quedan en el navegador (se publican con *Exportar JSON* y un commit). Cuando el build tiene las dos variables de abajo, el mismo backoffice pasa a leer y escribir en Supabase, y el sitio público toma la agenda y el formulario de contacto de ahí.

## Pasos

1. **Crear el proyecto** en supabase.com (región São Paulo, `sa-east-1`).
2. **Esquema y permisos:** SQL Editor → pegar [`schema.sql`](schema.sql) → Run.
3. **Contenido actual:** `npm run seed:sql` regenera [`seed.sql`](seed.sql) desde `src/content`; pegarlo en el SQL Editor → Run.
4. **Cuenta del equipo (contraseña única):** el login de `/admin` solo pide una contraseña, compartida por el equipo.
   - Authentication → Users → *Add user* → *Create new user*: email `admin@resurgentes.org` (es `ADMIN_EMAIL` en `src/lib/admin/store.js`), la contraseña del equipo y *Auto Confirm User* marcado. No se manda ningún mail.
   - En SQL: `insert into public.editors (email) values ('admin@resurgentes.org');`
   - Hacen falta las dos cosas: la cuenta permite entrar y la tabla `editors` da permiso para editar.
   - Para cambiar la contraseña: Authentication → Users → esa cuenta → cambiar contraseña.
5. **Cerrar el registro:** desactivar *Allow new users to sign up* (Authentication → Sign In / Providers), así nadie más puede crearse una cuenta con la anon key. No hace falta configurar Site URL ni Redirect URLs.
6. **Variables del build:** en GitHub, Settings → Secrets and variables → Actions → **Variables**:
   - `SUPABASE_URL`: Project Settings → API → Project URL
   - `SUPABASE_ANON_KEY`: la clave `anon` / *publishable*. Es pública por diseño: lo que protege los datos son las reglas RLS de `schema.sql`. **Nunca** usar la `service_role`.

   Para desarrollo local, copiar `.env.example` a `.env.local` con los mismos valores.
7. **Rebuild automático (opcional):** Database → Webhooks → nuevo webhook en `events` y `resources` (insert, update, delete):
   - `POST https://api.github.com/repos/<org>/<repo>/dispatches`
   - Headers: `Authorization: Bearer <token de GitHub con permiso Contents: write sobre el repo>`, `Accept: application/vnd.github+json`
   - Body: `{"event_type":"content"}`

   Sin esto, la agenda igual se actualiza en vivo en el navegador; el rebuild solo refresca el HTML estático (SEO y primera carga).

## Pendiente después de conectar

- Que el build lea agenda y biblioteca desde Supabase (hoy el HTML estático sigue saliendo de `src/content`, y la agenda se refresca en el navegador).
- Biblioteca en vivo en el sitio público (hoy solo la agenda se refresca desde Supabase).
- Aviso por email cuando entra un mensaje (Edge Function + Resend) y Cloudflare Turnstile si aparece spam.
