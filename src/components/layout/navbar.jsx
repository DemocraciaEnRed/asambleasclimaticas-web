'use client'
import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { handleOverlay } from "@/store/reducers/config";
import { handleLanguage } from "@/store/reducers/language";


export default function Navbar() {
    const {language} = useSelector((state)=>state.language)
    const [menuOpen, setMenuOpen] = useState(false)
    const [navbarFixed, setNavbarFixed] = useState(false)
    
    const pathname = usePathname()
    const dispatch = useDispatch()

    const handleChangeLanguage = (language)=>{
        dispatch(handleLanguage(language))
    }

    const handleOpenMenu = ()=>{
        if(window.innerWidth < 768) {
            setMenuOpen(!menuOpen)
            dispatch(handleOverlay())
        }
    }

    const controlNavbar = ()=>{
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
        <nav className={`navbar-wrapper ${navbarFixed ?'navbar is-fixed-top':''}`}>
            <div className='logo'>
            <Link href="/" >
                <h1>
                    ac
                </h1>
            </Link>

            </div>
            <div className="menu-navbar is-hidden-tablet is-flex is-align-items-center mr-5" onClick={handleOpenMenu}>
                <FontAwesomeIcon icon={faBars}  />
            </div>
            <div className={`navbar-links ${!menuOpen ? 'is-hidden-mobile': ''}`}>
                <ul >
                    <li className={pathname == "/" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar has-text-weight-bold' href="/" >
                            <span>
                                Inicio
                            </span>
                        </Link>
                    </li>
                    <li className={pathname == "/pacto" ? 'active' : ""}>
                        <Link onClick={handleOpenMenu} className='link-navbar has-text-weight-bold' href="/pacto" >
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
                    
                    
                    <li>
                        <Link href="/login" className="link-navbar has-text-weight-bold login-link">
                        login</Link>
                    </li>
                </ul>
                <FontAwesomeIcon icon={faXmark} className="is-hidden-tablet"  onClick={handleOpenMenu}/>
            </div>
        </nav>
    )

}