import styles from "./page.module.css"
import Link from "next/link";
import Image from "next/image";
import ChangePasswordForm from "@/components/ChangePasswordForm";

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

                    <ChangePasswordForm
                        formStyle={styles.form}
                        inputContainerStyle={styles.inputContainer}
                        buttonStyle={styles.button}
                    />

                        {changeError && <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}
                </div>
            </section>
        </main>
    )
}