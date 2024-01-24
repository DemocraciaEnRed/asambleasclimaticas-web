'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const ProjectHeaderVersion = ({ project, version }) => {
  const [showModal, setShowModal] = useState(false)

  const pathname = usePathname()

  return (<div className={`project-version-wrapper is-flex is-flex-direction-column is-align-items-center ${project.version === project.currentVersion ? 'has-background-grey-light has-text-grey':'has-background-danger has-text-white'} py-3 px-4`}>
    <p className={`has-text-weight-light is-size-6`}>Versión {version}</p>
    {project.version !== project.currentVersion && <p className={`has-text-weight-light is-size-7`}>(Versión antigua)</p>}
    <div className={`version-link is-underlined`}>
      <p className='is-clickable' onClick={() => project.versions.length > 0 && setShowModal(!showModal)}>+Versiones</p>
    </div>
    <div className={`modal ${showModal ?'is-active':''}`}>
      <div className="modal-background"  onClick={() => setShowModal(!showModal)}></div>
      <div className="card">
      <p className="title has-text-centered">
        Elección de Versiones

      </p>

      <div className="version-modal modal-content is-flex is-flex-direction-column is-align-items-center ">
        { project.versions.map(version=> <Link href={{pathname, query:{version:version.version}}} onClick={() => setShowModal(!showModal)} key={version.version} className='version-button button is-uppercase w-75'> versión {version.version} </Link>)} 
      </div>
      <button className="modal-close is-large"  onClick={() => setShowModal(!showModal)} aria-label="close"></button>
      </div>
    </div>
  </div>
  )
}



export default ProjectHeaderVersion
