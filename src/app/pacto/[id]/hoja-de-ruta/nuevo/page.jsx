"use client"
import { useState } from "react"
import { useRouter, redirect } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faAsterisk, faPencil } from "@fortawesome/free-solid-svg-icons";
import EventFormComponent from "@/components/pacto/form/eventForm";
import { useEffect } from "react";
import { useAuthContext } from "@/context/auth-context";
import { fetchProjectId } from "@/utils/get-data";

export default function NewEventForm({params}) {
  const router = useRouter()
  const projectId = params.id
  // get the user from store
  const { user } = useAuthContext()
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
        fetchProjectId(projectId),
      ]
      const [projectData] = await Promise.all(promises)

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
          <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-flex-start">
            <div className="">
              <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faAsterisk} /> <FontAwesomeIcon icon={faFile} />&nbsp;Nuevo evento</h1>
              <p>Aquí puede crear nuevos eventos de la hoja de ruta del proyecto.</p>
            </div>
            <div className="box m-0 px-4 py-2 has-text-centered has-text-black" style={{minWidth: '130px'}} >
              <p>Versión</p>
              <p className="is-size-3"><b>{project.version}</b></p>
            </div>  
          </div>
        </div>
      </div>
      <div className="pacto-form section has-background-light">
        <div className="container is-fluid">
          <EventFormComponent project={project} />
        </div>
      </div>
    </>
  )
}