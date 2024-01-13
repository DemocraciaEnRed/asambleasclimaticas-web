'use client'
import { faFacebook, faInstagram, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FacebookShareButton, FacebookShareCount, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"

const SharedProjectButton = ({ project }) => {
    const [show, setShow] = useState(false)
    const url = window.location.origin

    return (
        <div className={`dropdown ${show ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
                <button className="button shared-button px-3 " onClick={() => setShow(!show)}>
                    <span className="is-hidden-touch" >
                        Compartir proyecto
                    </span>
                    <span className="is-hidden-desktop" >
                        Compartir
                    </span>
                    <FontAwesomeIcon className="is-hidden-touch" icon={faShareNodes} />
                </button>

            </div>
            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                <div className="dropdown-content">
                    <div className="dropdown-item has-text-centered">
                        <p>Compartí este proyecto en </p>
                    </div>
                    <hr className="dropdown-divider"/>
                    <div className="is-flex is-justify-content-space-evenly">

                        <FacebookShareButton
                            url={`https://pacto.resurgentes.org/pacto/${project.slug}`}
                            hashtag="#pactoInterCiudad">
                            <FontAwesomeIcon size="2xl" icon={faFacebook} className="has-text-primary" />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={`https://pacto.resurgentes.org/pacto/${project.slug}`}
                            hashtag="#pactoInterCiudad"
                            title="mira este proyecto de proteccion ambiental"
                        >
                            <FontAwesomeIcon size="2xl" icon={faXTwitter} className="has-text-black" />
                        </TwitterShareButton>
                        <WhatsappShareButton
                            url={`https://pacto.resurgentes.org/pacto/${project.slug}`}
                            title="mira este proyecto de proteccion ambiental"
                            style={{ color: "#25D366" }}
                        >
                            <FontAwesomeIcon size="2xl" icon={faWhatsapp} />
                        </WhatsappShareButton>
                       
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SharedProjectButton