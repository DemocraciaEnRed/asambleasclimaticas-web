"use client"
import Login from "@/components/authentication/login"
import Register from "@/components/authentication/register"
import { useState } from "react"

export default function Pacto() {
    const [login, setLogin] = useState(true)



    return(
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
            {login ? 
            <Login login={login} changeLogin={()=>setLogin(!login)}/>
            :
            <Register login={login} changeLogin={()=>setLogin(!login)}/>
            }
        </div>
    )
}

