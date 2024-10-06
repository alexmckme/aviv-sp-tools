import styles from "./page.module.css"
import Link from "next/link";

export default function ConfirmationPage() {
    return (
        <main className={styles.main}>
            <style>{'body {background-color: #510bdc}'}</style>
            <h1>Mot de passe modifié !</h1>
            <p>Vous êtes connecté et pourrez désormais vous connecter avec votre adresse mail habituelle et votre nouveau mot de passe.</p>
            <Link className={styles.button} href="/login">Se connecter</Link>
            <Link className={styles.homeLink} href="/">Retour à l'accueil</Link>
        </main>
    )
}