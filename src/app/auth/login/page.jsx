import LoginForm from "@/components/auth/login"
import { fetchUserMe } from "@/utils/get-data"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers';


export default async function Login(props) {
    const token = cookies().get('auth')
    const user = token ?  await fetchUserMe() : null
    if (user) {
        redirect('/')
    }
    return (
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
            <div className="login-form-wrapper">
                <LoginForm />
            </div>
        </div>
    )
}

