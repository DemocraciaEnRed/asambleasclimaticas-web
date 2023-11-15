'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSquareTwitter, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";


export default function Footer() {

    return (
        <footer className='footer-wrapper'>
            <div className='logo'>
                <Link href="/" >
                    <h1>
                        ac
                    </h1>
                </Link>

            </div>
            <ul className="footer-rrss">
                <li >
                    <Link className='link-footer has-text-weight-bold' href="https://twitter.com/fundacionDER" target="_blank" >
                        <FontAwesomeIcon icon={faSquareTwitter} />
                    </Link>
                </li>
                <li >
                    <Link className='link-footer has-text-weight-bold' href="https://www.instagram.com/democraciaenred" target="_blank"  >
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                </li>
                <li >
                    <Link className='link-footer has-text-weight-bold' href="https://www.facebook.com/democraciaenred" target="_blank"  >
                        <FontAwesomeIcon icon={faSquareFacebook} />
                    </Link>
                </li>
            </ul>
            <div className="footer-links">

            <ul >
                <li>
                    <Link href="">
                        ¿Como funciona?
                    </Link>
                </li>
                <li>
                    <Link href="">
                        Acerca de este sitio
                    </Link>
                </li>
                <li>
                    <Link href="">
                        Contacto
                    </Link>
                </li>
            </ul>

            <ul>
                <li>
                    <Link href="">
                        Terminos y condiciones
                    </Link>
                </li>
                <li>
                    <Link href="">
                        Politica de privacidad
                    </Link>
                </li>
            </ul>
            </div>

        </footer>
    )

}