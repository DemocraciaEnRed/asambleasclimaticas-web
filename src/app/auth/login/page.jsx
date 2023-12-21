import LoginForm from "@/components/auth/login"
import axiosServerServices from "@/utils/axiosServer"
import { redirect } from "next/navigation"

async function getData(){
    try{
        const res = await axiosServerServices.get('/users/me')
        const user = await res.data
        if(user) return user
    }catch(err){
        console.log(err);
    }
}

export default async function Login(props) {
    const user = await getData()
    if (user) {
        redirect('/')
    }
    return (
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
            <div className="login-form-wrapper w-100">
                <LoginForm />
            </div>
        </div>
    )
}

