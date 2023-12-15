import { faThumbsDown, faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Remark } from "react-remark";
import Article from "./pacto/article";
import Comments from "./pacto/comments";

export default function PactoBody({ project, articles, comments }) {

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
            </div>

            </div>
            {articles.length > 0 && articles.map((article) => <Article key={article._id} project={project} article={article} />
            )}
        <Comments project={project} comments={comments} />
    </div>
}