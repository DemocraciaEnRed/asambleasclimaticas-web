'use client'
import { useAuthContext } from "@/context/auth-context";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function NewProjectEvent({project}) {
  const { user } = useAuthContext()   
  if(user && (user.role === 'admin' || project.author._id === user._id)) return ( 
  <Link href={`/pacto/${project.slug}/hoja-de-ruta/nuevo`} className="button is-rounded is-outlined is-black">
      <FontAwesomeIcon icon={faPlus} />&nbsp;Nuevo evento</Link>)
}

