'use client'
import { useAlert } from "@/context/alert-context"
import axiosServices from "@/utils/axios"
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"

const texts = {
    prevSend: {
        title: 'Ingresa Tu nueva Contraseña',
        title_pt: 'Digite sua nova senha.',
    },
    send: {
        icon: faClipboardCheck,
        title: 'Contraseña actualizada con exito!',
        title_pt: 'Senha atualizada com sucesso!',
    }
}

export default function SetNewPasswordForm({ token }) {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [success, setSuccess] = useState('prevSend')
    const [errors, setErrors] = useState(null)


    const { addAlert } = useAlert()

    function handlePassword(event) {
        if (event.target.value !== password) {
            setErrors([{ field: 'password', message: '*las contraseñas deben ser iguales' }])
        } else {
            setErrors(null)
        };
        if (event.target.name === 'password') setPassword(event.target.value)
        else setConfirmPassword(event.target.value)
    }

    const submitNewPassword = async (event) => {
        event.preventDefault()
        try {
            const response = await axiosServices.post('/auth/reset/' + token, { password, confirmPassword })
            if (response.status === 200) setSuccess('send')
        } catch (err) {
            const errData = await err.response.data
            console.log(errData);
            addAlert(errData.message, 'danger')
        }
    }


    return (
        <div className="content has-text-centered">
            <div className="title mb-6">
                {texts[success].icon && <FontAwesomeIcon icon={texts[success].icon} size="3x" />}
                <h1 className="mb-0 my-3 is-uppercase is-size-2 is-size-3-touch has-text-weight-light">{texts[success].title}</h1>
                <span className="has-text-weight-light is-italic is-size-4"> {texts[success].title_pt}</span>

            </div>

            {success == 'prevSend' && <div className="box-content">
                <form action="POST" className="mt-3" onSubmit={submitNewPassword}>
                    <div className="field">
                        <label className="label has-text-weight-normal">Ingrese su nueva contraseña <span className="ml-2 has-text-weight-light is-italic is-size-7"> *Digite sua nova senha.</span></label>
                        <div className="control">
                            <input className={`input ${errors && errors.some(error => error.field === 'password') ? 'is-danger' : ''}`} name="password" type="password" onChange={handlePassword} />
                            {errors && errors.some(error => error.field === 'password') && <p className="help is-danger">
                                {errors.find(error => error.field === 'password').message}
                            </p>}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-normal ">
                            Reingrese su nueva contraseña <span className="ml-2 has-text-weight-light is-italic is-size-7"> *Digite novamente sua nova senha. </span>
                        </label>
                        <div className="control">
                            <input className={`input ${errors && errors.some(error => error.field === 'password') ? 'is-danger' : ''}`} name="re-password" type="password" onChange={handlePassword} />
                            {errors && errors.some(error => error.field === 'password') && <p className="help is-danger">
                                {errors.find(error => error.field === 'password').message}
                            </p>}
                        </div>
                    </div>
                    <button className="button is-brown is-rounded has-text-white w-75 is-uppercase mt-4">Confirmar</button>
                </form>
            </div>}
            {success == 'send' && <Link href="/auth/login" className="button is-brown is-rounded has-text-white w-75 is-uppercase mt-4">ingresar</Link>}
        </div>
    )
}