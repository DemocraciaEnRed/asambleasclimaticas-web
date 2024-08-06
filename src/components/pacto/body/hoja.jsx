import { formatDate } from "@/utils/format"
import { fetchEventsProjectId } from "@/utils/get-data"
import DeleteEventButton from "@/components/pacto/body/deleteEvent"
import NewProjectEvent from "@/components/pacto/body/newEvent"

export default async function HojaBody({ project }) {
    const events = await fetchEventsProjectId(project._id)
    return <>
        <div className="hoja-de-ruta-wrapper">
            <div className="my-4">
                <h1 className=" is-size-3 has-text-primary mb-0">Hoja de Ruta de las asambleas</h1>
                <span className="has-text-weight-light is-italic is-size-4 has-text-primary"> * Roteiro das Assembleias</span>
            </div>
            <div className="buttons">
                <NewProjectEvent project={project} />
            </div>
            <p className="mb-0 has-text-weight-bold">Ordenado de más reciente a más antiguo</p>
            <span className="has-text-weight-light is-italic is-size-7"> *Ordenado do mais recente ao mais antigo</span>

            <div className="events mt-4">
                {events.events.map(event => <div key={event._id} className="columns event is-flex">
                    <div className="py-5  column is-flex-grow-0">
                        <div className="date is-flex is-relative is-justify-content-space-between">
                            <p className="pt-1 is-hidden-touch">{formatDate(event.date, '-')}</p>
                            <div className="point"></div>
                        </div>
                    </div>
                    <div className="column is-10">
                        <div className="has-background-cream-light mb-3 is-size-7-touch" style={{position: 'relative'}}>
                            <DeleteEventButton project={project} event={event} />
                            <div className="py-4 px-5">
                                <p className="pt-1 is-hidden-desktop pb-3">{formatDate(event.date, '-')}</p>
                                <h1 className=" is-size-5 mb-0">{event.title_es}</h1>
                                <span className="has-text-weight-light is-italic is-size-6"> * {event.title_pt}</span>
                                <div className="my-5">
                                    <p className="mb-2" style={{whiteSpace: 'break-spaces'}}>{event.text_es}</p>
                                    <p className="has-text-weight-light is-italic is-size-6" style={{whiteSpace: 'break-spaces'}}> * {event.text_pt}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>

    </>
}