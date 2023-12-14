import React from 'react'
import Link from 'next/link'


const ProjectHeaderVersion = ({ project, version }) => (
  <div className='project-version-wrapper isflex is-flex-direction-column is-justify-content-center'>
    <p className='title has-text-weight-bold'>Versión {version}</p>
    <p className='version-link is-underlined'>
      <Link href={{ pathname: '/versiones', query: { id: project } }}>+Versiones</Link>
    </p>
  </div>
)



export default ProjectHeaderVersion
