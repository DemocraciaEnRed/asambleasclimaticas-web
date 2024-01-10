'use client'
import { stageCountryList } from "@/utils/data";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Remark } from "react-remark";


export default function ResumenBody({ project }) {

    return <div className="resumen-pacto">


        <div className="columns">
            <div className="column is-10">
                {project.youtubeUrl && <iframe
                    width="100%"
                    height="480"
                    src={`https://www.youtube.com/embed/${project.youtubeUrl.split('?v=')[1].split('&list')[0]}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />}
                <div className="resumen-about-es content mt-6 is-size-5 is-size-6-touch">
                    <Remark>{project.about_es}</Remark>
                </div>

                <div className="content mt-6 resumen-about-pt is-italic  is-size-6 is-size-7-touch is-flex">
                    <span className="is-size-4">* </span>
                    <div>
                    <Remark>{project.about_pt}</Remark>

                    </div>
                </div>

                <a href={`/pacto/${project.slug}/articulado`} className="contrib-button has-text-weight-bold has-text-white has-background-primary w-100 mt-5 is-flex is-justify-content-space-between p-4 is-size-6">
                    Contribuye dejando tus aportes en las máximas del Pacto Interciudad
                    <FontAwesomeIcon icon={faArrowRight} />
                </a>

                <div className="m-0 mt-6 is-flex is-flex-wrap-wrap is-justify-content-center stage-wrapper">
                    {stageCountryList.map(country =>
                        <div key={country.code} className={`stage is-flex is-align-items-center  my-3 pr-3 ${project.stage === country.code ? 'active' : ''}`}>
                            <figure className="image is-48x48">
                                <img className="" src={country.image} />
                            </figure>
                            <div className="name-country has-background-black is-flex-grow-1 has-text-centered has-text-white px-3 is-uppercase">
                                {country.name}
                            </div>
                        </div>)}
                </div>

            </div>
        </div>

    </div>
}