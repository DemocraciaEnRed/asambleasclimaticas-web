"use client"
import { useState } from "react"
import { useRouter, redirect } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Link from 'next/link'
import Image from 'next/image'
import axiosServices from "@/utils/axios";
import { useEffect } from "react";

export default function AdminProjectPage({params}) {
  // get the user from store
  const { user } = useSelector(state => state.auth)

  // redirect if user is not logged in
  if (!user) {
    redirect('/auth/login')
  }

  // redirect if user is not admin or author
  if (user.role !== 'admin') {
    redirect('/')
  }

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
  
  async function initFetch() {
    try {
      // check if admin is the same as the user
       if(user.role !== 'admin') {
        console.log('----- not admin')
        // cannot be here, go to home
        router.push('/')
      }

      // fetch
      const promises = [
        axiosServices.get(`/admin/projects?limit=${limit}`),
      ]

      const [projectRes] = await Promise.all(promises)

      // attach projects to array "projects"
      const projectAux = projectRes.data.projects
      setProjects(projectAux)
      setPage(projectRes.data.page)
      setPages(projectRes.data.pages)
      setTotal(projectRes.data.total)
      setLimit(projectRes.data.limit)
      setNextPage(projectRes.data.nextPage)
      setPrevPage(projectRes.data.prevPage)

      setIsLoading(false)

    } catch (error) {
      router.push('/')
      console.error(error)
    }
  }

  async function fetchMore() {
    if(nextPage == null) {
      return
    }
    setIsLoadingMore(true)
    const promises = [
      axiosServices.get(`/admin/projects?page=${nextPage}&limit=${limit}`),
    ]

    const [projectRes] = await Promise.all(promises)

    // attach projects to array "projects"
    const projectAux = projectRes.data.projects
    setProjects([...projects, ...projectAux])
    setPage(projectRes.data.page)
    setPages(projectRes.data.pages)
    setTotal(projectRes.data.total)
    setLimit(projectRes.data.limit)
    setNextPage(projectRes.data.nextPage)
    setPrevPage(projectRes.data.prevPage)
    setIsLoadingMore(false)
    console.log(page)
    console.log(pages)
    console.log(total)
    console.log(limit)
    console.log(nextPage)
    console.log(prevPage)
    return;
  }

  function renderLoading () {
    return (
      <div className="has-text-centered">
        <p>Cargando...</p>
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



  useEffect(() => {
    initFetch()
  }, [])

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
                      <Image src={project.author.country.image} alt={project.author.country.name} className="mr-1" width="20" height="20" />
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
                    </div>
                  </td>
                </tr>
              )
            })
          }
          <tr>
            <td colSpan="3" className="has-text-centered">
              <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
                <p className="is-size-7 has-text-grey">Página {page} de {pages}</p>
                <p className="is-size-7 has-text-grey">Total de proyectos: {total}</p>
              </div>
            </td>
          </tr>
          {
            isLoadingMore && (
              <tr className="has-text-centered">
                <td colSpan="3" className="has-text-grey is-italic">
                  <p className="my-3">- Cargando más proyectos -</p>
                </td>
              </tr>
            )
          }
          {
            !isLoadingMore && nextPage && (
              <tr className="has-text-centered">
                <td colSpan="3" className="has-text-grey is-italic px-4">
                  <button className="button is-outlined is-dark is-small is-fullwidth my-3" onClick={fetchMore}>Cargar más</button>
                </td>
              </tr>
            )
          }
           {
            !isLoadingMore && !nextPage && (
              <tr className="has-text-centered">
                <td colSpan="3" className="has-text-grey is-italic px-4">
                  <p className="is-size-7">No hay más proyectos para mostrar</p>
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
       </div>
    </>
  )
}