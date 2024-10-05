import { signup } from './actions'
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage({searchParams}) {

    const signupError = searchParams?.error
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
                <hr/>
                <div>
                    <h1 className={styles.title}>Créez un nouveau compte</h1>
                    <form className={styles.form}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">E-mail :</label>
                            <input id="email" name="email" type="email" placeholder="Ex : dupont@exemple.com" required/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">Mot de passe :</label>
                            <input id="password" name="password" type="password" title="Le mot de passe doit contenir au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial." pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$" placeholder="Ex : ********" required/>
                        </div>
                        <button className={styles.button} formAction={signup}>S'inscrire</button>

                        {signupError && (type === "existing-user") && <p className={styles.error}>Un compte est déjà associé à cette adresse e-mail.</p>}
                        {signupError && (type === undefined) && <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}

                        <hr className={styles.hr} />
                        <div className={styles.loginContainer}>
                            <p>Disposez-vous déjà d'un compte ?</p>
                            <Link href="/login">Se connecter</Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}