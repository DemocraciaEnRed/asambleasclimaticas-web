import { fontClasses } from '@/lib/fonts'
import AdminShell from '@/components/admin/AdminShell'

import '@/app/site.css'
import './admin.css'

export const metadata = {
  title: { absolute: 'Backoffice | (re)surgentes', template: '%s | Backoffice (re)surgentes' },
  robots: { index: false, follow: false },
}

// Layout raíz aparte: el backoffice no lleva el header/footer público ni analytics.
export default function AdminLayout({ children }) {
  return (
    <html lang="es" className={fontClasses}>
      <body className="adm">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}
