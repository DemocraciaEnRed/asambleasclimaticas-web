import Skeleton from "@/components/common/skeleton";
import ResumenBody from "@/components/pacto/body/resumen";
import HeaderPropuesta from "@/components/pacto/header";
import BreadcrumbNav from "@/components/pacto/header/breadcrumb";
import { fetchProjectId, fetchProjectVersion } from '@/utils/get-data';
import { Suspense } from "react";


export default async function Propuesta({params:{id}, searchParams:{version}}) {
    const project = await fetchProjectId(id,version)
    if (project) return (<div className="pacto-wrapper ">
        <Suspense fallback={<Skeleton height={700} column/>}>
            <BreadcrumbNav project={project} section="resumen" version={version}/>
            <HeaderPropuesta project={project} section="resumen" />
            <div className="project-body-container">
                <ResumenBody project={project} />
            </div>

        </Suspense>
    </div>)
    else return (<div className="content pacto-wrapper has-text-centered">
        <h1 className='my-6'>Todavia no hay pacto</h1>
    </div>)
}