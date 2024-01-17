import LoginForm from "@/components/auth/login"
import { fetchUserMe } from "@/utils/get-data"
import { redirect } from "next/navigation"

export default async function Login(props) {
    const user = await fetchUserMe()
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

