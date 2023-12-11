import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

export function BannerParticipativo() {
    return <div className="banner-participativo has-text-centered has-background-cream py-6">
        <h1 className="has-text-color-white has-text-centered is-size-2 has-text-weight-bold">¿Cómo Participar?</h1>
        <div className="card-group is-flex is-justify-content-center my-4">
            <div className="card m-3 py-4">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faWhatsapp} color="white" />
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Comunidad de <br/> Whatsapp
                    </p>
                    <div className="content">
                        Comunidade do WhatsApp
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded has-background-white has-text-black is-uppercase w-75">Unite</button>
                </footer>
            </div>


            <div className="card m-3 py-4">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faComment} color="white"/>
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Comentarios <br/>Generales
                    </p>
                    <div className="content">
                        Comentários Gerais
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded has-background-white has-text-black is-uppercase w-75">Comenta</button>
                </footer>
            </div>



            <div className="card m-3 py-4">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faPenToSquare} color="white"/>
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Comentarios <br/>ESpecificos
                    </p>
                    <div className="content">
                        Comentários Específicos
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded has-background-white has-text-black is-uppercase w-75">aporta</button>
                </footer>
            </div>



            <div className="card m-3 py-4">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faSquarePollHorizontal} color="white"/>
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Completa las <br/>encuestas
                    </p>
                    <div className="content">
                        Completa Pesquisas
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded has-background-white has-text-black is-uppercase w-75">encuesta</button>
                </footer>
            </div>
        </div>
        <button className="button is-rounded is-uppercase px-6">conoce más</button>

    </div>
}