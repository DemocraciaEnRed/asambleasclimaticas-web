"use client"
import { redirect, useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProjectFormComponent from "@/components/pacto/form/projectForm";
import { useSelector } from "react-redux";

export default function NewProjectForm({}) {
  // get the user from store
  const { user } = useSelector(state => state.auth)
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
      <div className="section has-background-black has-text-white">
        <div className="container is-fluid">
          <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faFile} />&nbsp;Proyecto Nuevo</h1>
            <p>Despues de crear el proyecto, el mismo quedara <u>oculto</u> hasta que lo publiques.</p>
            <p>Una vez publicado, el proyecto sera visible para todos los usuarios. Aseguresé de que el proyecto este listo para ser publicado.</p>
          </div>
        </div>
      <div className="pacto-form section has-background-light">
        <div className="container is-fluid">
          <ProjectFormComponent />
        </div>
      </div>
    </>
  )
}
