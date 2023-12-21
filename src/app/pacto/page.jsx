import { cookies } from 'next/headers'
import ResumenBody from "@/components/pacto/body/resumen";
import HeaderPropuesta from "@/components/pacto/header";
import axiosServerServices from '@/utils/axiosServer';

async function getData() {
    try{
        const resp = await axiosServices.get(`/projects/${process.env.PROJECTID}`)
        const project = await resp.data
        return project

    }catch(err){
        console.log(err);
    }

}

export default async function Propuesta() {
    const project = await getData()
    if(project) return (<div className="pacto-wrapper ">
       
                <HeaderPropuesta project={project} section="resumen"  />
                <div className="project-body-container">
                    <ResumenBody project={project} />
                </div>
    </div>)
    else return(<div className="content pacto-wrapper has-text-centered">
        <h1 className='my-6'>Todavia no hay pacto</h1>       
</div>)
}