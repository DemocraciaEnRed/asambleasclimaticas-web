'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBars, faXmark } from "@fortawesome/free-solid-svg-icons";


import Overlay from "../common/overlay";
import { faInstagram, faSquareFacebook, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import { useAuthContext } from "@/context/auth-context";


export default function Navbar() {
    const { user, logoutContext } = useAuthContext()
    const [menuOpen, setMenuOpen] = useState(false)
    const [navbarFixed, setNavbarFixed] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)

    const pathname = usePathname()


    const handleOpenMenu = () => {
        if (window.innerWidth < 768) {
            setMenuOpen(!menuOpen)
            setShowOverlay(!showOverlay)
        }
    }

    const controlNavbar = () => {
        if (window.scrollY > 300) setNavbarFixed(true)
        else setNavbarFixed(false)
    }

    const handleLogout = () => {
        logoutContext()
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
            <div className="menu-navbar is-hidden-tablet is-flex is-align-items-center mr-5 p-3 is-clickable" onClick={handleOpenMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={`navbar-links is-hidden-mobile`}>
                <ul className="link-list">
                    <li className={pathname == "/" ? 'active' : ""}>
                        <Link className='link-navbar has-text-weight-bold is' href="/" >
                            <span className="is-size-6 is-size-7-touch">
                                Inicio
                            </span>
                        </Link>
                    </li>
                    <li className={pathname == "/pacto" ? 'active' : ""}>
                        <Link className='link-navbar has-text-weight-bold' href="/pacto/pacto-inter-ciudad" >
                            <span className="is-size-6 is-size-7-touch">
                                Pacto
                            </span>
                        </Link>
                    </li>
                    <li className={pathname == "/acerca-de" ? 'active' : ""}>
                        <Link className='link-navbar has-text-weight-bold' href="/sobre" >
                            <span className="is-size-6 is-size-7-touch">
                                Sobre
                            </span>
                        </Link>
                    </li>
                    <li className="is-flex is-align-items-center is-hidden-mobile">
                        {user ? <div className="dropdown is-right is-hoverable mr-4 user-avatar">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                    <span>{user.name}</span>

                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                <div className="dropdown-content">
                                    {user.role === 'admin' &&
                                        <>
                                            <div className="dropdown-item">
                                                <Link href="/admin"> Panel de administración</Link>
                                            </div>
                                            <hr className="dropdown-divider" />
                                            <div className="dropdown-item">
                                                <Link href="/pacto/nuevo"> Nuevo pacto </Link>
                                            </div>
                                            <div className="dropdown-item">
                                                <Link href="/admin/proyectos"> Listar pactos</Link>
                                            </div>
                                            <hr className="dropdown-divider" />
                                        </>
                                    }
                                    <a className="dropdown-item" onClick={handleLogout}>
                                        Cerrar sesión
                                    </a>
                                </div>
                            </div>
                        </div>
                            :
                            <Link href="/auth/login" className="link-navbar has-text-weight-bold login-link ">
                                login</Link>}

                    </li>
                </ul>
                <div className="foot-navbar is-hidden-tablet">
                    <ul className="footer-links">
                        <li>
                            <Link className="has-text-white is-size-7-touch my-2" href="#">
                                Términos y condiciones
                            </Link>
                        </li>
                        <li>
                            <Link className="has-text-white is-size-7-touch my-2" href="#">
                                Políticas de privacidad
                            </Link>
                        </li>
                    </ul>
                    <ul className="footer-rrss">
                        <li >
                            <Link className='link-footer has-text-weight-bold has-text-brown' href="https://twitter.com/fundacionDER" target="_blank" >
                                <FontAwesomeIcon icon={faSquareTwitter} />
                            </Link>
                        </li>
                        <li >
                            <Link className='link-footer has-text-weight-bold has-text-brown' href="https://www.instagram.com/democraciaenred" target="_blank"  >
                                <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                        </li>
                        <li >
                            <Link className='link-footer has-text-weight-bold has-text-brown' href="https://www.facebook.com/democraciaenred" target="_blank"  >
                                <FontAwesomeIcon icon={faSquareFacebook} />
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
        <div className={`navbar-mobile-links is-hidden-tablet ${menuOpen ? 'active' : ''}`}>
            <div className="header-navbar is-flex is-justify-content-space-between is-align-items-center w-100 py-4 pl-4">
                <img src="/images/logoSimple.svg" alt="" />
                <FontAwesomeIcon icon={faXmark} className=" mr-5 p-3 is-clickable" color="white" onClick={handleOpenMenu} />
            </div>
            <ul className="link-list">
                <li className="is-flex is-align-items-center pb-4 ">
                    {user ? <div className="dropdown is-right is-hoverable user-avatar m-4">
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                <span>{user.name}</span>

                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                            <div className="dropdown-content">
                                {user.role === 'admin' &&
                                    <>
                                        <div className="dropdown-item">
                                            <Link href="/admin"> Panel de administración</Link>
                                        </div>
                                        <hr className="dropdown-divider" />
                                        <div className="dropdown-item">
                                            <Link href="/pacto/nuevo"> Nuevo pacto </Link>
                                        </div>
                                        <div className="dropdown-item">
                                            <Link href="/admin/proyectos"> Listar pactos</Link>
                                        </div>
                                        <hr className="dropdown-divider" />
                                    </>
                                }
                                <a className="dropdown-item" onClick={handleLogout}>
                                    Cerrar sesión
                                </a>
                            </div>
                        </div>
                    </div>
                        :
                        <Link onClick={handleOpenMenu} href="/auth/login" className="link-navbar has-text-weight-bold login-link ">
                            login</Link>}

                </li>
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
            </ul>
            <div className="foot-navbar is-hidden-tablet">
                <ul className="footer-links">
                    <li>
                        <Link className="has-text-white is-size-7-touch my-2" href="#">
                            Términos y condiciones
                        </Link>
                    </li>
                    <li>
                        <Link className="has-text-white is-size-7-touch my-2" href="#">
                            Políticas de privacidad
                        </Link>
                    </li>
                </ul>
                <ul className="footer-rrss">
                    <li >
                        <Link className='link-footer has-text-weight-bold has-text-brown' href="https://twitter.com/fundacionDER" target="_blank" >
                            <FontAwesomeIcon icon={faSquareTwitter} />
                        </Link>
                    </li>
                    <li >
                        <Link className='link-footer has-text-weight-bold has-text-brown' href="https://www.instagram.com/democraciaenred" target="_blank"  >
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </li>
                    <li >
                        <Link className='link-footer has-text-weight-bold has-text-brown' href="https://www.facebook.com/democraciaenred" target="_blank"  >
                            <FontAwesomeIcon icon={faSquareFacebook} />
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
        <Overlay show={showOverlay} />
    </>
    )

}