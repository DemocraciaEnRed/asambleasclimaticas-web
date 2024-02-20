'use client'
import { useAlert } from "@/context/alert-context"
import axiosServices from "@/utils/axios"
import { useEffect, useState } from "react"
import { faLock, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const texts = {
    prevSend: {
        icon: faLock,
        title: 'Recupera tu contraseña',
        title_pt: '* Recupere sua senha.',
        description: 'No te preocupes, recuperarla es fácil. Introduce tu correo electrónico y sigue las instrucciones en el correo que recibirás para restablecer tu contraseña.',
        description_pt: '* Não se preocupe, recuperá-la é fácil. Insira seu endereço de e-mail e siga as instruções no e-mail que você receberá para redefinir sua senha.'
    },
    send: {
        icon: faPaperPlane,
        title: 'Mail de restauración enviado',
        title_pt: 'E-mail de recuperação enviado.',
        description: 'En unos minutos recibirás un correo con el paso a paso para poder definir tu nueva contraseña (No te olvides de revisar en spam).',
        description_pt: ' Em alguns minutos, você receberá um e-mail com o passo a passo para definir sua nova senha. Não se esqueça de verificar na pasta de spam.'
    }
}

export default function RestorePasswordForm() {

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('prevSend')
    const [errors, setErrors] = useState(null)


    const { addAlert } = useAlert()

    const sendEmail = async (event) => {
        event.preventDefault()
        try {
            const response = await axiosServices.post('/auth/forgot', { email })
            if (response.status === 200) setSuccess('send')
        } catch (err) {
            const errData = await err.response.data
            console.log(errData);
            addAlert(errData.message, 'danger')
            setErrors(err.response.data.errors)
        }
    }

    return (
        <div className="content has-text-centered">

            <div className="title mb-6">
                <FontAwesomeIcon icon={texts[success].icon} size="3x" />
                <h1 className="mb-0 my-3 is-uppercase is-size-2 is-size-3-touch has-text-weight-light">{texts[success].title}</h1>
                <span className="has-text-weight-light is-italic is-size-4"> {texts[success].title_pt}</span>

            </div>

            <div className="box-content">
                <div>
                    <p className="mb-0 ">{texts[success].description}</p>
                    <span className="has-text-weight-light is-italic is-size-7"> {texts[success].description_pt}</span>
                </div>
                {success == 'prevSend' &&
                    <form action="POST" className="mt-3" onSubmit={sendEmail}>
                        <div className="field">
                            <label className="label has-text-weight-normal">Correo electrónico  <span className="ml-2 has-text-weight-light is-italic is-size-7"> * E-mail</span></label>
                            <div className="control">
                                <input className={`input ${errors && errors.some(error => error.field === 'email') ? 'is-danger' : ''}`} name="email" autoCapitalize="none" type="text" onChange={(event) => setEmail(event.target.value)} />
                                {errors && errors.some(error => error.field === 'email') && <p className="help is-danger">
                                    {errors.find(error => error.field === 'email').message}
                                </p>}
                            </div>
                        </div>
                        <button className="button is-brown is-rounded has-text-white w-75 is-uppercase mt-4">enviar correo</button>
                    </form>
                }
            </div>
        </div>
    )
}