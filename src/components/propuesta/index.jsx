'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

import { documento, comentario, articulado, esAutor } from '../../../document-example.json'
import Link from "next/link"
import BreadcrumbNav from "@/components/propuesta/breadcrumb"
import HeaderPropuesta from "@/components/propuesta/header"

export default function PropuestaComponent() {
    const [project, setProject] = useState(documento)
    const [isAuthor, setIsAuthor] = useState(esAutor)
    const pathname = usePathname()

    return <>
        <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/>
        <HeaderPropuesta project={project}/>
    </>
}