'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSquareTwitter, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";


export default function Footer() {


    return (
        <footer className='footer-wrapper section'>
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-4 has-text-centered-mobile">
                        <Image
                        width={200}
                        height={200}
                        sizes="100vw"
                        src="/images/logoSimpleDark.svg"
                        alt="logo resurgentes" />
                    </div>
                    <div className="column is-4">
                        <ul className="is-flex is-flex-direction-row is-justify-content-center">
                            <li >
                                <a className="has-text-black px-2" href="https://twitter.com/resurgentesLat" target="_blank" >
                                    <FontAwesomeIcon icon={faSquareTwitter} size="2x"/>
                                </a>
                            </li>
                            <li >
                                <a className="has-text-black px-2" href="https://www.instagram.com/resurgenteslat" target="_blank"  >
                                    <FontAwesomeIcon icon={faInstagram} size="2x"/>
                                </a>
                            </li>
                            <li >
                                <a className="has-text-black px-2" href="https://www.facebook.com/ResurgentesLat" target="_blank"  >
                                    <FontAwesomeIcon icon={faSquareFacebook} size="2x"/>
                                </a>
                            </li>
                        </ul>

                    </div>
                    <div className="column is-4">
                        <div className="columns is-mobile">
                            <div className="column is-6-desktop is-12-tablet is-12-mobile has-text-right-tablet has-text-centered-mobile">
                                <ul>
                                    <li>
                                        <Link className="has-text-black" href="#">
                                            ¿Cómo funciona?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="has-text-black" href="/sobre">
                                            Acerca de este sitio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="has-text-black" href="/sobre/contacto">
                                            Contacto
                                        </Link>
                                    </li>
                                    <li className="is-hidden-desktop">
                                        <Link className="has-text-black" href="#">
                                            Términos y condiciones
                                        </Link>
                                    </li>
                                    <li className="is-hidden-desktop">
                                        <Link className="has-text-black" href="#">
                                            Políticas de privacidad
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="column is-6 is-hidden-touch has-text-right-tablet has-text-centered-mobile">
                                <ul>
                                    <li>
                                        <Link className="has-text-black" href="#">
                                            Términos y condiciones
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="has-text-black" href="#">
                                            Políticas de privacidad
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}