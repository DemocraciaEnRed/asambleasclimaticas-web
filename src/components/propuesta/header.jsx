import { useEffect } from "react";
import UserAvatar from "../common/user-avatar";
import ClosingDate from "../common/closing-date";
import ArticlesCommentsCounter from "./article-comment-counter";
import ProjectHeaderVersion from "./preject-version";
import ProgressBar from "../common/progresBar";


export default function HeaderPropuesta({project}) {

    return <div className="project-header-container is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-flex-end w-100">
        <div className="project-header-wrapper is-block">
            <div className="info-header">
                <div className="top-bar-wrapper is-flex is-flex-direction-row is-justify-content-flex-start w-100">
                    <UserAvatar  authorId={project.author._id}
                                userId={project.author._id}
                                name={project.author.fullname}
                                party={project.author.fields && project.author.fields.party ? project.author.fields.party : ''}/>
                    <ClosingDate closingDate={project.currentVersion.content.closingDate} 
                                 closed={project.closed} 
                                 creationDate={project.currentVersion.createdAt}/>
                    <ArticlesCommentsCounter commentsCount={project.commentsCount} 
                                             apoyosCount={project.apoyosCount} 
                                             project={project._id}/>
                    <ProjectHeaderVersion project={project._id}
                                          version={project.currentVersion.version}
                                          />
                </div>
                <div className="project-title w-100">
                    {project.currentVersion.content.title}
                </div>
                <div className="project-progress-bar">
                    <ProgressBar closingDate={project.currentVersion.content.closingDate} 
                                 creationDate={project.currentVersion.createdAt} 
                                 closed={project.closed}/>
                </div>
            </div>
            
        </div>
    </div>

}