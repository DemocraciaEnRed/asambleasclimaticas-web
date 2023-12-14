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
        const resp = await axiosServices.get('/projects/65775cadc6972f1d2fda9105?withComments=true')
        setProject(resp.data)
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