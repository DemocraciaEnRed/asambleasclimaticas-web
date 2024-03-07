'use client'
import { useState } from "react"

import axiosServices from "@/utils/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAlert } from "@/context/alert-context"
import { RESTORE_PASSWORD_TITLE } from "@/utils/constants";



export default function RestorePasswordForm() {

    const { addAlert } = useAlert()

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('prevSend')
    const [errors, setErrors] = useState(null)

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
                <FontAwesomeIcon icon={RESTORE_PASSWORD_TITLE[success].icon} size="3x" />
                <h1 className="mb-0 my-3 is-uppercase is-size-2 is-size-3-touch has-text-weight-light">{RESTORE_PASSWORD_TITLE[success].title}</h1>
                <span className="has-text-weight-light is-italic is-size-4"> {RESTORE_PASSWORD_TITLE[success].title_pt}</span>
            </div>
            <div className="box-content">
                <div>
                    <p className="mb-0 ">{RESTORE_PASSWORD_TITLE[success].description}</p>
                    <span className="has-text-weight-light is-italic is-size-7"> {RESTORE_PASSWORD_TITLE[success].description_pt}</span>
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