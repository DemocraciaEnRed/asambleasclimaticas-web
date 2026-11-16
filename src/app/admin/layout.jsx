import { fontClasses } from '@/lib/fonts'
import AdminShell from '@/components/admin/AdminShell'

import '@/app/site.css'
import './admin.css'

export const metadata = {
  title: { absolute: 'Backoffice | (re)surgentes', template: '%s | Backoffice (re)surgentes' },
  robots: { index: false, follow: false },
}

// Separate root layout: no public header/footer and no analytics on the back office.
export default function AdminLayout({ children }) {
  return (
    <html lang="es" className={fontClasses}>
      <body className="adm">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}
