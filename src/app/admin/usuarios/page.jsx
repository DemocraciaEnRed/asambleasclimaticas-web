"use client"
import { useState, useEffect } from "react"
import { useRouter, redirect } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import Image from 'next/image'
import axiosServices from "@/utils/axios";
import { faCheck, faDownload, faPenClip, faShield, faSync, faTimes, faUserEdit, faUserShield } from "@fortawesome/free-solid-svg-icons";
import Emoji from "@/components/common/emoji";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "@/context/auth-context";

export default function AdminUsersListPage({params}) {
  // get the user from store
  const { user } = useAuthContext()

  // redirect if user is not logged in
  if (!user) {
    redirect('/auth/login')
  }

  // redirect if user is not admin or author
  if (user.role !== 'admin') {
    redirect('/')
  }

  const router = useRouter()

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(15)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // check if admin is the same as the user
       if(user.role !== 'admin') {
        console.log('----- not admin')
        // cannot be here, go to home
        router.push('/')
      }

      // fetch
      const promises = [
        axiosServices.get(`/admin/users?limit=${limit}&page=${page}`),
      ]

      const [projectRes] = await Promise.all(promises)

      // attach projects to array "projects"
      const users = projectRes.data.users
      setUsers(users)
      setPage(projectRes.data.page)
      setPages(projectRes.data.pages)
      setTotal(projectRes.data.total)
      setNextPage(projectRes.data.nextPage)
      setPrevPage(projectRes.data.prevPage)
      setIsLoading(false)

    } catch (error) {
      router.push('/')
      console.error(error)
    }
  }

  async function fetchPage(thePage) {
    setIsLoadingMore(true)
    const promises = [
      axiosServices.get(`/admin/users?page=${thePage}&limit=${limit}`),
    ]

    const [projectRes] = await Promise.all(promises)

    // attach projects to array "projects"
    const users = projectRes.data.users
    setUsers(users)
    setPage(projectRes.data.page)
    setPages(projectRes.data.pages)
    setTotal(projectRes.data.total)
    setNextPage(projectRes.data.nextPage)
    setPrevPage(projectRes.data.prevPage)
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

  function getRoleTag (user) {
    switch(user.role) {
      case 'admin':
        return <span className="has-text-info">
          <FontAwesomeIcon icon={faShield} className="mr-1" /> Admin
        </span>
      case 'moderator':
        return <span className="has-text-warning">
          <FontAwesomeIcon icon={faUserShield} className="mr-1" /> Moderador
        </span>
      case 'author':
        return <span className="has-text-success">
          <FontAwesomeIcon icon={faPenClip} className="mr-1" /> Autor
        </span>
      default:
        return <span className="has-text-grey">
          Usuario
          </span>
    }
  }

  function getCountry (user) {
    if(user.country) {
      return (
        <span className="">
          <Emoji emoji={user.country.emoji} /> {user.country.name}
        </span>
      )
    }
    return 'Sin país'
  }

  function isVerified (user) {
    if(user.isVerified) {
      return (
        <span className="has-text-success">
          <FontAwesomeIcon icon={faCheckCircle} className="" /> Verificado
        </span>
      )
    }
    return (
      <span className="has-text-danger">
        <FontAwesomeIcon icon={faTimesCircle} className="" /> No verificado
      </span>
    )
  }

  function downloadCSV(){
    axiosServices.get('/admin/users/csv', {
      responseType: 'blob'
    })
    .then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      // get the filename from content-disposition
      const disposition = res.headers['content-disposition'];
      let filename = 'users.csv';
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {
      console.error(err)
    })
  }

  return (
    <>
      <h1 className="subtitle is-6 has-text-grey">Usuarios</h1>
      <h1 className="title is-3 mb-3">Listado de Usuarios</h1>
      <hr />
        {/* Button for download the csv full list of users */}
        <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
          <p>
            Descargar CSV completo de usuarios
          </p>
          <div onClick={downloadCSV} className="button is-small is-dark is-outlined">
            <FontAwesomeIcon icon={faDownload} className="mr-1" /> Descargar
          </div>
        </div>
      <hr />
      {
        isLoading && renderLoading()
      }
      { 
        !isLoading && users.length > 0 && (
          <>
          <table className="table is-fullwidth is-bordered is-narrow">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              { users.map((user, index) => (
                <tr key={user._id}>
                    <td>
                      <div>
                        <p><Link className="has-text-link" href={`/admin/usuarios/${user._id}`}><b>{user.name}</b></Link></p>
                        <div className="is-size-7 has-text-weight-medium">
                        {isVerified(user)} - {getCountry(user)}
                        </div>
                      </div>
                    </td>
                    <td className="middle">{getRoleTag(user)}</td>
                    <td className="middle">
                        <p className="is-size-7 is-italic has-text-grey">{user.email}</p>
                    </td>
                  </tr>
                ))
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
          </>
          
        )
      }
    </>
  )

}
