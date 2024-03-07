import LoginForm from "@/components/auth/login"


export default async function Login(props) {

    return (
        <div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
            <div className="login-form-wrapper">
                <LoginForm />
            </div>
        </div>
    )
}

