import ArticlesCommentsCounter from "../common/article-comment-counter"
import ClosingDate from "../common/closing-date"
import ProgressBar from "../common/progresBar"
import MkdFormatter from "../common/mkd-formatter"
import { fetchProjectId } from "@/utils/get-data"
import StageProject from "../common/stage-project"
import { PROJECT_ID } from "@/utils/constants"

const BannerPacto = async () => {
    const project = await fetchProjectId(PROJECT_ID)


    if (!project) return (<div className='banner-pacto is-flex is-justify-content-center is-align-items-center is-flex-direction-column py-6 ' id="banner-pacto">
        <h1 className="has-text-color-white has-text-centered is-size-2 is-size-4-touch has-text-weight-bold my-3">El pacto</h1>
        <div className="card has-background-cream is-flex has-text-centered card-project">
            <div className="card-content p-0 is-flex-grow-1">
                <div className="px-5 py-3">
                    <h1 className="title is-2">En desarrollo <span className="is-size-6 is-italic is-block">em desenvolvimento</span></h1>

                    <div className="  py-2 ">
                        <p className="mb-5">Aún no hay pactos cargados. La información sobre el pacto estará disponible y activa una vez finalice la primera asamblea (Brasil). Te invitamos a registrarte, te notificaremos cuando esté disponible, para que puedas participar.</p>
                        <div className="is-italic">Ainda não há pactos carregados. As informações sobre o pacto estarão disponíveis e ativas assim que a primeira assembleia (Brasil) for concluída. Convidamos você a se cadastrar; notificaremos você quando estiver disponível, para que possa participar.</div>
                    </div>
                    <div className="is-flex info-pacto px-3">
                    </div>
                </div>
            </div>
        </div>
    </div>)

    return (<div className='banner-pacto is-flex is-justify-content-center is-align-items-center is-flex-direction-column py-6 ' id="banner-pacto">
        <h1 className="has-text-color-white has-text-centered is-size-2 is-size-4-touch has-text-weight-bold my-3">El pacto</h1>
        {project && <a href={`/pacto/${PROJECT_ID}/`} className=" card-project">
            <div className="card has-background-cream is-flex ">
                <div className="card-image" style={{ backgroundImage: `url('${project.coverUrl}')` }}>

                </div>
                <div className="card-content p-0 pt-5 is-flex-grow-1">

                    <div className="px-5 py-3 my-3">
                        <p className="title is-2">{project.title_es}</p>
                        <div className="  py-2 mb-5">
                            <p>{project.shortAbout_es}</p>
                            <div className="is-italic"><MkdFormatter source={project.shortAbout_pt} /></div>

                        </div>
                        <div className="is-flex info-pacto px-3">

                            <ClosingDate closingDate={project.closedAt}
                                creationDate={project.createdAt} />
                            <ArticlesCommentsCounter commentsCount={10/* project.commentsCount */}
                                apoyosCount={30/* project.apoyosCount */}
                                project={project._id} />
                            <StageProject stage={project.stage} />

                        </div>
                    </div>
                    <ProgressBar closingDate={project.closedAt}
                        creationDate={project.createdAt} />
                </div>
            </div>
        </a>
        }

    </div>)
}

export default BannerPacto