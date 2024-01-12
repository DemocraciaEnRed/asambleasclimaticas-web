'use client'
import Link from "next/link";
import { useSelector } from "react-redux";

const EditProject = ({project}) => {
    const { user } = useSelector(state => state.auth)    
    if(user && (user.role === 'admin' || project.author._id === user._id)) return ( <Link href={`/pacto/${project.slug}/editar`} className="px-4 pb-2 has-background-primary has-text-white is-flex is-align-items-center is-hidden-touch">Editar pacto</Link>)
}

export default EditProject