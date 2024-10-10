import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link";
import LoggedInRedirect from "@/components/LoggedInRedirect";
import LoginForm from "@/components/LoginForm";


export default function LoginPage({searchParams}) {

    const loginError = searchParams?.error
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
                        <h1 className={styles.title}>Accédez à votre compte</h1>

                        <LoginForm
                            formStyle={styles.form}
                            inputContainerStyle={styles.inputContainer}
                            forgotPasswordStyle={styles.forgotPassword}
                            buttonStyle={styles.button}
                        />

                            {loginError && (type === "credentials") &&
                                <p className={styles.error}>Adresse e-mail et/ou mot de passe incorrect. Veuillez
                                    réessayer.</p>}
                            {loginError && (type === undefined) &&
                                <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}

                            <hr className={styles.hr}/>
                            <div className={styles.signupContainer}>
                                <p>Pas encore de compte ?</p>
                                <Link href="/signup">Créer un compte</Link>
                            </div>

                    </div>
                </section>
            </main>
        </>
    )
}