import Link from "next/link";

import { CARD_PARTICIPATIVO } from "@/utils/constants";
import TypeformCardHome from "@/components/home/typeform-card-home";
import Image from "next/image";

export function BannerParticipativo() {
    return (
        <div
            className="banner-participativo has-text-centered has-background-cream py-6"
            id="banner-participativo"
        >
            <div className="container">
                <h1 className="has-text-color-white has-text-centered is-size-2 is-size-4-touch has-text-weight-bold">
                    ¿Cómo Participar?
                </h1>
                <div className="columns" id="columns-participativo">
                    {CARD_PARTICIPATIVO.map((card, idx) => (
                        <div className="column is-flex" key={idx}>
                            <div
                                className="card m-3 py-4 is-flex is-flex-direction-column "
                                >
                                <div className="card-image pt-5 has-text-centered">
                                    <Image
                                        src={`/icon/${card.icon}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="icon-card"
                                        alt=""
                                    />
                                </div>
                                <div className="card-content py-0 has-text-centered has-text-white is-flex-grow-1 is-flex is-flex-direction-column ">
                                    <div className="title is-size-3 is-size-4-touch">
                                        {card.title_es}
                                        <h5 className="is-size-5 is-italic">
                                            {card.title_pt}
                                        </h5>
                                    </div>
                                    <div className="card-description">
                                        <p className="has-text-weight-bold is-size-5">
                                            {card.description_es}
                                        </p>
                                        <p className="is-size-6 is-italic">
                                            {card.description_pt}
                                        </p>
                                    </div>
                                </div>
                                <footer className="card-footer is-justify-content-center py-4">
                                    <Link
                                        href={card.button_action}
                                        className="button is-rounded has-background-white has-text-black is-uppercase w-75"
                                        >
                                        {card.button_text}
                                    </Link>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="columns" id="columns-typeform">
                    <div className="column">

                        <TypeformCardHome typeformId="GXLzKp8e" />
                    </div>
                </div>
                <Link
                    id="boton-conocer-mas"
                    href="#banner-pacto"
                    className="button is-rounded is-uppercase is-cream has-text-brown has-text-weight-bold px-4"
                    >
                    <div className="is-flex is-flex-direction-column">
                        <p>conoce más</p>
                        <p className="has-text-weight-light is-italic is-size-7">
                            *Saiba mais
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}