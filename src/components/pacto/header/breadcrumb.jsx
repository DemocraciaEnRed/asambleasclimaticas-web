import ProjectHeaderVersion from "@/components/common/project-version"
import Link from "next/link"

export default function BreadcrumbNav({ project, section, version }) {

    return <div className="breadcrumb-nav 
                           has-background-cream 
                           w-100 
                           is-flex 
                           is-align-items-center 
                           is-justify-content-space-between 
                           is-hidden-desktop
                           p-3">
        <div className="breadcrumb-wrapper is-flex">
            <Link className="has-text-brown is-size-7 mr-2" href="#">
                {section}
            </Link>
            <Link className="has-text-brown is-size-7 mr-2" href="#">
                {project.slug}
            </Link>
            
        </div>
        <ProjectHeaderVersion project={project}
                            version={project.version}
                        />

    </div>
}