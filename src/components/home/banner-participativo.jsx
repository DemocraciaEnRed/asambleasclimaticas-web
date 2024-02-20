
import { CARD_PARTICIPATIVO } from "@/utils/constants";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";



export function BannerParticipativo() {
    return <div className="banner-participativo has-text-centered has-background-cream py-6" id="banner-participativo">
        <h1 className="has-text-color-white has-text-centered is-size-2 is-size-4-touch has-text-weight-bold">¿Cómo Participar?</h1>
        <div className="card-group is-flex is-justify-content-center my-4">
            {CARD_PARTICIPATIVO.map(card =>
                <div className="card m-3 py-4 is-flex-grow-1 is-flex is-flex-direction-column">
                    <div className="card-image pt-5 has-text-centered">
                        <FontAwesomeIcon icon={card.icon} color="white" />
                    </div>
                    <div className="card-content py-0 has-text-centered has-text-white is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-space-evenly">
                        <p className="title is-size-4 is-size-5-touch">
                            {card.title_es}
                            <p className="is-size-6 is-italic">{card.title_pt}</p>
                        </p>
                        <div className="card-description">
                            <p>{card.description_es}</p>
                            <p className="is-size-7 is-italic">
                                {card.description_pt}
                            </p>
                        </div>
                    </div>
                    <footer className="card-footer is-justify-content-center py-4">
                        <button className="button is-rounded has-background-white has-text-black is-uppercase w-75">{card.button_text}</button>
                    </footer>
                </div>)}



        </div>
        <Link href="#banner-pacto" className="button is-rounded is-uppercase px-6 is-cream has-text-brown has-text-weight-bold">conoce más</Link>

    </div>
}