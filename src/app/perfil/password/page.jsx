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
import { setUser } from "@/store/reducers/auth";


export default function UserPasswordPage({params}) {
  // get the user from store
  const { user } = useSelector(state => state.auth)
  // redirect if user is not logged in
  if (!user) {
    redirect('/auth/login')
  }

  const userId = user.id
  const [userData, setUserData] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const userInfoRef = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value)
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  async function fetchData() {
    try {
      const userRes = await axiosServices.get(`/users/me`)
      const user = userRes.data.user
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

    axiosServices.put(`/users/me/password`, {
      currentPassword: currentPassword,
      newPassword: newPassword,
    })
    .then(() => {
      setMessage('Contraseña actualizada', 'success')
      setNewPassword('')
      setConfirmPassword('')
      setCurrentPassword('')
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
      <progress className="progress is-small is-primary mt-3" max="100">15%</progress>
    </div>
  }

  return (
    <>
      <h1 className="subtitle is-6 has-text-grey">Mi perfil / Cambiar contraseña</h1>
      <h1 className="title is-3 mb-5">{userData.name}</h1>
      <hr />
      <div className="field">
        <label className="label">Contraseña actual</label>
        <div className="control">
          <input className="input" type="password" value={currentPassword} onChange={handleCurrentPasswordChange} disabled={isUpdating} min={6}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Nueva contraseña</label>
        <div className="control">
          <input className="input" type="password" value={newPassword} onChange={handleNewPasswordChange} disabled={isUpdating} min={6}/>
        </div>
      </div>
      <div className="field">
        <label className="label">Confirmar contraseña</label>
        <div className="control">
          <input className="input" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} disabled={isUpdating} min={6}/>
        </div>
      </div>
      <div className="buttons is-right">
        <button className={`button is-primary ${isUpdating ? 'is-loading' : null}`} onClick={submit}>Cambiar contraseña</button>
      </div>
    </>
  )
}