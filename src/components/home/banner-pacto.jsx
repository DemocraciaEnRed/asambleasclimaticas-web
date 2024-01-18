import ArticlesCommentsCounter from "../common/article-comment-counter"
import ClosingDate from "../common/closing-date"
import ProgressBar from "../common/progresBar"
import MkdFormatter from "../common/mkd-formatter"
import { fetchProject } from "@/utils/get-data"
import StageProject from "../common/stage-project"

const BannerPacto = async () => {
    const project = await fetchProject('pacto-inter-ciudad')

    const ClosedProjectcheck = (project) => {
        var today = new Date();
    }

    if (project) return (<div className='banner-pacto is-flex is-justify-content-center is-align-items-center is-flex-direction-column py-6 ' id="banner-pacto">
        <h1 className="has-text-color-white has-text-centered is-size-2 is-size-4-touch has-text-weight-bold my-3">El pacto</h1>
        {project && <a href="/pacto/pacto-inter-ciudad/" className=" card-project">
        <div className="card has-background-cream is-flex ">
            <div className="card-image" style={{ backgroundImage: `url('${project.coverUrl}')` }}>

            </div>
            <div className="card-content p-0 pt-5 is-flex-grow-1">

                <div className="px-2 my-3">
                    <p className="title is-2">{project.title_es}</p>
                    <div className="has-background-cream-light pl-3 py-2 mb-3">

                        <MkdFormatter source={project.about_es} />
                    </div>
                    <div className="is-flex info-pacto px-3">

                        <ClosingDate closingDate={project.closedAt}
                            creationDate={project.createdAt} />
                        <ArticlesCommentsCounter commentsCount={10/* project.commentsCount */}
                            apoyosCount={30/* project.apoyosCount */}
                            project={project._id} />
                        <StageProject stage={project.stage}/>

                    </div>
                </div>
                <ProgressBar closingDate={project.closedAt}
                    creationDate={project.createdAt}
                    closed={ClosedProjectcheck(project)} />
            </div>
        </div>
        </a>
        }

    </div>)
}

export default BannerPacto