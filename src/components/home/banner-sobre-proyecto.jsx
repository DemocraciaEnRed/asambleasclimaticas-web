import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BannerSobreProyecto(){
    return <div className="banner-sobre-proyecto">
        <div className="banner-image">

        </div>
        <div className="content">
            <h1 className="title">Sobre el Proyecto</h1>
            <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.
            <br/><br/>
            Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.</p>
            <Link href="/acerca-de" className="button">Conoce más <FontAwesomeIcon className="ml-3" icon={faArrowRight}/></Link>
        </div>
    </div>
}