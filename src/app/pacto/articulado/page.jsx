import HeaderPropuesta from "@/components/pacto/header"
import axiosServices from "@/utils/axios"
import PactoBody from "@/components/pacto/body/pacto"


const getData = async ()=>{
        const [project, articles, comments] = await Promise.all([
            axiosServices.get(`/projects/${process.env.PROJECTID}`),
            axiosServices.get(`/projects/${process.env.PROJECTID}/articles`),
            axiosServices.get(`/projects/${process.env.PROJECTID}/comments`),

        ])
        return {
            project: project.data,
            articles: articles.data,
            comments: comments.data
        }
}

export default async function PropuestaPactoComponent() {
   const {project, articles, comments} = await getData()
  
    return <div className="pacto-wrapper">
        {/* <BreadcrumbNav section={pathname} id={project.id} title={project.currentVersion.content.title}/> */}
        { project &&
            <>
                <HeaderPropuesta project={project} section="pacto"  />
                <div className="project-body-container">
                    <PactoBody project={project} articles={articles} comments={comments} />
                </div>
            </>
        }
    </div>
}