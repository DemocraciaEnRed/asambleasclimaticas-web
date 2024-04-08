import Link from "next/link";

import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Acercade() {

    return (<section className='contacto'>
        <h2 className="has-text-pink is-size-2">
                Contacto
            </h2>
        <div className='static-info-wrapper-content'>
            <p>
            Puedes contactar al equipo de Resurgentes escribiendo un correo a <Link href="mailto:resurgentes.latam@gmail.com">resurgentes.latam@gmail.com</Link>
            </p>
            <div className="link-section">
            <h3 className="has-text-primary has-text-weight-bold is-size-3 mt-6 mb-3">
                    Quiénes somos
                </h3>
                <h4 className="has-text-primary is-size-5 has-text-weight-bold">Delibera Brasil (Brasil)</h4>
                <Link target="_blank" href="https://deliberabrasil.org/">deliberabrasil.org</Link>
                <h4 className="has-text-primary is-size-5 has-text-weight-bold">Ideemos (Colombia)</h4>
                <Link target="_blank" href="https://ideemos.org/">ideemos.org</Link>
                <h4 className="has-text-primary is-size-5 has-text-weight-bold">Extituto (Colombia)</h4>
                <Link target="_blank" href="https://www.extituto.org/">extituto.org</Link>
                <h4 className="has-text-primary is-size-5 has-text-weight-bold">Democracia en Red (Argentina)</h4>
                <Link target="_blank" href="https://democraciaenred.org/">democraciaenred.org</Link>
                <h4 className="has-text-primary is-size-5 has-text-weight-bold">Sur - Instituto del Sur Urbano (México)</h4>
                <Link target="_blank" href="https://surinstitute.com/">surinstitute.com</Link>
            </div>
        </div>
    </section>)
}
