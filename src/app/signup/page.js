import { signup } from './actions'

export default function SignupPage() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={signup}>Sign up</button>
            <p><a href="/login/forgot-password">Mot de passe oublié ?</a></p>
        </form>
    )
}