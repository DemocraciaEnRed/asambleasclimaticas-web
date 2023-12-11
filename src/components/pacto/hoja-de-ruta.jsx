'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

import HeaderPropuesta from "@/components/pacto/header"
import axiosServices from "@/utils/axios"
import ResumenBody from "./body/resumen"
import HojaBody from "./body/hoja"

export default function PropuestaHojaComponent() {
    const [project, setProject] = useState(null)
    const [articles, setArticles] = useState(null)
    const pathname = usePathname()

    const [section, setSection] = useState('resumen')

    useEffect(() => {
        fetchProject()
    }, [])

    const fetchProject = async () => {
        const resp = await axiosServices.get('/project')
        const { projects } = await resp.data
        setProject(projects[0])
    }

  

    return <>
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        {project &&
            <>
                <HeaderPropuesta project={project} section="hoja"  />
                <div className="project-body-container">
                    <HojaBody project={project} />
                </div>
            </>
        }
    </>
}