import RegisterForm from "@/components/auth/register"
import { fetchUserMe } from "@/utils/get-data"
import { redirect } from "next/navigation"


export default async function Register() {
    const user = await fetchUserMe()
    if (user) {
        redirect('/')
    }
    return (
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">

            <div className="register-form-wrapper w-50 my-6">

                <h1 className="is-size-4 is-uppercase has-text-centered mb-6">  Registro con correo electrónico </h1>
                <RegisterForm/>

            </div>
        </div>
    )
}