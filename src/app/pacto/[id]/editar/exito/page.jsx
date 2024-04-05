"use client"
import { redirect, useRouter } from "next/navigation"
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faHome, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/auth-context";

export default function SuccessEditProjectForm({params}) {
  // get the user from store
  const { user } = useAuthContext()
  const projectId = params.id

  return (
    <>
      <div className="hero is-fullheight is-bold is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPencil} /> <FontAwesomeIcon icon={faFile} /><br/>Proyecto editado</h1>
            <h2 className="subtitle has-text-white">El proyecto fue editado con éxito.</h2>
            <Link href="/"
              className="button is-white is-rounded"
            ><FontAwesomeIcon icon={faHome} />&nbsp;Ir al inicio</Link>
            {/* <Link href={`/pacto/${projectId}`}
              className="button is-white is-rounded">
              <FontAwesomeIcon icon={faPencil} />&nbsp;Ver proyecto
            </Link> */}
          </div>
        </div>
      </div>
    </>
  )
}