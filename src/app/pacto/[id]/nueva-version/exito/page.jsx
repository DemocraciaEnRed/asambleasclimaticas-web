"use client"
import { redirect, useRouter } from "next/navigation"
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faHome, faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function SuccessEditProjectForm({params}) {
  // get the user from store
  const { user } = useSelector(state => state.auth)
  const projectId = params.id

  // redirect if user is not logged in
  if (!user) {
    redirect('/auth/login')
  }
  // redirect if user is not admin or author
  if (user.role !== 'admin' && user.role !== 'author') {
    redirect('/')
  }

  return (
    <>
      <div className="hero is-fullheight is-bold is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faAsterisk} /> <FontAwesomeIcon icon={faFile} /><br/>Nueva versión publicada</h1>
            <p class="my-5 is-italic">La nueva versión del proyecto fue publicada exitosamente</p>
            <div className="buttons is-centered mt-3">
              <Link href={`/pacto/${projectId}`}
                className="button is-white is-rounded">
                <FontAwesomeIcon icon={faFile} />&nbsp;Ir al proyecto
              </Link>
              <Link href="/"
                className="button is-white is-rounded is-outlined"
                ><FontAwesomeIcon icon={faHome} />&nbsp;Ir al inicio</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}