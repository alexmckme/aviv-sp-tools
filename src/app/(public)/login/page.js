import { login } from './actions'
import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link";

export default function LoginPage({searchParams}) {

    const loginError = searchParams?.error
    const type = searchParams?.type

    return (
        <main className={styles.main}>
            <style>{'body {background-color: #510bdc}'}</style>
            <section className={styles.section}>
                <div className={styles.logoContainer}>
                    <Link href="/"><Image src="/logo-brand-main.svg" width={200}
                                                                            height={50}
                                                                            alt="Aviv BP Helper official logo"/></Link>
                </div>
                <hr />
                <div>
                    <h1 className={styles.title}>Accédez à votre compte</h1>
                    <form className={styles.form}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">E-mail :</label>
                            <input id="email" name="email" type="email" placeholder="Ex : dupont@exemple.com" required/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">Mot de passe :</label>
                            <input id="password" name="password" type="password" placeholder="Ex : ********" required/>
                        </div>
                        <Link className={styles.forgotPassword} href="/login/forgot-password">Mot de passe oublié ?</Link>
                        <button className={styles.button} formAction={login}>Se connecter</button>

                        {loginError && (type === "credentials") && <p className={styles.error}>Adresse e-mail et/ou mot de passe incorrect. Veuillez réessayer.</p>}
                        {loginError && (type === undefined) && <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}

                        <hr className={styles.hr}/>
                        <div className={styles.signupContainer}>
                            <p>Pas encore de compte ?</p>
                            <Link href="/signup">Créer un compte</Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}