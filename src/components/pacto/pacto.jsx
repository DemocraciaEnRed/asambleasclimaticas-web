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

    const [section, setSection] = useState('resumen')

    useEffect(() => {
        fetchProject()
    }, [])

    const fetchProject = async () => {
        const resp = await axiosServices.get('/project')
        const { projects } = await resp.data
        setProject(projects[0])

        const resp2 = await axiosServices.get('/article')
        const { articles } = await resp2.data
        setArticles(articles)
    }

  
    return <>
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        { project && articles &&
            <>
                <HeaderPropuesta project={project} section="pacto"  />
                <div className="project-body-container">
                    <PactoBody articles={articles} project={project}/>
                </div>
            </>
        }
    </>
}