'use client'
import { useEffect, useState } from "react"

import { documento, comentario, articulado } from '../../../../document-example.json'
import Link from "next/link"

export default function BreadcrumbNav({ section, id, title }) {

    return <div className="breadcrumb-nav w-100 is-flex is-align-items-center is-justify-content-center">
        <div className="breadcrumb-wrapper is-flex">
            <Link className="has-text-white is-size-7 mr-2" href='/#projects'>
                Propuestas
            </Link>
            <Link className={`has-text-white is-size-7 mr-2 ${section === '/propuesta' ? 'active':''}`} href={`/propuesta?id=${id}`}>
                {title}
            </Link>
            {section === '/articulado' &&
                <Link className={`has-text-white is-size-7 mr-2 ${section === '/articulado' ? 'active':''}`} href={`/articulado?id=${id}`}>
                    Articulado de la propuesta
                </Link>
            }
            {section === '/versiones' &&
                <Link className={`has-text-white is-size-7 mr-2 ${section === '/articulado' ? 'active':''}`} href={`/versiones?id=${id}`}>
                    Versiones
                </Link>
            }
        </div>
    </div>
}