import Skeleton from "@/components/common/skeleton"
import ArticuladoBody from "@/components/pacto/body/articulado"
import HeaderPropuesta from "@/components/pacto/header"
import { fetchProject } from "@/utils/get-data"
import { Suspense } from "react"


export default async function PropuestaPactoComponent() {
    const project = await fetchProject()

    return <div className="pacto-wrapper">
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        {project &&
            <>
                <HeaderPropuesta project={project} section="pacto" />
                <div className="project-body-container">
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
                    <Suspense fallback={
                        <div>
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                            <Skeleton height={200} reverseColumn />
                        </div>
                    }>
                        <ArticuladoBody project={project} />
                    </Suspense>
                </div>
            </>
        }
    </div>
}