import ArticlesCommentsCounter from "../common/article-comment-counter"
import ClosingDate from "../common/closing-date"
import ProgressBar from "../common/progresBar"
import axiosServices from "@/utils/axios"
import MkdFormatter from "./mkd-formatter"

const getData = async ()=> {
    try{
        const resp = await axiosServices.get(`/projects/${process.env.PROJECTID}`)
        const project = await resp.data
        return project

    }catch(err){
        console.log(err);
    }
}

const BannerPacto = async () => {
    const project = await getData()

    const ClosedProjectcheck = (project) => {
        var today = new Date();
    }

    if(project)return (<div className='banner-pacto is-flex is-justify-content-center is-align-items-center is-flex-direction-column py-6 '>
        <h1 className="has-text-color-white has-text-centered is-size-2 has-text-weight-bold">El pacto</h1>
        {project && <div className="card has-background-cream is-flex w-75">
            <div className="card-image" style={{ backgroundImage: `url('${project.coverUrl}')` }}>

            </div>
            <div className="card-content p-0 pt-5 w-75">
                <div className="media px-5">

                    <div className="media-content">
                        <p className="title is-4">{project.title_es}</p>
                    </div>
                </div>

                <div className="content px-5">
                    <MkdFormatter source={project.about_es}/>
                    <div className="is-flex ">

                        <ClosingDate closingDate={project.closedAt}
                            creationDate={project.createdAt} />
                        <ArticlesCommentsCounter commentsCount={10/* project.commentsCount */}
                            apoyosCount={30/* project.apoyosCount */}
                            project={project._id} />

                    </div>
                </div>
                <ProgressBar closingDate={project.closedAt}
                    creationDate={project.createdAt}
                    closed={ClosedProjectcheck(project)} />
            </div>
        </div>}
    </div>)
}

export default BannerPacto