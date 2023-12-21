import RegisterForm from "@/components/auth/register"
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

export default async function Register() {
    const user = await getData()
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