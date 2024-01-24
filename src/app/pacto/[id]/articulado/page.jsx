import LanguageSelector from "@/components/common/language-selector"
import Skeleton from "@/components/common/skeleton"
import ArticuladoBody from "@/components/pacto/body/articulado"
import HeaderPropuesta from "@/components/pacto/header"
import { fetchProject, fetchProjectArticle, fetchProjectComment, fetchProjectVersion } from "@/utils/get-data"
import { Suspense } from "react"


export default async function PropuestaPactoComponent({ params: { id }, searchParams: { version } }) {
    const [project, articles, comments] = await Promise.all([
        fetchProject(id, version),
        fetchProjectArticle(id, version),
        fetchProjectComment(id, version)
    ])

    return <div className="pacto-wrapper">
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        {project &&
            <>
                <HeaderPropuesta project={project} section="pacto" />
                <div className="project-body-container">
                    <LanguageSelector color="pink" />
                    <div className="columns mx-0">
                        <div className="column is-9">
                        {project.version !== project.currentVersion && <article className="message is-danger">
                            <div className="message-body">
                            <p className="mb-2">IMPORTANTE: Estas viendo una versión anterior (estas en la “Versión q se esta consultando”). Por esto veras que no puedes comentar ni reaccionar al contenido. Es una visualización únicamente de lectura para comprender el estado previo de las máximas y de la participación ciudadana. VOLVER A VERSION ACTUAL </p>
                            <p className="is-italic">IMPORTANTE: Você está visualizando uma versão anterior (você está na "Versão sendo consultada"). Por esse motivo, não será possível comentar ou reagir ao conteúdo. Trata-se apenas de uma visualização para leitura, a fim de compreender o estado anterior das normas e da participação cidadã. RETORNAR À VERSÃO ATUAL. </p>
                            </div>
                        </article>}
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
                    <Suspense fallback={
                        <div>
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                        </div>
                    }>
                        <ArticuladoBody project={project} articles={articles} comments={comments} />
                    </Suspense>
                </div>
            </>
        }
    </div>
}