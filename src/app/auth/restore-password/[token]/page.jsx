import SetNewPasswordForm from "@/components/auth/new-password";


export default function setNewPassword({ params: { token } }) {

    return (<div className="auth-wrapper is-flex is-justify-content-center is-align-items-center">
        <div className="verify-form-wrapper my-3 w-75">
            <div className="box">
                <SetNewPasswordForm token={token} />
            </div>
        </div>
    </div>)
}