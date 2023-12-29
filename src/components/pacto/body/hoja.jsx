import { formatDate } from "@/utils/format"
import { fetchProjectEvents } from "@/utils/get-data"

export default async function HojaBody({ project }) {
    const events = await fetchProjectEvents(project._id)
    return <>
        <div className="hoja-de-ruta-wrapper">
            <div className="my-4">

                <h1 className=" is-size-3 has-text-primary mb-0">Hoja de Ruta de las asambleas</h1>
                <span className="has-text-weight-light is-italic is-size-4 has-text-primary"> * Roteiro das Assembleias</span>
            </div>
            <p className="mb-0 has-text-weight-bold">Ordenado de mas reciente al mas antiguo</p>
            <span className="has-text-weight-light is-italic is-size-7"> *Ordenado do mais recente ao mais antigo</span>

            <div className="events">
                {events.events.map(event => <div key={event._id} className="columns event is-flex">
                    <div className="py-5  column is-flex-grow-0">
                        <div className="date is-flex is-relative is-justify-content-space-between">
                            <p className="pt-1 is-hidden-touch">{formatDate(event.date, '-')}</p>
                            <div className="point"></div>
                        </div>
                    </div>
                    <div className=" column is-10">

                        <div className="py-2 px-1 has-background-cream-light mb-3 is-size-7-touch">
                            <p className="pt-1 is-hidden-desktop pb-3">{formatDate(event.date, '-')}</p>
                            <h1 className=" is-size-5 mb-0">{event.title_es}</h1>
                            <span className="has-text-weight-light is-italic is-size-6"> * {event.title_pt}</span>
                            <div className="my-5">

                                <p className="mb-2">{event.text_es}</p>
                                <p className="has-text-weight-light is-italic is-size-6"> * {event.text_pt}</p>
                            </div>

                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>

    </>
}