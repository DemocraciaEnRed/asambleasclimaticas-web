"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter, redirect, usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Link from 'next/link'
import Image from 'next/image'
import axiosServices from "@/utils/axios";
import { faAngleDoubleRight, faCheck, faDownload, faExclamationTriangle, faPenClip, faShield, faSync, faTimes, faUserEdit, faUserShield } from "@fortawesome/free-solid-svg-icons";
import Emoji from "@/components/common/emoji";
import { faCheckCircle, faSave, faTimesCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import { setMessage } from "@/store/reducers/alert"
import UserInfoForm from "@/components/admin/userInfoForm";

export default function AdminUserInfoPage({params}) {
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

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // fetch
      const promises = [
        axiosServices.get(`/admin/users/${userId}`),
        axiosServices.get(`/projects?author=${userId}`)
      ]

      const [userRes, projectRes] = await Promise.all(promises)

      // attach projects to array "projects"
      const user = userRes.data
      const projectsTotal = projectRes.data.total
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
      setMessage({
        message: 'Rol de usuario actualizado', 
        type:'success'
      })

    } catch (error) {
      console.error(error)
      setMessage({
        message: 'Ha ocurrido un error al actualizar el rol del usuario', 
        type:'danger'
      })
    }
  }

  async function saveUserData() {
    const userInfo = userInfoRef.current.getUserInfo()
    console.log(userInfo)
    try {
      setIsUpdating(true)
      const response = await axiosServices.put(`/admin/users/${userId}`, userInfo)
      fetchData()
      setMessage({
        message: 'Datos de usuario actualizados', 
        type:'success'
      })

    } catch (error) {
      console.error(error)
      setMessage({
        message: 'Ha ocurrido un error al actualizar los datos del usuario', 
        type:'danger'
      })
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