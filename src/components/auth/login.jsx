'use client'
import { dispatch } from "@/store"
import { handleToken, setUser } from "@/store/reducers/auth"
import axiosServices from "@/utils/axios"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setCookie } from "cookies-next"

export default function LoginForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user } = useSelector((state) => state.auth)

    async function handleLogin(event) {
        event.preventDefault()
        const body = {
            email,
            password,
        }
        try {
            const response = await axiosServices.post('/auth/login', JSON.stringify(body))
            const res = await response.data
            setCookie('auth', res.token, {});
            dispatch(setUser(res.user))
            if (response.status === 200) window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
            <div className="login-form-wrapper w-50">
                <form action="SUBMIT" onSubmit={handleLogin}>
                    <h1 className="is-size-4 is-uppercase has-text-centered mb-6">Ingresar </h1>
                    <div className="login-form mt-6">
                        <div className="field">
                            <label className="label has-text-weight-normal">Correo electrónico  <span className="ml-2 has-text-weight-light is-italic is-size-7"> * E-mail</span></label>
                            <div className="control">
                                <input className="input" type="text" onChange={(event) => setEmail(event.target.value)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-weight-normal">Contraseña</label>
                            <div className="control">
                                <input className="input" type="password" onChange={(event) => setPassword(event.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="actions mt-6 is-flex is-flex-direction-column is-align-items-center">
                        <button className="button is-rounded confirm-button mb-3 is-uppercase w-50" type="submit">Ingresar</button>
                        <hr className="w-25" />
                        <div className="go-to-register-wrapper has-text-centered w-100">
                            <h3 className=" has-text-weight-normal is-size-5">¿Todavía no te hiciste una cuenta?</h3>
                            <h4 className=" has-text-weight-normal is-italic is-size-7">*Ainda não tem uma conta?</h4>
                            <Link className="button is-rounded register-button mt-3 w-50" href='/auth/register'>REGISTRATE</Link>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

