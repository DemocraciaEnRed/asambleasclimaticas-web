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


export default function UserProfilePage({params}) {
  // get the user from store
  const { user } = useSelector(state => state.auth)
  // redirect if user is not logged in
  if (!user) {
    redirect('/auth/login')
  }

  const userId = user.id
  const [userData, setUserData] = useState(null);
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
        axiosServices.get(`/users/me`),
      ]

      const [userRes] = await Promise.all(promises)

      // attach projects to array "projects"
      const user = userRes.data.user
      setUserData(user)
      setIsLoading(false)
      setIsUpdating(false)
    } catch (err) {
      setFetchFailed(true)
      setIsLoading(false)
      setIsUpdating(false)
      console.error(err)
    }

  }

  async function saveUserData() {
    const userInfo = userInfoRef.current.getUserInfo()
    console.log(userInfo)
    try {
      setIsUpdating(true)
      const response = await axiosServices.put(`/users/me`, userInfo)
      fetchData()
      // TODO Tina no puedo hacer que esto actualice el storage.
      setUser(response.data.user)
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

  return (
    <>
      <div className="">
        <h1 className="subtitle is-6 has-text-grey">Mi perfil</h1>
        <h1 className="title is-3 mb-5">{userData.name}</h1>
        <hr />
        <UserInfoForm userInfo={userData} ref={userInfoRef} />
        <div className="buttons is-right mt-4 mb-0">
          <button className={`button is-primary ${isUpdating ? 'is-loading' : ''}`} onClick={saveUserData}><FontAwesomeIcon icon={faSave} />&nbsp;Guardar</button>
        </div>
       </div>
    </>
  )
}