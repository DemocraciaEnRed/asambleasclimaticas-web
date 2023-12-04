'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

import { documento, comentario, articulado, esAutor } from '../../../document-example.json'
import Link from "next/link"
import BreadcrumbNav from "@/components/pacto/header/breadcrumb"
import HeaderPropuesta from "@/components/pacto/header"
import BodyPacto from "./body"

export default function PropuestaComponent() {
    const [project, setProject] = useState(null)
    const [isAuthor, setIsAuthor] = useState(esAutor)
    const pathname = usePathname()

    const [section, setSection] = useState('resumen')
    
    useEffect(()=>{
        fetchProject()
    },[])

    const fetchProject =async () => {
        const resp = await fetch('http://localhost:3000/project/6569ca2b4977d65550a1e94f')
        const project = await resp.json()
        setProject(project)
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