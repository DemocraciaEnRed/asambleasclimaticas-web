import { faThumbsDown, faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PactoBody({ project }) {


    return <div className="articles-pacto">
        <div className="columns">
            <div className="column is-9">
                <div className="title-section">

                <h1 className="is-size-3">Maximas del proyecto
                    </h1>
                <span className=" has-text-weight-light is-italic is-size-4"> 
                    *Máximas do Projeto
                </span>
                </div>

                <div className="description-section my-5 p-2">
                Puede comentar ca da máxima/articulo seleccionando sobre el bloque de tu interés, ya sea generando un comentario o dejando una reacción. Deje el comentario en el idioma de su preferencia y aquel con el que se sienta mas cómodo/a.
                <p className=" has-text-weight-light is-italic is-size-6">

    *Pode comentar cada máxima/artigo selecionando sobre o bloco de seu interesse, seja gerando um comentário ou deixando uma reação. Deixe o comentário no idioma de sua preferência e aquele com o qual se sinta mais confortável.
                </p>
                </div>
                {project.articles.map((article, idx) =>

                    <div className="card my-4" key={idx}>
                        <div className="card-content is-size-5 columns" >
                            <p className="column index">{idx}.</p>
                            <p className="column about pl-0" dangerouslySetInnerHTML={{ __html: article.body_es }}></p>
                        </div>
                        <footer className="card-footer is-flex is-justify-content-space-between py-2 px-4">
                            <div>
                                <button class="button is-rounded mx-2"> <FontAwesomeIcon className="mr-3" icon={faThumbsUp} /> Me gusta (25) </button>
                                <button class="button is-rounded mx-2"> <FontAwesomeIcon className="mr-3" icon={faThumbsDown} /> No me gusta (20) </button>
                            </div>
                            <div className="is-flex is-align-items-center">
                                <span className="has-text-white">20 Comentarios</span>
                                <button class="button is-rounded mx-2"><FontAwesomeIcon className="mr-3" icon={faComment} /> Comentar</button>
                            </div>
                        </footer>
                    </div>
                )}
            </div>
        </div>
    </div>
}