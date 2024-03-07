'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    {
        'name': 'Acerca de',
        'url': '/sobre'
    },
    {
        'name': 'Cómo participar',
        'url': '/sobre/como-participar'
    },
    {
        'name': 'Contacto',
        'url': '/sobre/contacto'
    }
]

export default function AboutNavLinks(){

    const pathname = usePathname()

    return(<div className='static-info-nav'>
    {links.map((link, i) => (
        <Link
            className={`button-section ${pathname === link.url ? 'has-text-primary' : ''}`}
            href={link.url}
            key={i}>
            {link.name}
        </Link>
    ))}
</div>)
}