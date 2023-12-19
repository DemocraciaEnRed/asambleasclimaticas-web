'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";


import Logo from "../common/logo";
import { handleOverlay } from "@/store/reducers/config";
import { handleLanguage } from "@/store/reducers/language";
import { deleteUser, handleToken } from "@/store/reducers/auth";


export default function Navbar() {
    const { user } = useSelector((state) => state.auth)
    const { language } = useSelector((state) => state.language)
    const config = useSelector((state) => state.config)
    const [menuOpen, setMenuOpen] = useState(false)
    const [navbarFixed, setNavbarFixed] = useState(false)

    const pathname = usePathname()
    const dispatch = useDispatch()

    const handleChangeLanguage = (language) => {
        dispatch(handleLanguage(language))
    }

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
        window.addEventListener('scroll', controlNavbar);
        /* if (typeof window !== 'undefined') {
            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        } */
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
            <div className={`navbar-links w-50 has-text-white is-justify-content-center is-flex-grow-1 ${!menuOpen ? 'is-hidden-mobile' : ''}`}>
                {config.landingSkip && <ul >
                    <li className={pathname == "/" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar' href="/#" >
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



                </ul>}
                <FontAwesomeIcon icon={faXmark} className="is-hidden-tablet" onClick={handleOpenMenu} />
            </div>
            <div className="language-wrapper mr-3 w-25 has-text-right">
                <div className="dropdown is-hoverable ">
                    <div className="dropdown-trigger">
                        <button className="button is-uppercase has-text-white has-background-primary" aria-haspopup="true" aria-controls="dropdown-menu4">
                            <span>{language}</span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div className="dropdown-content has-background-primary">
                            <div className="dropdown-item is-size-6 is-uppercase has-text-white has-text-centered p-0 is-clickable" onClick={() => handleChangeLanguage(language === 'esp' ? 'prt' : 'esp')}>
                                <p>{language === 'esp' ? 'prt' : 'esp'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

}