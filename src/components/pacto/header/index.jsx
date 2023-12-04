import { useEffect } from "react";
import UserAvatar from "../../common/user-avatar";
import ClosingDate from "../../common/closing-date";
import ArticlesCommentsCounter from "../../common/article-comment-counter";
import ProjectHeaderVersion from "./preject-version";
import ProgressBar from "../../common/progresBar";
import ClosingProject from "../../common/closing-project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faShareNodes } from "@fortawesome/free-solid-svg-icons";


export default function HeaderPropuesta({project, section, setSection}) {

    const ClosedProjectcheck = (project) => {
        var today = new Date();
    }

    return <div className="project-header-container is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-flex-end w-100">
        <div className="project-header-wrapper is-block">
            <div className="info-header">
                <div className="top-bar-wrapper is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center w-100">
                    <div className="project-title w-50">
                        {project.title_es}
                        <span className="ml-2 has-text-weight-light is-italic is-size-4">{project.title_pt}</span>
                    </div>
                    <div className="is-flex is-justify-content-end">
                            <ClosingDate closingDate={project.closedAt} 
                                        creationDate={project.createdAt}/>
                        <ArticlesCommentsCounter commentsCount={10/* project.commentsCount */} 
                                                apoyosCount={30/* project.apoyosCount */} 
                                                project={project._id}/>
                        <ProjectHeaderVersion project={project._id}
                                            version={1/* project.currentVersion.version */}
                                            />
                    </div>
                </div>
                <div className="project-progress-bar is-flex is-flex-wrap-wrap mb-6">
                    <div className="progress-project">
                    <ProgressBar closingDate={project.closedAt} 
                                 creationDate={project.createdAt} 
                                 closed={ClosedProjectcheck(project)}/>
                    </div>
                    <div className="ml-2 is-hidden-touch">
                        <ClosingProject closed={ClosedProjectcheck(project)} />
                    </div>
                </div>
                <div className="tab-section is-flex is-justify-content-space-between">
                    <div className="tabs ">
                    <ul>
                        <li className={section === 'resumen' ? 'is-active' : ''} onClick={()=> setSection('resumen')}><a>Resumen</a></li>
                        <li className={section === 'pacto' ? 'is-active' : ''} onClick={()=> setSection('pacto')}><a> Pacto</a></li>
                        <li className={section === 'hoja' ? 'is-active' : ''} onClick={()=> setSection('hoja')}><a>Hoja de ruta</a></li>
                    </ul>
                    </div>
                    <button className="button shared-button px-3">Compartir proyecto <FontAwesomeIcon icon={faShareNodes}/></button>
                </div>
            </div>
            
        </div>
    </div>

}