import HojaBody from "@/components/pacto/body/hoja"
import HeaderPropuesta from "@/components/pacto/header"
import { fetchProject } from "@/utils/get-data"

export default async function Propuesta() {
    const project = await fetchProject()
    return <div className="pacto-wrapper ">
        {project &&
            <>
                <HeaderPropuesta project={project} section="hoja"  />
                <div className="project-body-container">
                    <HojaBody project={project} />
                </div>
            </>
        }
    </div>
}