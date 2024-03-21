"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter, redirect, usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import { useAuthContext } from "@/context/auth-context";
import { adminFetchProjectsByAuthor, adminFetchUserId } from "@/utils/get-data";

import axiosServices from "@/utils/axios";
import { faAngleDoubleRight, faExclamationTriangle, faPenClip, faShield, faSync, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faSave, faTimesCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import UserInfoForm from "@/components/user/userInfoForm";
import { useAlert } from "@/context/alert-context";


export default function AdminUserInfoPage({params}) {
  // get the user from store
  const { user, refreshUser } = useAuthContext()

  const router = useRouter()
  const pathname = usePathname()

  const isRouteActive = (path, strict = false) => {
    // check if pathname (string) contains or starts with path (string)
    if(strict) return pathname === path

    if (pathname.includes(path)) {
      return true
    }

    return false
  }

  const userId = params.id
  const [userData, setUserData] = useState(null);
  const [projectsTotal, setProjectsTotal] = useState(0)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const userInfoRef = useRef(null)

  const{addAlert} = useAlert()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // fetch
      const promises = [
        adminFetchUserId(userId),
        adminFetchProjectsByAuthor(userId)
      ]

      const [user, projects] = await Promise.all(promises)
      const projectsTotal = projects.total

      // attach projects to array "projects"

      setUserData(user)
      setProjectsTotal(projectsTotal)
      setIsLoading(false)
      setIsUpdating(false)
    } catch (err) {
      setFetchFailed(true)
      setIsLoading(false)
      setIsUpdating(false)
      console.error(err)
    }

  }

  function getClassTagForRole (role) {
    if(userData.role === role) {
      return 'tag is-medium is-clickable is-primary'
    }
    return 'tag is-medium is-clickable'
  
  }

  async function setUserRole(role) {
    if(role === userData.role) return
    try {
      setIsUpdating(true)
      const response = await axiosServices.put(`/admin/users/${userId}/role`, {role})
      fetchData()
      if(user._id === userId) {
        refreshUser()
      }
      addAlert('Rol de usuario actualizado','success')
    } catch (error) {
      console.error(error)
      addAlert('Ha ocurrido un error al actualizar el rol del usuario', 'danger')
    }
  }

  async function saveUserData() {
    const userInfo = userInfoRef.current.getUserInfo()
    console.log(userInfo)
    try {
      setIsUpdating(true)
      const response = await axiosServices.put(`/admin/users/${userId}`, userInfo)
      fetchData()
      // refresh user if it's the same user
      if(user._id === userId) {
        refreshUser()
      }
      addAlert('Datos de usuario actualizados','success')

    } catch (error) {
      console.error(error)
      addAlert('Ha ocurrido un error al actualizar los datos del usuario', 'danger')
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

  async function setParticipatedInAssembly(participatedInAssembly) {
    if(participatedInAssembly === userData.participatedInAssembly) return
    try {
      setIsUpdating(true)
      const response = await axiosServices.put(`/admin/users/${userId}/participation`, {participatedInAssembly})
      fetchData()
      if(user._id === userId) {
        refreshUser()
      }
      addAlert('El usuario ha sido actualizado correctamente','success')
    } catch (error) {
      console.error(error)
      addAlert('Ha ocurrido un error al actualizar el rol del usuario', 'danger')
    }
  }

  return (
    <>
      { isUpdating && <FontAwesomeIcon icon={faSync} spin className="has-text-primary" style={{position: 'absolute', right: '1rem', top: '1rem'}} /> }
      <h1 className="subtitle is-6 has-text-grey"><Link href="/admin/usuarios">Usuarios</Link> / Ver usuario</h1>
      <h1 className="title is-3 mb-5">{userData.name}</h1>
      <div className="tabs is-fullwidth mb-5">
        <ul>
          <li className={isRouteActive(`/admin/usuarios/${userId}`, true) ? 'is-active' : ''}><Link href={`/admin/usuarios/${userId}`}>Información</Link></li>
          <li className={isRouteActive(`/admin/usuarios/${userId}/password`, true) ? 'is-active' : ''}><Link href={`/admin/usuarios/${userId}/password`}>Contraseña</Link></li>
          <li className={isRouteActive(`/admin/usuarios/${userId}/email`, true) ? 'is-active' : ''}><Link href={`/admin/usuarios/${userId}/email`}>Email</Link></li>
          {/* {
            !userData.isVerified && <li><a>Verificar usuario</a></li>
          }

          {
            (['admin', 'author']).includes(userData.role) && <li><a>Proyectos</a></li>
          } */}
        </ul>
      </div>
      <h3 className="title is-4 mb-1 has-text-weight"><FontAwesomeIcon icon={faAngleDoubleRight} /> Información basica del usuario</h3>
      <p>Puede editar la información básica del usuario aquí.</p>
      <UserInfoForm userInfo={userData} ref={userInfoRef} />
      <div className="buttons is-right mt-4 mb-0">
        <button className={`button is-primary ${isUpdating ? 'is-loading' : ''}`} onClick={saveUserData}><FontAwesomeIcon icon={faSave} />&nbsp;Guardar</button>
      </div>
      <hr />
      <h3 className="title is-4 mb-1 has-text-weight"><FontAwesomeIcon icon={faAngleDoubleRight} /> Rol del usuario</h3>
      <p className="mb-3">Haga clic para cambiar el rol del usuario.<br /><b>NOTA:</b> Considere que si el usuario es autor o admin, bajar su rol puede hacer que pierda acceso a ciertas funciones o acceso a sus propios contenidos.</p>
      {/* <dd>{getRoleTag(userData)}</dd> */}
      <div className="tags">
        <span className={getClassTagForRole('admin')}
          onClick={() => setUserRole('admin')}
        >
          <FontAwesomeIcon icon={faShield} />&nbsp;Admin</span>
        <span className={getClassTagForRole('author')}
          onClick={() => setUserRole('author')}
        >
          <FontAwesomeIcon icon={faPenClip} />&nbsp;Autor</span>
        <span className={getClassTagForRole('moderator')}
          onClick={() => setUserRole('moderator')}
        >
          <FontAwesomeIcon icon={faUserShield} />&nbsp;Moderador</span>
        <span className={getClassTagForRole('user')}
          onClick={() => setUserRole('user')}
        >
          <FontAwesomeIcon icon={faUser} />&nbsp;Usuario</span>
      </div>
      {
        ([ 'admin', 'author' ].includes(userData.role)) && projectsTotal > 0 && (
          <div className="notification is-warning py-3 px-4">
            <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;El usuario tiene {projectsTotal} proyectos asociados. Considere que si el usuario es autor o admin, bajar su rol puede hacer que pierda acceso a sus propios contenidos. Evalue cambiar de propietario los proyectos antes de cambiar el rol.
          </div>
        )
      }
      <hr />
      <h3 className="title is-4 mb-1 has-text-weight"><FontAwesomeIcon icon={faAngleDoubleRight} /> Participación en asambleas</h3>
      <p className="mb-3">Si el usuario participó de una de las asambleas puede marcar su participacion aqui</p>
      <div className="tags">
        <span className={userData.participatedInAssembly ? 'tag is-medium is-clickable is-primary' : 'tag is-medium is-clickable'}
          onClick={() => setParticipatedInAssembly(true)}
        >
          <FontAwesomeIcon icon={faCheckCircle} />&nbsp;Participó</span>
        <span className={!userData.participatedInAssembly ? 'tag is-medium is-clickable is-danger' : 'tag is-medium is-clickable'}
          onClick={() => setParticipatedInAssembly(false)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />&nbsp;No participó</span>
      </div>
      <hr />
      <h3 className="title is-4 mb-1 has-text-weight"><FontAwesomeIcon icon={faAngleDoubleRight} /> Usuario verificado</h3>
      {
        userData.isVerified ? (
          <div className="notification is-success py-3 px-4">
            <FontAwesomeIcon icon={faCheckCircle} />&nbsp;El usuario ha verificado su correo electrónico
          </div>
        ) : (
          <div className="notification is-danger py-3 px-4">
            <FontAwesomeIcon icon={faTimesCircle} />&nbsp;El usuario aún no ha verificado su correo electrónico
          </div>
        )
      }
    </>
  )

}