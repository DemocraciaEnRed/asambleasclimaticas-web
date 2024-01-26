import HojaBody from "@/components/pacto/body/hoja"
import HeaderPropuesta from "@/components/pacto/header"
import BreadcrumbNav from "@/components/pacto/header/breadcrumb"
import { fetchProject } from "@/utils/get-data"

export default async function Propuesta({params:{id},searchParams:{version}}) {
    const project = await fetchProject(id,version)
    return <div className="pacto-wrapper ">
        {project &&
            <>
                <BreadcrumbNav project={project} section="hoja de ruta" version={version}/>

                <HeaderPropuesta project={project} section="hoja"  />
                <div className="project-body-container">
                    <HojaBody project={project} />
                </div>
            </>
        }
    </div>
}