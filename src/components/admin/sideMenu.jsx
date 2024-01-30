

"use client"
import Link from 'next/link'
import { usePathname } from "next/navigation"

export default function AdminSideMenu({ children }) {

  const pathname = usePathname()

  const isRouteActive = (path) => pathname === path;
  console.log('router', pathname)

  return (
    <aside className="menu">
      <ul className="menu-list">
        <li><Link href="/admin" className={isRouteActive('/admin') ? 'is-active' : ''}>Inicio</Link></li>
      </ul>
      <p className="menu-label has-text-black has-text-weight-bold">
        Proyectos
      </p>
      <ul className="menu-list">
        <li>
          <Link href="/admin/proyectos" className={isRouteActive('/admin/proyectos') ? 'is-active' : ''}>Listar</Link>
        </li>
      </ul>
      <p className="menu-label has-text-black has-text-weight-bold">
        Usuarios
      </p>
      <ul className="menu-list">
        <li>
          <Link href="/admin/usuarios" className={isRouteActive('/admin/usuarios') ? 'is-active' : ''}>Listar</Link>
        </li>
        <li><a>Administrar roles</a></li>
      </ul>
    </aside>
  );
}