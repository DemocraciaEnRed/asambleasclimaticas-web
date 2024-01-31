'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSquareTwitter, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import Logo from "../common/logo";


export default function Footer() {

    return (
        <footer className='footer-wrapper py-6'>
            <div className='logo'>
                <Link href="/" className="has-text-centered" >
                    <img src="/images/logoSimple.svg" alt="" />
                </Link>

            </div>
            <ul className="footer-rrss">
                <li >
                    <Link className='link-footer has-text-weight-bold has-text-black' href="https://twitter.com/fundacionDER" target="_blank" >
                        <FontAwesomeIcon icon={faSquareTwitter} />
                    </Link>
                </li>
                <li >
                    <Link className='link-footer has-text-weight-bold has-text-black' href="https://www.instagram.com/democraciaenred" target="_blank"  >
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                </li>
                <li >
                    <Link className='link-footer has-text-weight-bold has-text-black' href="https://www.facebook.com/democraciaenred" target="_blank"  >
                        <FontAwesomeIcon icon={faSquareFacebook} />
                    </Link>
                </li>
            </ul>
            <div className="footer-links">

            <ul >
                <li>
                    <Link className="has-text-black" href="">
                        ¿Cómo funciona?
                    </Link>
                </li>
                <li>
                    <Link className="has-text-black" href="/sobre">
                        Acerca de este sitio
                    </Link>
                </li>
                <li>
                    <Link className="has-text-black" href="">
                        Contacto
                    </Link>
                </li>
            </ul>

            <ul>
                <li>
                    <Link className="has-text-black" href="">
                        Términos y condiciones
                    </Link>
                </li>
                <li>
                    <Link className="has-text-black" href="">
                        Políticas de privacidad
                    </Link>
                </li>
            </ul>
            </div>

        </footer>
    )

}