'use client'
import React, { useState } from 'react'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPlusCircle, faXmark } from '@fortawesome/free-solid-svg-icons'


export default function ProjectHeaderVersion({ project, version }) {
    const pathname = usePathname()
    const searchParams = useSearchParams().get('version')

    const [showModal, setShowModal] = useState(false)

    return (<div
        className={`project-version-wrapper is-flex is-flex-direction-column is-align-items-center is-clickable 
        ${project.version === project.currentVersion ? '' : 'has-background-danger has-text-white'} `}
        onClick={() => project.versions.length > 0 && setShowModal(!showModal)}>
        <p className=" is-size-6">Versión {version} <FontAwesomeIcon className='ml-3 is-hidden-desktop' icon={faPlusCircle} /></p>
        {project.version !== project.currentVersion && <p className="has-text-weight-light is-size-7 is-hidden-touch">(Versión antigua)</p>}
        <div className="version-link is-underlined  is-hidden-touch">
            <p>+Versiones</p>
        </div>
        <div className={`modal version-modal ${showModal ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={() => setShowModal(!showModal)}></div>
            <div className="card p-4">
                <div className="is-flex is-justify-content-end">
                    <FontAwesomeIcon onClick={() => setShowModal(!showModal)} icon={faXmark} />
                </div>
                <p className="title has-text-centered is-size-4-touch">
                    Elección de Versiones
                </p>
                <div className="version-modal-content modal-content is-flex is-flex-direction-column is-align-items-center p-4">
                    {project.versions.map(version =>
                        <Link href={{ pathname, query: { version: version.version } }}
                            onClick={() => setShowModal(!showModal)}
                            key={version.version}
                            className={`version-button button is-uppercase w-100 has-text-weight-bold is-relative ${project.version === version.version ? 'active' : ''}`}>
                            versión {version.version}
                            {project.version === version.version && <FontAwesomeIcon icon={faCheckCircle} />}
                        </Link>)}
                    <Link href={pathname}
                        onClick={() => setShowModal(!showModal)}
                        className={`version-button button is-uppercase w-100 has-text-weight-bold is-relative current ${!searchParams ? 'active' : ''}`}>
                        versión {project.currentVersion} <span className='is-size-7 is-hidden-touch'> version actual </span>
                        {!searchParams && <FontAwesomeIcon icon={faCheckCircle} />}
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
}