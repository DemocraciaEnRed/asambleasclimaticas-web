

"use client"
import Link from 'next/link'
import { usePathname } from "next/navigation"

export default function ProfileSideMenu({ children }) {

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
        <li><Link href="/perfil" className={isRouteActive('/perfil', true) ? 'is-active' : ''}>Mi perfil</Link></li>
        <li><Link href="/perfil/password" className={isRouteActive('/perfil/password', true) ? 'is-active' : ''}>Cambiar contraseña</Link></li>
        {/* <li><Link href="/perfil/email" className={isRouteActive('/perfil/email', true) ? 'is-active' : ''}>Cambiar email</Link></li> */}
      </ul>
    </aside>
  );
}