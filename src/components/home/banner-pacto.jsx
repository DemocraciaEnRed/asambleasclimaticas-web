'use client'
import { useEffect, useState } from "react"
import Logo from "../common/logo"
import ArticlesCommentsCounter from "../common/article-comment-counter"
import ProjectHeaderVersion from "../pacto/header/preject-version"
import ClosingDate from "../common/closing-date"
import ProgressBar from "../common/progresBar"
import axiosServices from "@/utils/axios"
import { Remark } from "react-remark"

const BannerPacto = () => {
    const [project, setProject] = useState(null)

    useEffect(()=>{
        fetchProject()
    },[])

    const fetchProject =async () => {
        const resp = await axiosServices.get('/projects')
        const {projects} = await resp.data
        setProject(projects[0])
    }

    const ClosedProjectcheck = (project) => {
        var today = new Date();
    }

    return (<div className='banner-pacto is-flex is-justify-content-center is-align-items-center is-flex-direction-column py-6 '>
        <h1 className="has-text-color-white has-text-centered is-size-2 has-text-weight-bold">El pacto</h1>
        {project && <div className="card has-background-cream is-flex w-75">
            <div className="card-image">
                <figure className="image is-128x128">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content p-0 pt-5">
                <div className="media px-5">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{project.title_es}</p>
                    </div>
                </div>

                <div className="content px-5">
                    <Remark>
                    {project.about_es}

                    </Remark>
                   <div className="is-flex ">

                   <ClosingDate closingDate={project.closedAt} 
                                        creationDate={project.createdAt}/>
                   <ArticlesCommentsCounter commentsCount={10/* project.commentsCount */} 
                                                apoyosCount={30/* project.apoyosCount */} 
                                                project={project._id}/>
                        
                   </div>
                </div>
                   <ProgressBar closingDate={project.closedAt} 
                                 creationDate={project.createdAt} 
                                 closed={ClosedProjectcheck(project)}/>
            </div>
        </div>}
    </div>)
}

export default BannerPacto