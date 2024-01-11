'use client'
const { default: Link } = require("next/link")
const { useSelector } = require("react-redux")

const EditPacto = ({projectSlug}) => {
    const { user } = useSelector(state => state.auth)    

    if(user && user.role === 'admin') return ( <Link href={`/pacto/${projectSlug}/editar`} className="px-4 pb-2 has-background-primary has-text-white is-flex is-align-items-center is-hidden-touch">Editar pacto</Link>)
}

export default EditPacto