import StageProgress from "./stage-progress"
import { STAGE_COUNTRY_LIST } from "@/utils/constants"


export default function StageProject({ stage }) {

    const currentStage = STAGE_COUNTRY_LIST.find(stageCountry => stageCountry.code === stage)

    return (<div className="stage-project px-3  is-flex is-align-items-center is-size-6">
        <span className="mr-2"> Etapa: Asamblea {currentStage.name} </span> <StageProgress progress={currentStage.progress} />
    </div>
    )
}