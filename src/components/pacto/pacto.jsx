'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

import HeaderPropuesta from "@/components/pacto/header"
import axiosServices from "@/utils/axios"
import ResumenBody from "./body/resumen"
import PactoBody from "./body/pacto"

export default function PropuestaPactoComponent() {
    const [project, setProject] = useState(null)

    const [section, setSection] = useState('resumen')

    useEffect(() => {
        fetchProject()
    }, [])

    const fetchProject = async () => {
        const resp = await axiosServices.get('/projects/65775cadc6972f1d2fda9105?withArticles=true&withComments=true')
        const project = await resp.data
        setProject(project)
    }

  
    return <>
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        { project &&
            <>
                <HeaderPropuesta project={project} section="pacto"  />
                <div className="project-body-container">
                    <PactoBody project={project}/>
                </div>
            </>
        }
    </>
}