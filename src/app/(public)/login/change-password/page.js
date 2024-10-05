import {changePassword} from './actions'
import styles from "./page.module.css"
import Link from "next/link";
import Image from "next/image";

export default function ChangePasswordPage({searchParams}) {

    const changeError = searchParams?.error

    return (
        <main className={styles.main}>
            <style>{'body {background-color: #510bdc}'}</style>
            <section>
                <div className={styles.logoContainer}>
                    <Link href="/"><Image src="/logo-brand-main.svg" width={200}
                                          height={50}
                                          alt="Aviv BP Helper official logo"/></Link>
                </div>
                <hr/>
                <div>
                    <h1 className={styles.title}>Saisissez votre nouveau mot de passe</h1>
                    <form className={styles.form}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" name="password" type="password"
                                   title="Le mot de passe doit contenir au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial."
                                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$"
                                   placeholder="Ex : ********"
                                   required/>
                        </div>
                        <button className={styles.button} formAction={changePassword}>Confirmer le mot de passe</button>
                        {changeError && <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}
                    </form>
                </div>
            </section>
        </main>
    )
}