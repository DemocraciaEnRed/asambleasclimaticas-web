import { stageCountryList } from "@/utils/data"
import StageProgress from "./stage-progress"

const StageProject = ({stage}) => {

    const currentStage = stageCountryList.find(stageCountry => stageCountry.code === stage)

  return(<div className="stage-project px-3 has-background-grey-lighter is-flex is-align-items-center is-size-7">
        <span className="mr-2"> Etapa: Asamblea {currentStage.name} </span> <StageProgress progress={currentStage.progress}/>
  </div>
)}


export default StageProject