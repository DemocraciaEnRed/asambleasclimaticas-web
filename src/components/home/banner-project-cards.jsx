import ArticlesCommentsCounter from "../common/article-comment-counter"
import ClosingDate from "../common/closing-date"
import ProgressBar from "../common/progresBar"
import MkdFormatter from "../common/mkd-formatter"
import { fetchProjects } from "@/utils/get-data"
import StageProject from "../common/stage-project"
import { PROJECT_ID } from "@/utils/constants"
import BannerPacto from "./banner-pacto"

const BannerProjectCards = async () => {
    const {projects} = await fetchProjects()


    return(
        <div className="is-flex is-flex-wrap-wrap">
            {projects && projects.map(project=>

            <BannerPacto project={project} key={project.id}/>
            )}

        </div>
    )
}

export default BannerProjectCards