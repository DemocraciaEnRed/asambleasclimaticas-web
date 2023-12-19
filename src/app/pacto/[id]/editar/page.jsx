import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axiosServices from "@/utils/axios";
import ProjectFormComponent from "@/components/pacto/form/projectForm";

async function getProjectData(projectId) {
  console.log(projectId)
  const response = await fetch(`http://localhost:3000/projects/${projectId}`, {cache: 'no-store'})
  if (response.status !== 200) {
    throw new Error('Failed to fetch')
  }
  const projectData = await response.json()
  return projectData
}

async function getProjectArticleData(projectId) {
  console.log(projectId)
  const response = await fetch(`http://localhost:3000/projects/${projectId}/articles`, {cache: 'no-store'})
  if (response.status !== 200) {
    throw new Error('Failed to fetch')
  }
  const projectArticlesData = await response.json()
  return projectArticlesData
}

export default async function NewProjectForm({params}) {
  const projectData = await getProjectData(params.id)
  const projectArticlesData = await getProjectArticleData(params.id)
  projectData.articles = projectArticlesData

  return (
    <>
      <div className="section has-background-black has-text-white">
        <div className="container is-fluid">
          <div className="is-flex is-flex-direction-row is-justify-content-space-between">
            <div className="">
              <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPencil} /> <FontAwesomeIcon icon={faFile} />&nbsp;Editar Proyecto</h1>
                <p>Puede editar el proyecto las veces que quiera. La edición de un proyecto no genera una nueva versión.</p>
            </div>
            <div className="box m-0 px-4 py-2 has-background-dark has-text-centered has-text-white is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
              <p>Versión</p>
              <p class="is-size-2"><b>{projectData.version}</b></p>
            </div>  
          </div>
        </div>
      </div>
      <div className="pacto-form section has-background-light">
        <div className="container is-fluid">
          <ProjectFormComponent project={projectData} />
        </div>
      </div>
    </>
  )
}