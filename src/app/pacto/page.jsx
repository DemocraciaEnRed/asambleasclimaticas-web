import { cookies } from 'next/headers'
import ResumenBody from "@/components/pacto/body/resumen";
import HeaderPropuesta from "@/components/pacto/header";
import axiosServerServices from '@/utils/axiosServer';

async function getData() {
    const res = await axiosServerServices(`/projects/${process.env.PROJECTID}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (res.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
    return res.data
}

export default async function Propuesta() {
    const project = await getData()
    return <div className="pacto-wrapper ">
       
                <HeaderPropuesta project={project} section="resumen"  />
                <div className="project-body-container">
                    <ResumenBody project={project} />
                </div>
    </div>
}