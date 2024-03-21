"use client"
import { useState, useEffect } from "react"
import { useRouter, redirect } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import Image from 'next/image'
import { faCheck, faDownload, faMedal, faPenClip, faShield, faSync, faTimes, faUserEdit, faUserShield } from "@fortawesome/free-solid-svg-icons";
import Emoji from "@/components/common/emoji";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "@/context/auth-context";
import { adminFetchUsers, adminFetchUsersCsv } from "@/utils/get-data";
import { useDebouncedCallback } from "use-debounce"

export default function AdminUsersListPage({params}) {
  // get the user from store
  const { user } = useAuthContext()

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
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [query])

  async function fetchData() {
    try {
      // fetch
      const promises = [
        adminFetchUsers(page, limit, query),
      ]

      const [usersData] = await Promise.all(promises)

      // attach projects to array "projects"
      const users = usersData.users
      setUsers(users)
      setPage(usersData.page)
      setPages(usersData.pages)
      setTotal(usersData.total)
      setNextPage(usersData.nextPage)
      setPrevPage(usersData.prevPage)
      setIsLoading(false)

    } catch (error) {
      router.push('/')
      console.error(error)
    }
  }

  async function fetchPage(thePage) {
    setIsLoadingMore(true)
    const promises = [
      adminFetchUsers(thePage, limit, query),
    ]

    const [usersData] = await Promise.all(promises)

    // attach projects to array "projects"
    const users = usersData.users
    setUsers(users)
    setPage(usersData.page)
    setPages(usersData.pages)
    setTotal(usersData.total)
    setNextPage(usersData.nextPage)
    setPrevPage(usersData.prevPage)
    setIsLoadingMore(false)
    return;
  }

  const queryDebounced = useDebouncedCallback(
    // function
    (query) => {
      setQuery(query)
    },
    // delay in ms
    800
  );

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
        <span>&nbsp;-&nbsp;<span className="">
          <Emoji emoji={user.country.emoji} /> {user.country.name}
        </span></span>
      )
    }
    return null
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

  function getParticipationInAssembly (user) {
    if(user.participatedInAssembly) {
      return (
        <span>&nbsp;-&nbsp;<span className="has-text-link">
          <FontAwesomeIcon icon={faMedal} className="" /> Participó
        </span></span>
      )
    }
    return null;
  }

  function downloadCSV(){
    adminFetchUsersCsv('/admin/users/csv', {
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
      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Buscar usuario por nombre o email" onChange={(e) => queryDebounced(e.target.value)} />
        </div>
      </div>
      {
        isLoading && renderLoading()
      }
      { 
        !isLoading && users.length > 0 && (
          <>
          {/* Input query for name or email */}
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
                        {isVerified(user)}{getCountry(user)}{getParticipationInAssembly(user)}
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
      {
        !isLoading && users.length === 0 && (
          <div className="has-text-centered">
            <p className="is-size-7 mt-6 mb-5 is-italic">No se han encontrado usuarios</p>
          </div>
        )
      }
    </>
  )

}
