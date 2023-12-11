import { faThumbsDown, faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Remark } from "react-remark";

export default function PactoBody({ articles }) {

    return <div className="articles-pacto">
        <div className="columns">
            <div className="column is-9">
                <div className="title-section has-text-primary">

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
                {articles.map((article) =>{
                    const body = article.body_es
                    return (<div className="card my-4" key={article.id}>
                        <div className="card-content is-size-5 columns" >
                        <p className="column index pt-0">{article.position}.</p>

                            <Remark>
                                {body}
                            </Remark>
                        </div>
                        <footer className="card-footer has-background-primary is-flex is-justify-content-space-between py-2 px-4">
                            <div>
                                <button className="button is-white has-text-primary is-rounded mx-2"> <FontAwesomeIcon className="mr-3" icon={faThumbsUp} /> Me gusta (25) </button>
                                <button className="button is-white has-text-primary is-rounded mx-2"> <FontAwesomeIcon className="mr-3" icon={faThumbsDown} /> No me gusta (20) </button>
                            </div>
                            <div className="is-flex is-align-items-center">
                                <span className="has-text-white">20 Comentarios</span>
                                <button className="button is-white has-text-primary is-rounded mx-2"><FontAwesomeIcon className="mr-3" icon={faComment} /> Comentar</button>
                            </div>
                        </footer>
                    </div>)
                    }
                )}
            </div>
        </div>
    </div>
}