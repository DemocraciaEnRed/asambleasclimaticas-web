import RegisterForm from "@/components/auth/register"
import { fetchUserMe } from "@/utils/get-data"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers';


export default async function Register() {
    return (
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">

            <div className="register-form-wrapper my-6">

                <h1 className="is-size-4 is-uppercase has-text-centered mb-6">  Registro con correo electrónico </h1>
                <RegisterForm/>

            </div>
        </div>
    )
}