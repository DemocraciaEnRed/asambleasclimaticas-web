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
import { deleteCookie } from 'cookies-next';
import Overlay from "../common/overlay";


export default function Navbar() {
    const { user } = useSelector((state) => state.auth)
    const { language } = useSelector((state) => state.language)
    const [menuOpen, setMenuOpen] = useState(false)
    const [navbarFixed, setNavbarFixed] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)

    const pathname = usePathname()
    const dispatch = useDispatch()

    const handleChangeLanguage = (language) => {
        dispatch(handleLanguage(language))
    }

    const handleOpenMenu = () => {
        if (window.innerWidth < 768) {
            setMenuOpen(!menuOpen)
            setShowOverlay(!showOverlay)
            /* dispatch(handleOverlay()) */
        }
    }

    const controlNavbar = () => {
        if (window.scrollY > 300) setNavbarFixed(true)
        else setNavbarFixed(false)
    }

    const logOut = () => {
        //dispatch(handleToken(''))
        deleteCookie('auth')
        dispatch(deleteUser())
        window.location.reload(false);
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


    return (<>
        <nav className={`navbar-wrapper ${navbarFixed ? 'navbar-fixed' : ''}`}>
            <div className='logo py-3'>
                <Link href="/" className="is-flex is-align-items-center">
                    <img src="/images/logoSimple.svg" alt="" />
                    {/* <Logo color='#FFFFFF' /> */}
                </Link>

            </div>
            <div className="menu-navbar is-hidden-tablet is-flex is-align-items-center mr-5" onClick={handleOpenMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={`navbar-links ${!menuOpen ? 'is-hidden-mobile' : ''}`}>
                <ul >
                    <li className={pathname == "/" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar has-text-weight-bold' href="/" >
                            <span>
                                Inicio
                            </span>
                        </Link>
                    </li>
                    <li className={pathname == "/pacto" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar has-text-weight-bold' href="/pacto/pacto-inter-ciudad" >
                            <span>
                                Pacto
                            </span>
                        </Link>
                    </li>
                    <li className={pathname == "/acerca-de" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar has-text-weight-bold' href="/sobre" >
                            <span>
                                Sobre
                            </span>
                        </Link>
                    </li>


                    <li className="is-flex is-align-items-center">
                        {user ? <div className="dropdown is-right is-hoverable mr-4 user-avatar">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                    <span>{user.name}</span>

                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                <div className="dropdown-content">
                                    {/* user.role === 'admin' &&
                                        <>
                                            <div className="dropdown-item">
                                                <Link href="/pacto/nuevo"> Nuevo pacto </Link>
                                            </div>
                                            <hr className="dropdown-divider" />
                                        </> */
                                    }
                                    <a className="dropdown-item" onClick={logOut}>
                                        Cerrar sesión
                                    </a>
                                </div>
                            </div>
                        </div>
                            :
                            <Link onClick={handleOpenMenu} href="/auth/login" className="link-navbar has-text-weight-bold login-link ">
                                login</Link>}

                    </li>
                </ul>
                <FontAwesomeIcon icon={faXmark} className="is-hidden-tablet" onClick={handleOpenMenu} />
            </div>
        </nav>
    <Overlay show={showOverlay} />
    </>
    )

}