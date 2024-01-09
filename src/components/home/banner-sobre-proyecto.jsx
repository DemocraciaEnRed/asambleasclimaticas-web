import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BannerSobreProyecto(){
    return <div className="banner-sobre-proyecto">
        <div className="banner-image">

        </div>
        <div className="content has-background-orange">
            <div className="title is-size-2">Sobre el Proyecto
            <p className="ml-2 has-text-weight-light is-italic is-size-5">
            *Sobre o Projeto
            </p>
            </div>
            <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.
                Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra, Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.
                <br /><br />
                <p className="ml-2 has-text-weight-light is-italic is-size-6">
                    *Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.
                </p>
            </div>
            <Link href="/sobre" className="button has-text-orange">Conoce más <FontAwesomeIcon className="ml-3" icon={faArrowRight}/></Link>
        </div>
    </div>
}