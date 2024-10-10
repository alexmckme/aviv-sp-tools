import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import ForgotPaswordForm from "@/components/ForgotPaswordForm";

export default function ForgotPasswordPage({searchParams}) {

    const resetError = searchParams?.error

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
                    <h1 className={styles.title}>Réinitialisez votre mot de passe</h1>

                    <ForgotPaswordForm
                        formStyle={styles.form}
                        inputContainerStyle={styles.inputContainer}
                        buttonStyle={styles.button}
                    />

                        {resetError && <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}

                        <hr className={styles.hr}/>
                        <div className={styles.footer}>
                            <p>Souhaitez-vous revenir en arrière ?</p>
                            <Link href="/login">Se connecter</Link>
                            <Link href="/signup">Créer un compte</Link>
                        </div>
                </div>
            </section>
        </main>
    )
}