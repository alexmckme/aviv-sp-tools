import {changePassword} from './actions'

export default function ForgotPasswordPage() {
    return (
        <form>
            <p>Saisissez votre nouveau mot de passe</p>
            <label htmlFor="password">New Password</label>
            <input id="password" name="password" type="password" required/>
            <button formAction={changePassword}>Change password</button>
        </form>
    )
}