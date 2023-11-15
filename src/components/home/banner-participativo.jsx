import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faComment, faPenToSquare, faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

export function BannerParticipativo() {
    return <div className="banner-participativo has-text-centered">
        <h1 className="has-text-color-white has-text-centered is-size-3 has-text-weight-bold has-text-white">¿Cómo Participar?</h1>
        <div className="card-group is-flex is-justify-content-center my-6">
            <div className="card m-3">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faWhatsapp} />
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Comunidad de <br/> Whatsapp
                    </p>
                    <div className="content">
                        Suamte a nuestro canal de whatsapp para conocer las novedades sobre el proceso
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded">Unite al grupo</button>
                </footer>
            </div>


            <div className="card m-3">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faComment} />
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Comentarios <br/>Generales
                    </p>
                    <div className="content">
                        Déjanos tus opiniones sobre la propuesta general del pacto interciudad
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded">Comenta el pacto</button>
                </footer>
            </div>



            <div className="card m-3">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Comentarios <br/>ESpecificos
                    </p>
                    <div className="content">
                        Conoce las maximas del pacto y comenta cada una en especifico para poder mejorarlo
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded">Comenta las maximas</button>
                </footer>
            </div>



            <div className="card m-3">
                <div className="card-image pt-5 has-text-centered">
                    <FontAwesomeIcon icon={faSquarePollHorizontal} />
                </div>
                <div className="card-content py-0 has-text-centered">
                    <p className="title is-size-4">
                        Completa las <br/>encuestas
                    </p>
                    <div className="content">
                        Completa la encuesta mensual sobre el avance del pacto y los resultados de las opiniones.
                    </div>
                </div>
                <footer className="card-footer is-justify-content-center py-4">
                    <button className="button is-rounded">Completa la encuesta</button>
                </footer>
            </div>
        </div>
        <button className="button is-rounded">¿Cómo usar la plataforma?</button>

    </div>
}