import RestorePasswordForm from "@/components/auth/restore";


export default function RestorePassword() {

    return (<div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
        <div className="verify-form-wrapper my-3">
            <div className="box">
                <RestorePasswordForm />
            </div>
        </div>
    </div>)
}