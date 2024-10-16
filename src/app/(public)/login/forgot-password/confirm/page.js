import styles from "./page.module.css"
import Link from "next/link";

export default function ConfirmationPage() {
    return (
        <main className={styles.main}>
            <style>{'body {background-color: #510bdc}'}</style>
            <h1>Veuillez vérifier vos mails !</h1>
            <p>Si l'adresse mail que vous avez saisie est associée à un compte, vous avez reçu un lien pour réinitialiser votre mot de passe. Veuillez vérifier votre boîte de réception ainsi que dans les spams !</p>
            <Link className={styles.homeLink} href="/">Retour à l'accueil</Link>
        </main>
    )
}