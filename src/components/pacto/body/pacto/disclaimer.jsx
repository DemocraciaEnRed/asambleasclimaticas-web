'use client'

import { useAlert } from "@/context/alert-context"
import { useEffect } from "react"

const DisabledDisclaimer = () => {
    const { addAlert,removeAlert } = useAlert()
    
    const controlNavbar = () => {
        if (window.scrollY > 300) addAlert('**Estás visualizando una versión antigua**  \n**Você está visualizando uma versão antiga*', 'danger', true, null)
        else removeAlert()
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, []);

    return (<article className="message is-danger">
        <div className="message-body">
            <p className="mb-2">IMPORTANTE: Estás visualizando una versión antigua. Por esta razón no pueden dejarse comentarios, aportes o reacciones. La visualización de versiones anteriores es únicamente de lectura para comprender el estado previo del pacto y el resultado de la participación en el mismo. </p>
            <p className="is-italic">IMPORTANTE: Você está visualizando uma versão antiga. Por esse motivo, não é possível deixar comentários, contribuições ou reações. A visualização de versões anteriores é apenas para leitura, a fim de compreender o estado anterior do pacto e o resultado da participação no mesmo. </p>
        </div>
    </article>)
}

export default DisabledDisclaimer