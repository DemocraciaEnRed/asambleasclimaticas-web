import UserAvatar from "../../common/user-avatar";
import ClosingDate from "../../common/closing-date";
import ArticlesCommentsCounter from "../../common/article-comment-counter";
import ProjectHeaderVersion from "../../common/project-version";
import ProgressBar from "../../common/progresBar";
import ClosingProject from "../../common/closing-project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import StageProject from "@/components/common/stage-project";
import EditProject from "./edit-project";
import SharedProjectButton from "./shared-project-button";


export default function HeaderPropuesta({ project, section }) {


    return <div className="project-header-container is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-flex-end w-100 has-background-cream-light">
        <div className="project-header-wrapper is-block">
            <div className="info-header">
                <div className="top-bar-wrapper is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <div className="has-text-weight-bold project-title is-size-3 my-3 is-size-4-touch">
                        {project.title_es}
                        <span className="has-text-weight-light is-italic is-size-4 is-size-6-touch">{project.title_pt}</span>
                    </div>
                    <div className="is-flex is-justify-content-end project-info is-hidden-touch ">
                        {project.closedAt && <ClosingDate closingDate={project.closedAt}
                            creationDate={project.createdAt} />}
                        <ArticlesCommentsCounter commentsCount={project.commentsCount}
                            apoyosCount={project.likes}
                            project={project._id} />
                        <ProjectHeaderVersion project={project}
                            version={project.version}
                        />
                    </div>
                </div>
                {project.closedAt && <div className="project-progress-bar is-flex is-flex-wrap-wrap ">
                    <div className="progress-project">
                        <ProgressBar closingDate={project.closedAt}
                            creationDate={project.createdAt}
                            />
                    </div>
                    <div className="ml-2 is-hidden-touch">
                        <ClosingProject closingDate={project.closedAt} />
                    </div>
                    <div className="ml-2 is-hidden-touch ">
                        <StageProject stage={project.stage} />
                    </div>
                </div>}
                <div className="is-flex is-justify-content-center project-info is-hidden-desktop mb-3">
                        {project.closedAt && <ClosingDate closingDate={project.closedAt}
                            creationDate={project.createdAt} />}
                        <ArticlesCommentsCounter commentsCount={project.commentsCount}
                            apoyosCount={project.likes}
                            project={project._id} />
                        
                    </div>
                <div className="tab-section is-flex is-justify-content-space-between is-align-items-flex-end">
                    <div className="tabs">
                        <ul>
                            <li className={section === 'resumen' ? 'is-active' : ''}><Link href={`/pacto/${project.slug}${project.currentVersion !== project.version ? `?version=${project.version}`:''}`} >Resumen</Link></li>
                            <li className={section === 'pacto' ? 'is-active' : ''} ><Link href={`/pacto/${project.slug}/articulado${project.currentVersion !== project.version ? `?version=${project.version}`:''}`} > Pacto</Link></li>
                            <li className={section === 'hoja' ? 'is-active' : ''} ><Link href={`/pacto/${project.slug}/hoja-de-ruta${project.currentVersion !== project.version ? `?version=${project.version}`:''}`} >Hoja de ruta</Link></li>
                        </ul>
                    <EditProject project={project}/>
                    </div>
                    <SharedProjectButton project={project}/>
                </div>
            </div>

        </div>
    </div>

}