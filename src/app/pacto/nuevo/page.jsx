"use client"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProjectFormComponent from "@/components/pacto/form/projectForm";
import { useAuthContext } from "@/context/auth-context";

export default function NewProjectForm({}) {
  const [isClient, setIsClient] = useState(false);

  // get the user from store
  const { user } = useAuthContext()
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if(isClient)return (
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
