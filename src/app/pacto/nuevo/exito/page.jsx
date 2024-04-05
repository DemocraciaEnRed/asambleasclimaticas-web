"use client"
import { redirect, useSearchParams } from "next/navigation"

import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/auth-context";

export default function SuccessProjectForm({}) {
  // get the user from store
  const { user } = useAuthContext()
  // get from the query string "projectId"
  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')

  return (
    <>
      <div className="hero is-fullheight is-bold is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faFile} /><br/>Proyecto creado</h1>
            <h2 className="subtitle has-text-white">El proyecto fue creado con éxito.</h2>
            <Link href="/"
              className="button is-white is-rounded"
            ><FontAwesomeIcon icon={faHome} />&nbsp;Ir al inicio</Link>
            {/* <Link href={`/pacto/${projectId}`}
              className="button is-white is-rounded">
              <FontAwesomeIcon icon={faFile} />&nbsp;Ver proyecto
            </Link> */}
          </div>
        </div>
      </div>
    </>
  )
}