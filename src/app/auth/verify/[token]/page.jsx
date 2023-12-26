import { verifyToken } from "@/utils/get-data";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function VerifyToken({ params: { token } }) {

    const res = await verifyToken(token)
    if(res.status===200) return (<div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
        <div className="verify-form-wrapper">
            <div className="box">
                <div className="content has-text-centered">
                    <div className="title">
                        <FontAwesomeIcon icon={faEnvelopeCircleCheck} size="3x" />
                        <h1 className="mb-0 my-3 is-uppercase is-size-2 is-size-3-touch has-text-weight-light">REGISTRO CONFIRMADO</h1>
                        <span className="has-text-weight-light is-italic is-size-4"> * Verifique seu e-mail</span>

                    </div>

                    <div className="box-content my-6">
                        <div className="mb-5">
                            <p className="mb-0">Nos alegra mucho que te sumes como participante de (re)surgentes.</p>
                            <span className="has-text-weight-light is-italic is-size-7"> *Ficamos muito felizes que você tenha se juntado como participante do (re)surgentes.</span>
                        </div>
                        <div>
                            <p className="mb-0 has-text-weight-bold">Ya podes participar comentando el pacto. Esperamos tus aportes con ansias!</p>
                            <span className="has-text-weight-light is-italic is-size-7"> *Agora você pode participar comentando o pacto. Estamos ansiosos pelos seus contributos!</span>
                        </div>

                    </div>
                        <Link href="/" className="button is-rounded is-brown is-uppercase w-50"> home </Link>
                </div>
            </div>
        </div>
    </div>)
    else return (<div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
    <div className="verify-form-wrapper">
        <div className="box">
            <div className="content has-text-centered">
                <div className="title">
                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} size="3x" />
                    <h1 className="mb-0 my-3 is-uppercase is-size-2 is-size-3-touch has-text-weight-light has-text-danger"> NO SE PUDO VERIFICAR TU REGISTRO</h1>
                    <span className="has-text-weight-light is-italic is-size-4 has-text-danger"> * NÃO FOI POSSÍVEL VERIFICAR SEU REGISTRO</span>

                </div>

                <div className="box-content my-6">
                    <div className="mb-5">
                        <p className="mb-0">comuníquese con nosotros para resolver cualquier duda</p>
                        <span className="has-text-weight-light is-italic is-size-7"> *entre em contato conosco para esclarecer qualquer dúvida</span>
                    </div>
                    {/* <div>
                        <p className="mb-0 has-text-weight-bold">Ya podes participar comentando el pacto. Esperamos tus aportes con ansias!</p>
                        <span className="has-text-weight-light is-italic is-size-7"> *Agora você pode participar comentando o pacto. Estamos ansiosos pelos seus contributos!</span>
                    </div> */}

                </div>
                    <Link href="/" className="button is-rounded is-brown is-uppercase w-50"> home </Link>
            </div>
        </div>
    </div>
</div>)
}