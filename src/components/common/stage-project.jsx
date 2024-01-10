import { stageCountryList } from "@/utils/data"
import StageProgress from "./stage-progress"

const StageProject = ({stage}) => {

    const currentStage = stageCountryList.find(stageCountry => stageCountry.code === stage)

  return(<div className="stage-project has-background-grey-lighter p-3 is-flex is-align-items-center">
        <span className="mr-2"> Etapa: Asamblea {currentStage.name} </span> <StageProgress progress={currentStage.progress}/>
  </div>
)}


export default StageProject
