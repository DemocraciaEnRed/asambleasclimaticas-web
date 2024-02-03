import LoginForm from "@/components/auth/login"
import { fetchUserMe } from "@/utils/get-data"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers';


export default async function Login(props) {
    return (
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
            <div className="login-form-wrapper">
                <LoginForm />
            </div>
        </div>
    )
}

