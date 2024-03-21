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
import { useAlert } from "@/context/alert-context";
import UserInfoForm from "@/components/user/userInfoForm";
import { useAuthContext } from "@/context/auth-context";

export default function AdminUserInfoPasswordPage({params}) {
  // get the user from store
  const { user, refreshUser } = useAuthContext()
  const { addAlert } = useAlert()

  const userId = params.id
  const pathname = usePathname()
  const [userData, setUserData] = useState(null);
  const [newEmail, setNewEmail] = useState('')
  const [forceVerified, setForceVerified] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchData()
  }
  , [])

  const isRouteActive = (path, strict = false) => {
    // check if pathname (string) contains or starts with path (string)
    if(strict) return pathname === path

    if (pathname.includes(path)) {
      return true
    }

    return false
  }

  async function fetchData() {
    try {
      const userRes = await axiosServices.get(`/admin/users/${userId}`)
      const user = userRes.data
      setUserData(user)
      setIsLoading(false)
    } catch (err) {
      addAlert('Error al cargar usuario', 'error')
    }
  }
  

  function submit() {
    setIsUpdating(true)
    axiosServices.put(`/admin/users/${userId}/email`, {email: newEmail, forceVerified})
    .then(res => {
      addAlert('Email actualizado', 'success')
      setNewEmail('')
      fetchData()
      // refresh user if it's the same user
      if(user._id === userId) {
        refreshUser()
      }
      setIsUpdating(false)
    })
    .catch(err => {
      addAlert('Error al actualizar email', 'error')
      setIsUpdating(false)
    })
  }

  const handleForceVerifiedChange = (e) => {
    setForceVerified(e.target.checked)
  }

  if(isLoading) {
    return <div className="has-text-centered">
      <p>Cargando...</p>
      <progress className="progress is-small is-primary mt-3" max="100"></progress>
    </div>
  }


  return (
    <div>
      <h1 className="subtitle is-6 has-text-grey"><Link href="/admin/usuarios">Usuarios</Link> / Contraseña</h1>
      <h1 className="title is-3 mb-5">{userData.name}</h1>
      <div className="tabs is-fullwidth mb-5">
        <ul>
          <li className={isRouteActive(`/admin/usuarios/${userId}`, true) ? 'is-active' : ''}><Link href={`/admin/usuarios/${userId}`}>Información</Link></li>
          <li className={isRouteActive(`/admin/usuarios/${userId}/password`, true) ? 'is-active' : ''}><Link href={`/admin/usuarios/${userId}/password`}>Contraseña</Link></li>
          <li className={isRouteActive(`/admin/usuarios/${userId}/email`, true) ? 'is-active' : ''}><Link href={`/admin/usuarios/${userId}/email`}>Email</Link></li>
        </ul>
      </div>
      <p>Puede cambiar el email de un usuario. Generalmente, se verifican los emails con cada cambio de email, pero puede mantener la verificación si no quiere que el usuario pase por el proceso de verificació.</p>
      <br />
      <div className="field">
        <label className="label">Usuario verificado</label>
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
      </div>
      <div className="field">
        <label className="label">Nuevo email</label>
        <div className="control">
          <input className={`input`} type="text" value={newEmail} onChange={e => setNewEmail(e.target.value)} disabled={isUpdating}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Verificar usuario</label>
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" checked={forceVerified} onChange={handleForceVerifiedChange} disabled={isUpdating}/>
            &nbsp;Dar por <span className="has-text-success"><u>verificada</u></span> la cuenta con el nuevo email
          </label>
          {
            !forceVerified && (
              <p className="help">El usuario deberá verificar su correo electrónico con el nuevo email.</p>
            )
          }
        </div>
      </div>
      <div className="buttons is-right">
        <button className={`button is-primary ${isUpdating ? 'is-loading' : ''}`} onClick={submit} disabled={isUpdating}>
          <FontAwesomeIcon icon={faSave} />&nbsp;Guardar
        </button>
      </div>
    </div>
  )
}