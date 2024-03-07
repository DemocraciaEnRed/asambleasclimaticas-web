import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Verify({ searchParams: { email } }) {

    return (<div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
        <div className="verify-form-wrapper my-3">
            <div className="box">
                <div className="content has-text-centered">
                    <div className="title mb-6">
                        <FontAwesomeIcon icon={faEnvelope} size="3x" />
                        <h1 className="mb-0 my-3 is-uppercase is-size-2 is-size-3-touch has-text-weight-light">Verifica tu e-mail</h1>
                        <span className="has-text-weight-light is-italic is-size-4"> * Verifique seu e-mail</span>
                    </div>
                    <div className="box-content">
                        <div className="mb-5">
                            <p className="mb-0 has-text-weight-bold">Gracias por participar en (re)surgentes.</p>
                            <span className="has-text-weight-light is-italic is-size-7"> * Obrigado por participar do (re)surgentes.</span>
                        </div>
                        <div>
                            <p className="mb-0 ">Enviamos un e-mail a la casilla &quot;{email}&quot;, deberías recibirlo en los próximos minutos. No te olvides de revisar la carpeta de Spam si no lo recibes en unos minutos.</p>
                            <span className="has-text-weight-light is-italic is-size-7"> * Enviamos um e-mail para a caixa &quot;{email}&quot;; você deverá recebê-lo nos próximos minutos. Não se esqueça de verificar a pasta de Spam se não o receber em alguns minutos.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}