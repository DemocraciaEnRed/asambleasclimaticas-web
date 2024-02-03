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

export default function AdminUserInfoPage({params}) {
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

  const userId = params.id
  const [userData, setUserData] = useState(null);
  const [fetchFailed, setFetchFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // fetch
      const promises = [
        axiosServices.get(`/admin/users/${userId}`),
      ]

      const [userRes] = await Promise.all(promises)

      // attach projects to array "projects"
      const user = userRes.data
      setUserData(user)
      setIsLoading(false)
    } catch (err) {
      setFetchFailed(true)
      setIsLoading(false)
      console.log(err)
    }

  }

  if(isLoading) {
    return <div className="has-text-centered">
      <p>Cargando...</p>
      <progress className="progress is-small is-primary mt-3" max="100">15%</progress>
    </div>
  }

  if(fetchFailed) {
    return <div className="has-text-centered">
      <p>Ha ocurrido un error al cargar los datos del usuario</p>
      <p>Por favor, intente nuevamente</p>
    </div>
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

  function getLanguage (user) {
    switch(user.lang) {
      case 'es':
        return 'Español'
      case 'pt':
        return 'Portugués'
      default:
        return '-Invalid-'
    }
  }

  return (
    <>
      <h1 className="subtitle is-6 has-text-grey"><Link href="/admin/usuarios">Usuarios</Link> / Ver usuario</h1>
        
      <h1 className="title is-3 mb-3">{userData.name}</h1>
      <hr />
      <div className="">
        <div className="mb-3">
          <dt className="has-text-weight-bold">Acerca de mí</dt>
          <dd className="is-italic">{userData.bio || '-'}</dd>
        </div>
        <div className="columns is-multiline">
          <div className="column is-6">
            <dt className="has-text-weight-bold">Nombre</dt>
            <dd>{userData.name}</dd>
          </div>
          <div className="column is-6">
            <dt className="has-text-weight-bold">Email</dt>
            <dd><a className="has-text-info is-underlined" href={`mailto:${userData.email}`}>{userData.email}</a></dd>
          </div>
          <div className="column is-6">
            <dt className="has-text-weight-bold">Lenguaje</dt>
            <dd>{getLanguage(userData)}</dd>
          </div>
          <div className="column is-6">
            <dt className="has-text-weight-bold">País</dt>
            <dd>{getCountry(userData)}</dd>
          </div>
          <div className="column is-6">
            <dt className="has-text-weight-bold">Rol asignado</dt>
            <dd>{getRoleTag(userData)}</dd>
          </div>
          <div className="column is-6">
            <dt className="has-text-weight-bold">Verificado</dt>
            <dd>
              {
                userData.isVerified ? <span className="has-text-success">
                  <FontAwesomeIcon icon={faCheckCircle} className="" /> Verificado
                </span> : <span className="has-text-danger">
                  <FontAwesomeIcon icon={faTimesCircle} className="" /> No verificado
                </span>
              }
            </dd>
          </div>
          
        </div>
        
      </div>
    </>
  )

}