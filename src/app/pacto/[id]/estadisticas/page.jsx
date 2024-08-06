"use client"
import { useState } from "react"
import { useRouter, redirect } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ProjectStats from "@/components/pacto/stats/projectStats";
import { useEffect } from "react";
import { useAuthContext } from "@/context/auth-context";
import { fetchArticleProjectId, fetchCountries, fetchProjectId, fetchStatsProjectId } from "@/utils/get-data";



export default function StatsProjectPage({params}) {
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
  const [countries, setCountries] = useState([])
  const [isAuthor, setIsAuthor] = useState(false)
  
  async function getProjectWithArticlesData(projectId) {
    try {
      console.log(projectId)
      const promises = [
        fetchProjectId(projectId),
        fetchArticleProjectId(projectId),
        fetchStatsProjectId(projectId),
        fetchCountries()
      ]
      const [projectData, articlesData, projectCurrentStatsData, countriesData] = await Promise.all(promises)

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
      projectAux.stats = projectCurrentStatsData
      setProject(projectAux)
      setCountries(countriesData)
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
              <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPencil} />&nbsp;Estadisticas</h1>
              <h2 className="subtitle is-4 has-text-white is-italic">{project.title_es}</h2>
              {/* <p>Puede editar el proyecto las veces que quiera. La edición de un proyecto no genera una nueva versión.</p> */}
            </div>
            <div className="box m-0 px-4 py-2 has-background-dark has-text-centered has-text-white is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
              <p>Versión</p>
              <p className="is-size-2"><b>{project.version}</b></p>
            </div>  
          </div>
        </div>
      </div>
      <div className="section has-background-light">
        <div className="container">
          <ProjectStats project={project} countries={countries} />
        </div>
      </div>
    </>
  )
}