"use client"
import { useState, useEffect, useRef } from "react"
import { redirect } from "next/navigation"
import axiosServices from "@/utils/axios";
import { useAlert } from "@/context/alert-context";
import { useAuthContext } from "@/context/auth-context";


export default function UserPasswordPage({params}) {
  // get the user from store
  const { user } = useAuthContext()
  const { addAlert } = useAlert()

  
  const [userData, setUserData] = useState(user)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // redirect if user is not logged in
  if (!userData) {
    redirect('/auth/login')
  }

  useEffect(() => {
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

  function submit() {
    if (newPassword !== confirmPassword) {
      addAlert('Las contraseñas no coinciden', 'error')
      return
    }

    setIsLoading(true)

    axiosServices.put(`/users/me/password`, {
      currentPassword: currentPassword,
      newPassword: newPassword,
    })
    .then(() => {
      addAlert('Contraseña actualizada', 'success')
      setNewPassword('')
      setConfirmPassword('')
      setCurrentPassword('')
      setIsLoading(false)
    })
    .catch(err => {
      addAlert('Error al actualizar contraseña', 'error')
      setIsLoading(false)
    })
  }

  const passwordsMatch = newPassword === confirmPassword
  const passwordLength = newPassword.length >= 6

  return (
    <>
      <h1 className="subtitle is-6 has-text-grey">Mi perfil / Cambiar contraseña</h1>
      <h1 className="title is-3 mb-5">{userData.name}</h1>
      <hr />
      <div className="columns">
        <div className="column is-8">

          <div className="field">
            <label className="label">Contraseña actual</label>
            <div className="control">
              <input className="input" type="password" value={currentPassword} onChange={handleCurrentPasswordChange} disabled={isLoading} min={6}/>
            </div>
          </div>
          <div className="field">
            <label className="label">Nueva contraseña</label>
            <div className="control">
              <input className="input" type="password" value={newPassword} onChange={handleNewPasswordChange} disabled={isLoading} min={6}/>
            </div>
            {
              newPassword && !passwordLength && <p className="help is-danger">La contraseña debe tener al menos 6 caracteres</p>
            }
          </div>
          <div className="field">
            <label className="label">Confirmar contraseña</label>
            <div className="control">
              <input className="input" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} disabled={isLoading} min={6}/>
            </div>
            {
              newPassword && confirmPassword && !passwordsMatch && <p className="help is-danger">Las contraseñas no coinciden</p>
            }
          </div>
          <div className="buttons">
            <button className={`button is-primary ${isLoading ? 'is-loading' : null}`} onClick={submit}>Cambiar contraseña</button>
          </div>
        </div>
      </div>
    </>
  )
}