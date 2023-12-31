"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axiosServices from "@/utils/axios";
import ProjectFormComponent from "@/components/pacto/form/projectForm";
import { useEffect } from "react";

export default function EditProjectForm({params}) {
  const router = useRouter()
  const projectId = params.id
  // get the user from store
  const { user } = useSelector(state => state.auth)
  // redirect if user is not logged in
  if (!user) {
    redirect('/auth/login')
  }
  // redirect if user is not admin or author
  if (user.role !== 'admin' && user.role !== 'author') {
    redirect('/')
  }

  const [project, setProject] = useState(null)
  const [isAuthor, setIsAuthor] = useState(false)
  
  async function getProjectWithArticlesData(projectId) {
    try {
      console.log(projectId)
      const promises = [
        axiosServices.get(`/projects/${projectId}`),
        axiosServices.get(`/projects/${projectId}/articles`)
      ]
      const [projectRes, projectArticlesRes] = await Promise.all(promises)
      const projectData = projectRes.data
      const articlesData = projectArticlesRes.data
      // check if author is the same as the user
      console.log('user', user._id)
      console.log('project', projectData.author._id)
      if (user.role === 'author' && user._id !== projectData.author._id) {
        console.log('----- author, but not the same author')
        // cannot be here, go to home
        router.push('/')
      } else if(user.role !== 'admin' && user.role !== 'author') {
        console.log('----- not admin')
        // cannot be here, go to home
        router.push('/')
      }
      const projectAux = projectData
      projectAux.articles = articlesData
      setProject(projectAux)
      setIsAuthor(true)
    } catch (error) {
      router.push('/')
      console.error(error)
    }
  }


  useEffect(() => {
    getProjectWithArticlesData(projectId)
  }, [])
  
  
  // const projectData = await getProjectData(params.id)
  // const projectArticlesData = await getProjectArticleData(params.id)
  // projectData.articles = projectArticlesData
  if(!project || !isAuthor) {
    return (
      <div className="section has-text-centered">
        - Cargando -
      </div>
    )
  }
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
              <p className="is-size-2"><b>{project.version}</b></p>
            </div>  
          </div>
        </div>
      </div>
      <div className="pacto-form section has-background-light">
        <div className="container is-fluid">
          <ProjectFormComponent project={project} />
        </div>
      </div>
    </>
  )
}