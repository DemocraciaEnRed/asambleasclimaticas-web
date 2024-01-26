'use client'

import { setMessage } from "@/store/reducers/alert"
import { useEffect } from "react"

const DisabledDisclaimer = () =>{

    const controlNavbar = () => {
        if (window.scrollY > 300) setMessage({message:'**Estás viendo una versión antigua**  \n**Você está visualizando uma versão antiga*' , type:'danger', time:null})
        else setMessage({message:'', type:''})
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, []);
    return( <article className="message is-danger">
    <div className="message-body">
        <p className="mb-2">IMPORTANTE: Estas viendo una versión anterior (estas en la  &quot;Versión q se esta consultando&quot; ). Por esto veras que no puedes comentar ni reaccionar al contenido. Es una visualización únicamente de lectura para comprender el estado previo de las máximas y de la participación ciudadana. VOLVER A VERSION ACTUAL </p>
        <p className="is-italic">IMPORTANTE: Você está visualizando uma versão anterior (você está na &quot;Versão sendo consultada&quot;). Por esse motivo, não será possível comentar ou reagir ao conteúdo. Trata-se apenas de uma visualização para leitura, a fim de compreender o estado anterior das normas e da participação cidadã. RETORNAR À VERSÃO ATUAL. </p>
    </div>
</article>)
}

export default DisabledDisclaimer