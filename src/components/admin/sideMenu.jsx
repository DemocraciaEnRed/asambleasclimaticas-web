

"use client"
import Link from 'next/link'
import { usePathname } from "next/navigation"

export default function AdminSideMenu({ children }) {

  const pathname = usePathname()

  const isRouteActive = (path, strict = false) => {
    // check if pathname (string) contains or starts with path (string)
    if(strict) return pathname === path

    if (pathname.includes(path)) {
      return true
    }

    return false
  }

  return (
    <aside className="menu">
      <ul className="menu-list">
        <li><Link href="/admin" className={isRouteActive('/admin', true) ? 'is-active' : ''}>Inicio</Link></li>
        <li><Link href="/admin/estadisticas" className={isRouteActive('/admin/estadisticas', true) ? 'is-active' : ''}>Estadisticas</Link></li>
      </ul>
      <p className="menu-label has-text-black has-text-weight-bold">
        Proyectos
      </p>
      <ul className="menu-list">
        <li>
          <Link href="/admin/proyectos" className={isRouteActive('/admin/proyectos', true) ? 'is-active' : ''}>Listar</Link>
        </li>
      </ul>
      <p className="menu-label has-text-black has-text-weight-bold">
        Usuarios
      </p>
      <ul className="menu-list">
        <li>
          <Link href="/admin/usuarios" className={isRouteActive('/admin/usuarios') ? 'is-active' : ''}>Listar</Link>
        </li>
        {/* <li><a>Administrar roles</a></li> */}
      </ul>
    </aside>
  );
}