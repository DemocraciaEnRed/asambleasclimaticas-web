
import Link from "next/link";

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

export default function Layout({children}) {
    console.log(children);

    return (
        <div className="acerca-de-wrapper">
            <div className='banner-wrapper has-background-primary'></div>
            <div className='static-info-wrapper'>
                <div className='static-info-nav'>
                    {links.map((link, i) => (
                        <Link
                            className={`button-section ${link.value ? 'active' : ''}`}
                            href={link.url}
                            key={i}>
                            {link.name}
                        </Link>
                    ))}
                </div>
                {children}
            </div>
        </div>
    )
}
