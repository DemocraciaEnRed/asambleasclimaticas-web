import Image from "next/image";

import { ALIANZAS } from "@/utils/constants";

export default function Acercade() {
    return (
        <section className="acerca-de">
            <h2 className="has-text-pink is-size-2">
                Acerca de
                <span className="is-italic is-size-3 has-text-weight-light is-block mt-2">
                    *Sobre
                </span>
            </h2>
            <div className="static-info-wrapper-content">
                <h1 className="has-text-primary is-size-4 mb-3">
                    ¿Qué es (Re)surgentes?
                    <span className="is-italic is-size-5 has-text-weight-light is-block my-2">
                        *O que é (Re)surgentes{" "}
                    </span>
                </h1>
                <div>
                    <p>
                        (Re)surgentes - Somos una red de organizaciones y
                        personas expertas en democracia deliberativa que
                        promueve la participación de personas ciudadanas,
                        especialistas, activistas y gobiernos locales en un
                        ciclo de Asambleas Climáticas y un Pacto Interciudad en
                        América Latina: Delibera Brasil, en Brasil; IDeemos, en
                        Colombia; Democracia en Red, en Argentina y SUR,
                        Instituto del Sur Urbano, en México.
                    </p>
                    <p className="is-italic pt-text mt-2">
                        *(Re)surgentes - Somos uma rede de Assembleias
                        Climáticas em cidades da América Latina, acompanhadas
                        por pessoas especializadas, governos locais e
                        organizações especializadas em democracia deliberativa:
                        SUR, Instituto del Sur Urbano, A.C. no México; Delibera
                        Brasil, no Brasil; IDeemos, na Colômbia; e Democracia en
                        Red, na Argentina. Nosso objetivo é fortalecer os
                        processos de democratização e descentralização da tomada
                        de decisões públicas diante da crise climática na
                        América Latina.
                    </p>
                </div>
                <h3 className="has-text-primary has-text-weight-bold is-size-4 mt-4 mb-3">
                    ¿Qué son las asambleas y el pacto inter-ciudad?
                    <span className="is-italic is-size-5 has-text-weight-light is-block my-2">
                        *O que são as assembleias e o pacto inter-cidades?
                    </span>
                </h3>
                <div>
                    <p>
                        Las Asambleas Climáticas son mecanismos de democracia
                        deliberativa, de discusión y reflexión, impulsadas para
                        que personas ciudadanas, seleccionadas al azar, asuman
                        un rol central en la toma de decisiones sobre el clima
                        en América Latina. Desde (Re)surgentes estamos por
                        comenzar un ciclo deliberativo en el año 2024 compuesto
                        por 4 Asambleas Climáticas consecutivas, en las ciudades
                        de Bujarú, Brasil; Buenaventura, Colombia; Mar del
                        Plata, Argentina y Monterrey, México. Además, iniciamos
                        un proceso paralelo de participación social en el
                        espacio digital para la construcción de un Pacto
                        Interciudad entre las Asambleas locales. El Pacto
                        Interciudad es un instrumento de incidencia pública,
                        construido de manera colaborativa, donde las personas y
                        ciudades definen una visión estratégica para afrontar la
                        crisis climática desde América Latina para el mundo.
                    </p>
                    <p className="is-italic pt-text mt-2">
                        *As Assembleias Climáticas são mecanismos de democracia
                        deliberativa que buscam assegurar que cidadãos
                        selecionados aleatoriamente desempenhem um papel central
                        na tomada de decisões sobre o clima na América Latina. A
                        partir de (Re)surgentes, estamos prestes a iniciar um
                        ciclo deliberativo em 2024, composto por 4 Assembleias
                        Climáticas consecutivas nas cidades de Bujarú, Brasil;
                        Buenaventura, Colombia, Mar del Plata, Argentina y
                        Monterrey, México. Assim como um processo de
                        participação digital paralelo para a construção de um
                        Pacto-Intercidades entre as Assembleias locais. O
                        Pacto-Intercidades é um instrumento de incidência
                        pública construído de forma colaborativa, onde pessoas e
                        cidades definem uma visão estratégica para enfrentar a
                        crise climática da América Latina para o mundo.
                    </p>
                </div>
                <h3 className="has-text-primary has-text-weight-bold is-size-4 mt-4 mb-3">
                    Alianzas / organizaciones participantes
                    <span className="is-italic is-size-5 has-text-weight-light is-block my-2">
                        *Parcerias / organizações participantes
                    </span>
                </h3>
                <div className="is-flex is-flex-wrap-wrap my-3">
                    {ALIANZAS.map((alianza, idx) => (
                        <Image
                            className="org-logo is-4 my-2 mx-5"
                            width={0}
                            height={0}
                            sizes="100vw"
                            key={idx}
                            src={`/images/logos/${alianza}.png`}
                            alt={"logo " + alianza}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
