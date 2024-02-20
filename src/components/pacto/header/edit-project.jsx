'use client'
import { useAuthContext } from "@/context/auth-context";
import Link from "next/link";

const EditProject = ({project}) => {
    const { user } = useAuthContext()   
    if(user && (user.role === 'admin' || project.author._id === user._id)) return ( <Link href={`/pacto/${project.slug}/editar`} className="px-4 pb-2 has-background-primary has-text-white is-flex is-align-items-center is-hidden-touch">Editar pacto</Link>)
}

export default EditProject