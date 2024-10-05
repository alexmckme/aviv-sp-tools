import styles from "./page.module.css";
import Link from "next/link";

export default function SignupConfirmPage() {

    return (
        <main className={styles.main}>
            <style>{'body {background-color: #510bdc}'}</style>
            <h1>Merci pour votre inscription !</h1>
            <p>Dernière étape avant de pouvoir vous connecter : un lien de confirmation vous a été envoyé par mail.
                Veuillez vérifier votre boîte de réception ainsi que dans les spams !</p>
            <Link className={styles.homeLink} href="/">Retour à l'accueil</Link>
        </main>
    )

}