import styles from "./page.module.css"
import Link from "next/link";


export default function ErrorPage() {
    return (
        <main className={styles.main}>
            <style>{'body {background-color: #510bdc}'}</style>
            <h1>Désolé, une erreur s'est produite...</h1>
            <p>Le lien que vous venez de cliquer est probablement expiré. Veuillez réessayer d'obtenir un nouveau lien pour vous connecter.</p>
            <Link className={styles.homeLink} href="/">Retour à l'accueil</Link>
        </main>
    )
}