"use client"
import { redirect, useSearchParams } from "next/navigation"

import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function SuccessProjectForm({}) {
  // get the user from store
  const { user } = useSelector(state => state.auth)
  // get from the query string "projectId"
  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')
  const published = searchParams.get('published') === 'true'
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
            { published ? (
                <>
                  <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faFile} /><br/>Proyecto creado</h1>
                  <p class="my-5 is-italic">El proyecto se encuentra publicado y visible a los usuarios</p>
                </>
              )
              : (
                <>
                  <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faFile} /><br/>Borrador de proyecto creado</h1>
                  <p class="my-5 is-italic">El proyecto se encuentra sin publicar.<br />Recuerde que deberá publicarlo para que sea visible a los usuarios</p>
                </>
              )
            }
            <div className="buttons is-centered mt-3">
            { published ? (
                <>
                  <Link href={`/pacto/${projectId}`}
                    className="button is-white is-rounded">
                    <FontAwesomeIcon icon={faFile} />&nbsp;Ir al proyecto
                  </Link>
                </>
              )
              : null
            }
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