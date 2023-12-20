'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";


import { handleOverlay } from "@/store/reducers/config";
import { handleLanguage } from "@/store/reducers/language";
import { deleteUser, handleToken } from "@/store/reducers/auth";
import Logo from "@/app/_components/common/logo";
import LangSwitch from "../common/lang-switch";


export default function Navbar({ lang }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [navbarFixed, setNavbarFixed] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()

    const handleOpenMenu = () => {
        if (window.innerWidth < 768) {
            setMenuOpen(!menuOpen)
            dispatch(handleOverlay())
        }
    }

    const controlNavbar = () => {
        if (window.scrollY > 1) setNavbarFixed(true)
        else setNavbarFixed(false)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, []);


    return (
        <nav className={`navbar-wrapper has-background-primary is-align-items-center ${navbarFixed ? 'navbar is-fixed-top' : ''}`}>
            <div className='logo w-25 py-2'>
                <Link href="/" className="is-flex is-align-items-center">
                    <Logo color='#FFFFFF' widthLogo={window.innerWidth < 768 ? '150' : '250'} />
                </Link>

            </div>
            <div className="menu-navbar is-hidden-tablet is-flex is-align-items-center mr-5" onClick={handleOpenMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={`navbar-links has-text-white is-justify-content-center is-flex-grow-1 ${!menuOpen ? 'is-hidden-mobile' : ''}`}>
                <ul >
                    <li className={pathname == "/" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar' href="/" >
                            <span>
                                Inicio
                            </span>
                        </Link>
                    </li>
                    <li className={pathname == "/pacto" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar' href="#countries-banner" >
                            <span>
                                asambleas
                            </span>
                        </Link>
                    </li>
                    <li className={pathname == "/acerca-de" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar' href="#banner-interciudad" >
                            <span>
                                sobre
                            </span>
                        </Link>
                    </li>



                </ul>
                <FontAwesomeIcon icon={faXmark} className="is-hidden-tablet" onClick={handleOpenMenu} />
            </div>
            <LangSwitch lang={lang} />
        </nav>
    )

}