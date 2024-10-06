import styles from "./page.module.css"
import Link from "next/link";

export default function SignupWelcomePage() {

    return (
        <main className={styles.main}>
            <style>{'body {background-color: #510bdc}'}</style>
            <h1>Inscription confirmée !</h1>
            <p>Merci pour votre inscription ! Vous êtes connecté et pourrez désormais vous connecter avec vos identifiants.</p>
            <Link className={styles.button} href="/login">Se connecter</Link>
            <Link className={styles.homeLink} href="/">Retour à l'accueil</Link>
        </main>
    )

}