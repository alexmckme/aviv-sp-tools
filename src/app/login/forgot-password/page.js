import {recoverPassword} from './actions'

export default function ForgotPasswordPage() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <button formAction={recoverPassword}>Recover password</button>
        </form>
    )
}