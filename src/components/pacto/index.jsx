'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

import { documento, comentario, articulado, esAutor } from '../../../document-example.json'
import Link from "next/link"
import BreadcrumbNav from "@/components/pacto/header/breadcrumb"
import HeaderPropuesta from "@/components/pacto/header"
import BodyPacto from "./body"
import axiosServices from "@/utils/axios"

export default function PropuestaComponent() {
    const [project, setProject] = useState(null)
    const [articles, setArticles] = useState(null)
    const [isAuthor, setIsAuthor] = useState(esAutor)
    const pathname = usePathname()

    const [section, setSection] = useState('resumen')
    
    useEffect(()=>{
        fetchProject()
    },[])

    const fetchProject =async () => {
        const resp = await axiosServices.get('/project')
        const {projects} = await resp.data
        setProject(projects[0])
    }

    const handleSection=(sec)=>{
        setSection(sec)
    }

    return <>
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        {project &&
        <>
        <HeaderPropuesta project={project} section={section} setSection={handleSection}/>
        <BodyPacto project={project} section={section}/>
        </>
        }
    </>
}