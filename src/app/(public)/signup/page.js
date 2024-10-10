import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import LoggedInRedirect from "@/components/LoggedInRedirect";
import SignupForm from "@/components/SignupForm";

export default function SignupPage({searchParams}) {

    const signupError = searchParams?.error
    const type = searchParams?.type

    return (
        <>
            <LoggedInRedirect/>
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

                        <SignupForm
                            formStyle={styles.form}
                            inputContainerStyle={styles.inputContainer}
                            buttonStyle={styles.button}
                        />

                        {signupError && (type === "existing-user") &&
                            <p className={styles.error}>Un compte est déjà associé à cette adresse e-mail.</p>}
                        {signupError && (type === "weak-password") &&
                            <p className={styles.error}>Assurez-vous que le mot de passe contienne au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial.</p>}
                        {signupError && (type === undefined) &&
                            <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}

                        <hr className={styles.hr}/>
                        <div className={styles.loginContainer}>
                            <p>Disposez-vous déjà d'un compte ?</p>
                            <Link href="/login">Se connecter</Link>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}