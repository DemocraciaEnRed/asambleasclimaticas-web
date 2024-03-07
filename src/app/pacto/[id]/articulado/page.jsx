import { Suspense } from "react"

import LanguageSelector from "@/components/common/language-selector"
import Skeleton from "@/components/common/skeleton"
import ArticuladoBody from "@/components/pacto/body/articulado"
import DisabledDisclaimer from "@/components/pacto/body/pacto/disclaimer"
import HeaderPropuesta from "@/components/pacto/header"
import BreadcrumbNav from "@/components/pacto/header/breadcrumb"
import { fetchProjectId, fetchArticleProjectId, fetchCommentProjectId } from "@/utils/get-data"


export default async function PropuestaPactoComponent({ params: { id }, searchParams: { version } }) {
    const [project, articles, comments] = await Promise.all([
        fetchProjectId(id, version),
        fetchArticleProjectId(id, version),
        fetchCommentProjectId(id, version)
    ])

    return <div className="pacto-wrapper">
        {project &&
            <>
            <BreadcrumbNav project={project} section="pacto" version={version} />
                <HeaderPropuesta project={project} section="pacto" />
                <div className="project-body-container">
                    <LanguageSelector />
                    <div className="columns mx-0">
                        <div className="column is-11 is-12-touch">
                        {project.version !== project.currentVersion && <DisabledDisclaimer />}
                        <div className="title-section has-text-primary">
                                <h1 className="is-size-3">Maximas del proyecto
                                </h1>
                                <span className=" has-text-weight-light is-italic is-size-4">
                                    *Máximas do Projeto
                                </span>
                        </div>
                            {project.version === project.currentVersion && <div className="description-section my-5 p-2">
                            Puedes participar en todas las máximas valorándolas con un Me gusta/No me gusta o comentando en el idioma de tu preferencia.
                                <p className=" has-text-weight-light is-italic is-size-6">
                                *Você pode participar de todas as máximas classificando-as com Gosto/Não Gosto ou comentando no idioma de sua preferência
                                </p>
                            </div>}
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