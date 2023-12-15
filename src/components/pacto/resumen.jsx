'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

import HeaderPropuesta from "@/components/pacto/header"
import axiosServices from "@/utils/axios"
import ResumenBody from "./body/resumen"

export default function PropuestaResumenComponent() {
    const [project, setProject] = useState(null)
    const [articles, setArticles] = useState(null)
    const pathname = usePathname()


    useEffect(() => {
        fetchProject()
    }, [])

    const fetchProject = async () => {
        const [project, comments] = await Promise.all([ 
            axiosServices.get(`/projects/${process.env.PROJECTID}`),
        ])
        setProject(project.data)
    }

  
    return <>
        {project &&
            <>
                <HeaderPropuesta project={project} section="resumen"  />
                <div className="project-body-container">
                    <ResumenBody project={project} />
                </div>
            </>
        }
    </>
}