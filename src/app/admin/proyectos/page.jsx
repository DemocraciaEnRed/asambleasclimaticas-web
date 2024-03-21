"use client"
import { useState, useEffect } from "react"
import { useRouter, redirect } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faChartSimple, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Link from 'next/link'
import Emoji from "@/components/common/emoji";
import { useAuthContext } from "@/context/auth-context";
import { adminFetchProjects } from "@/utils/get-data";

export default function AdminProjectPage({params}) {
  // get the user from store
  const { user } = useAuthContext()

  const router = useRouter()

  const [projects, setProjects] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  useEffect(() => {
    initFetch()
  }, [])

  async function initFetch() {
    try {
      // fetch
      const promises = [
        adminFetchProjects(page, limit),
      ]
      

      const [projectData] = await Promise.all(promises)
      // attach projects to array "projects"
      const projects = projectData.projects
      setProjects(projects)
      setPage(projectData.page)
      setPages(projectData.pages)
      setTotal(projectData.total)
      setNextPage(projectData.nextPage)
      setPrevPage(projectData.prevPage)
      setIsLoading(false)

    } catch (error) {
      router.push('/')
      console.error(error)
    }
  }

  async function fetchPage(thePage) {
    setIsLoadingMore(true)

    const promises = [
      adminFetchProjects(thePage, limit),
    ]

    const [projectData] = await Promise.all(promises)

    // attach projects to array "projects"
    const projects = projectData.projects
    setProjects(projects)
    setPage(projectData.page)
    setPages(projectData.pages)
    setTotal(projectData.total)
    setNextPage(projectData.nextPage)
    setPrevPage(projectData.prevPage)
    setIsLoadingMore(false)
    return;
  }

  function fetchNextPage() {
    if(!nextPage) return
    fetchPage(nextPage)
  }

  function fetchPreviousPage() {
    if(!prevPage) return
    fetchPage(prevPage)
  }

  function renderLoading () {
    return (
      <div className="has-text-centered">
        <p>Cargando...</p>
        <progress className="progress is-small is-primary mt-3" max="100">15%</progress>
      </div>
    )
  }

  function transformDate(dateString) {
    // YYYY-MM-DD HH:MM:SS
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    // const seconds = date.getSeconds()
    
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  return (
    <>
      <div className="">
        <h1 className="subtitle is-6 has-text-grey">Proyectos</h1>
        <h1 className="title is-3 mb-3">Listado de proyectos</h1>
        <p>Puede ver los proyectos creados por los autores y administradores. Se listarán tanto proyectos visibles como ocultos.</p>

        <hr />
        {
          isLoading && renderLoading()
        }
        <table className="table is-fullwidth is-narrow is-bordered">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Fechas</th>
              <th className="has-text-centered">Links</th>
            </tr>
          </thead>
          <tbody>
          {
            projects.map((project, index) => {
              return (
                <tr key={index}>
                  <td>
                    <p className="is-size-5 has-text-weight-bold"><Link className="has-text-info" href={`/pacto/${project._id}`}>{project.title_es}</Link> <span className="is-size-7 has-text-weight-normal has-text-grey">(v. {project.version})</span></p>
                    <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-center">
                      <Emoji emoji={project.author.country.emoji} />&nbsp;
                      <div className="has-text-weight-medium">{project.author.name} {project.author.lastname} <span className="has-text-grey is-italic">({project.author.role})</span></div>
                      
                    </div>
                    <div className="is-size-7 has-text-weight-medium">
                      {
                        project.hidden ? <span className="has-text-danger">Oculto</span> : <span className="has-text-success">Visible</span>
                      }&nbsp;-&nbsp;
                      {
                        !project.published ? <span className="has-text-danger">Borrador</span> : <span className="has-text-success">Publicado</span>
                      }&nbsp;-&nbsp;
                      {
                        project.closed ? <span className="has-text-danger">Cerrado</span> : <span className="has-text-success">Abierto</span>
                      }
                    </div>
                    <p className="has-text-grey is-size-7 is-italic">{project.shortAbout_es}</p>
                  </td>
                  <td>
                    <p className="is-size-7 has-text-weight-medium">Creado<br /><span className="has-text-grey is-size-7">{transformDate(project.createdAt)}</span></p>
                    <p className="is-size-7 has-text-weight-medium">Modificado<br /><span className="has-text-grey is-size-7">{transformDate(project.updatedAt)}</span></p>
                  </td>
                  <td>
                    <div className="buttons is-centered my-0">

                    <Link className="button is-white is-small px-2" href={`/pacto/${project._id}`}>
                      <FontAwesomeIcon icon={faFile} size="lg" />
                    </Link>
                    <Link className="button is-white is-small px-2" href={`/pacto/${project._id}/editar`}>
                      <FontAwesomeIcon icon={faPencil} size="lg" />
                    </Link>
                    <Link className="button is-white is-small px-2" href={`/pacto/${project._id}/estadisticas`}>
                      <FontAwesomeIcon icon={faChartSimple} size="lg" />
                    </Link>
                    </div>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
          <div className="is-flex is-flex-direction-row is-align-items-center">
            <button className="button is-small is-dark is-outlined" disabled={!prevPage} onClick={() => fetchPreviousPage()}>Anterior</button>
            <button className="button is-small is-dark is-outlined mx-2" disabled={!nextPage} onClick={() => fetchNextPage()}>Siguiente</button>
            <p className="is-size-7 has-text-grey mx-2">Página {page} de {pages}</p>
          </div>
          <div>
            <p className="is-size-7 has-text-grey">Total: {total}</p>
          </div>
        </div>
       </div>
    </>
  )
}