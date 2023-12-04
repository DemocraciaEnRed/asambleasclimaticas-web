import HojaBody from "./hoja"
import PactoBody from "./pacto"
import ResumenBody from "./resumen"


export default function BodyPacto({project, section}) {
    
    const content = {
        'resumen': <ResumenBody project={project} />,
        'pacto': <PactoBody project={project} />,
        'hoja': <HojaBody project={project} />
      } 
    
    return <div className="project-body-container">
        {content[section]}
        
    </div>
}