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

export default function AdminUserInfoPasswordPage({params}) {
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

  const userId = params.id
  const pathname = usePathname()
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
  
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  async function fetchData() {
    try {
      const userRes = await axiosServices.get(`/admin/users/${userId}`)
      const user = userRes.data
      setUserData(user)
      setIsLoading(false)
    } catch (err) {
      setMessage('Error al cargar usuario', 'error')
    }
  }
  

  function submit() {
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden', 'error')
      return
    }

    setIsUpdating(true)

    axiosServices.put(`/admin/users/${userId}/password`, {
      password: newPassword,
    })
    .then(() => {
      setMessage('Contraseña actualizada', 'success')
      setNewPassword('')
      setConfirmPassword('')
      setIsUpdating(false)
    })
    .catch(err => {
      setMessage('Error al actualizar contraseña', 'error')
      setIsUpdating(false)
    })
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
      <p>Puede forzar una contraseña para el usuario. NOTA: Verifique previamente al usuario que solicita el cambio de contraseña.</p>
      <br />
      <div className="field">
        <label className="label">Nueva contraseña</label>
        <div className="control">
          <input className="input" type="password" value={newPassword} onChange={handleNewPasswordChange} disabled={isUpdating} />
        </div>
      </div>
      <div className="field">
        <label className="label">Confirmar contraseña</label>
        <div className="control">
          <input className="input" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} disabled={isUpdating} />
        </div>
      </div>
      <div className="buttons is-right">
        <button className={`button is-primary ${isUpdating ? 'is-loading' : null}`} onClick={submit}>Cambiar contraseña</button>
      </div>
    </div>
  )
}