import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BannerSobreProyecto(){
    return (
        <div className="banner-sobre-proyecto">
            <div className="banner-image"></div>
            <div className="content has-background-orange">
                <div className="title is-size-2">
                    Sobre el Proyecto
                    <p className="ml-2 has-text-weight-light is-italic is-size-5">
                        *Sobre o Projeto
                    </p>
                </div>
                <div className="description">
                    El objetivo de esta plataforma es facilitar el proceso de
                    participación en el espacio digital para construir el Pacto
                    Interciudad, donde personas ciudadanas y asambleístas
                    definirán colaborativamente su visión estratégica y política
                    a través de una serie de compromisos y principios clave para
                    afrontar la crisis climática desde sus ciudades en América
                    Latina.
                    <br />
                    <br />
                    <p className=" has-text-weight-light is-italic is-size-6">
                        *O objetivo desta plataforma é facilitar o processo de
                        participação digital para a construção do
                        Pacto-Intercidades, onde cidadãos e membros da
                        assembleia definem colaborativamente sua visão
                        estratégica e política, por meio de uma série de
                        compromissos e princípios chave para enfrentar a crise
                        climática em suas cidades na América Latina.
                    </p>
                </div>
                <Link href="/sobre" className="button has-text-orange">
                    <div className="is-flex is-flex-direction-column">
                        <p className="mb-0">Conoce más</p>
                        <p className="has-text-weight-light is-italic is-size-7">
                            *Saiba mais
                        </p>
                    </div>
                    <FontAwesomeIcon className="ml-3" icon={faArrowRight} />
                </Link>
            </div>
        </div>
    );
}