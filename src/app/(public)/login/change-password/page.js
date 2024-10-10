import styles from "./page.module.css"
import Link from "next/link";
import Image from "next/image";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function ChangePasswordPage({searchParams}) {

    const changeError = searchParams?.error
    const type = searchParams?.type

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

                    {changeError && (type === "same-password") && <p className={styles.error}>Le nouveau mot de passe doit être différent du mot de passe actuel, veuillez réessayer.</p>}
                    {changeError && (type === "weak-password") && <p className={styles.error}>Assurez-vous que le mot de passe contienne au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial.</p>}
                    {changeError && (type === undefined) && <p className={styles.error}>Une erreur s'est produite, veuillez réessayer.</p>}
                </div>
            </section>
        </main>
    )
}