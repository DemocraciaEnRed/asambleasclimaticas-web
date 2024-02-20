"use client"
import { useState, useEffect, useRef } from "react"
import { redirect } from "next/navigation"
import axiosServices from "@/utils/axios";
import { useAlert } from "@/context/alert-context";
import { useAuthContext } from "@/context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";


export default function UserEmailPage({params}) {
  // get the user from store
  const { user, logoutContext } = useAuthContext()
  const { addAlert } = useAlert()

  // redirect if user is not logged in
  if (!user) {
    redirect('/auth/login')
  }

  const userId = user.id
  const [userData, setUserData] = useState(user)
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')



  function submit() {

    if (newEmail === user.email) {
      addAlert('El nuevo email no puede ser igual al actual', 'error')
      return
    }

    if (!password.length) {
      addAlert('Ingresá tu contraseña', 'error')
      return
    }

    if (!newEmail.includes('@') || !newEmail.includes('.')) {
      addAlert('Ingresá un email válido', 'error')
      return
    }


    setIsLoading(true)

    axiosServices.put(`/users/me/email`, {
      password: password,
      email: newEmail,
    })
    .then(() => {
      addAlert('Email actualizado', 'success')
      logoutContext()
      window.location.href = '/auth/verify-notice'
    })
    .catch(err => {
      addAlert('Error al actualizar email', 'error')
      console.error(err)
      setIsLoading(false)
    })
  }



  if(isLoading) {
    return <div className="has-text-centered">
      <p>Cargando...</p>
      <progress className="progress is-small is-primary mt-3" max="100">15%</progress>
    </div>
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value)
  }

  const passwordLength = password.length >= 6
  const emailValid = newEmail.includes('@') && newEmail.includes('.')
  const differentEmail = newEmail !== user.email

  return (
    <>
      <h1 className="subtitle is-6 has-text-grey">Mi perfil / Cambiar email</h1>
      <h1 className="title is-3 mb-5">{userData.name}</h1>
      <hr />
      <div className="field">
        <div className="notification is-success py-3 px-4">
          <FontAwesomeIcon icon={faCheckCircle} />&nbsp;Tu email <b>{user.email}</b> ha sido verificada correctamente
        </div>
      </div>
      <p>Si cambiaste tu email, podes actualizarlo acá. Al cambiar tu email, tu sesión se cerrará y deberás verificar tu email antes de volver a iniciar sesión.</p>
      <br />
      <div className="field">
        <label className="label">Ingresá tu nuevo email</label>
        <div className="control">
          <input className="input" type="email" placeholder="Email" disabled={isLoading} onChange={handleNewEmailChange} />
        </div>
        {
          newEmail && !emailValid && (
            <p className="help is-danger"><FontAwesomeIcon icon={faTriangleExclamation} />&nbsp;Ingresá un email válido</p>
          )
        }
        {
          newEmail && !differentEmail && (
            <p className="help is-danger"><FontAwesomeIcon icon={faTriangleExclamation} />&nbsp;El nuevo email no puede ser igual al actual</p>
          )
        }
      </div>
      <div className="field">
        <label className="label">Ingresá tu contraseña actual</label>
        <div className="control">
          <input className="input" type="password" placeholder="Contraseña" onChange={handlePasswordChange} disabled={isLoading} min={6} />
        </div>
        {
          password && !passwordLength && (
            <p className="help is-danger"><FontAwesomeIcon icon={faTriangleExclamation} />&nbsp;La contraseña debe tener al menos 6 caracteres</p>
          )
        }
      </div>
      <p className="has-text-info"><FontAwesomeIcon icon={faTriangleExclamation} />&nbsp;<b>¡RECORDÁ!</b> Al cambiar tu email, tu sesión se cerrará y deberás verificar tu email antes de volver a iniciar sesión.</p>
      <div className="buttons is-right mt-4 mb-0">
        <button className={`button is-primary ${isLoading && 'is-loading'}`} onClick={submit}>&nbsp;Cambiar email</button>
      </div>
    </>
  )
}