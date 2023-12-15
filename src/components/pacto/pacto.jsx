'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

import HeaderPropuesta from "@/components/pacto/header"
import axiosServices from "@/utils/axios"
import ResumenBody from "./body/resumen"
import PactoBody from "./body/pacto"

export default function PropuestaPactoComponent() {
    const [project, setProject] = useState(null)
    const [articles, setArticles] = useState(null)
    const [comments, setComments] = useState(null)

    useEffect(() => {
        fetchProject()
    }, [])

    const fetchProject = async () => {
        const [project, articles, comments] = await Promise.all([
            axiosServices.get('/projects/657b6108f7f2ae8cc057cedc'),
            axiosServices.get('/projects/657b6108f7f2ae8cc057cedc/articles'),
            axiosServices.get('/projects/657b6108f7f2ae8cc057cedc/comments'),

        ])
        setProject(project.data)
        setArticles(articles.data)
        setComments(comments.data)
    }

  
    return <>
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        { project &&
            <>
                <HeaderPropuesta project={project} section="pacto"  />
                <div className="project-body-container">
                    <PactoBody project={project} articles={articles} comments={comments} />
                </div>
            </>
        }
    </>
}