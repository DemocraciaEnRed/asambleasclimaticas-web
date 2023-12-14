
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Remark } from "react-remark";


export default function ResumenBody({ project }) {

    return <div className="resumen-pacto">


        <div className="columns">
            <div className="column is-9">
                <iframe
                    width="100%"
                    height="480"
                    src={`https://www.youtube.com/embed/cQrNiQq4zE4`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
                {/* <p className="about-es my-4" dangerouslySetInnerHTML={{ __html: project.about_es.replace(/\n/g, "<br><br>") }}></p> */}
                <Remark>{project.about_es}</Remark>

                <button className="contrib-button has-text-weight-bold has-text-white has-background-primary w-100 my-5 is-flex is-justify-content-space-between p-4 is-size-6">
                    Contribuye dejando tus aportes en las máximas del Pacto Interciudad
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>

            </div>
        </div>
        
    </div>
}