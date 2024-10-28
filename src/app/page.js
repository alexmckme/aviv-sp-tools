import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link"

export default function Home() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <a href="/" className={styles.logoLinkContainer}><Image src="/logo-brand-main.svg" width={200} height={50} alt="Aviv BP Helper official logo"/></a>
                <div className={styles.headerLoginContainer}>
                    <Link className={styles.headerLinkLogin} href="/login">Se connecter</Link>
                    <Link className={styles.headerLinkSignup} href="/signup">S'inscrire</Link>
                </div>
            </header>
            <section className={styles.section}>

                <h1 className={styles.title}>Cher AVIVer, bienvenue ! 👏🎉</h1>

                <div className={styles.pitch}>
                    <h2 className={styles.headerTwo}>Vos besoins impliquent-ils de transformer vos Google Sheets en usine à gaz ? 🤔</h2>
                    <p>Des solutions existent ! Avec <strong>Aviv SP Helper</strong>, simplifiez votre quotidien en adoptant la puissance
                        des
                        technologies web du XXIe siècle, spécifiquement customisées pour vos besoins.</p>
                </div>

                <div className={styles.loginContainer}>
                    <Link className={styles.login} href="/login">Se connecter</Link>
                    <Link className={styles.signup} href="/signup">S'inscrire</Link>
                </div>

                <div className={styles.cardsContainer}>
                    <h2 className={styles.headerTwo}>Des fonctionnalités étonnamment innovantes 🚀</h2>
                    <div className={styles.card}>
                        <h3>Coeffective</h3>
                        <p>Planifiez la mise-à-jour de Google Sheets avec des rapports SF MA et SF GSL. Avec
                            une fréquence élevée allant jusqu'à toutes les 30 minutes. Pour un nombre d'extracts
                            illimités.
                            Gratuitement.</p>
                    </div>


                    <div className={styles.cardSoon}>
                        <h3>Suivi de productivité (en cours de développement)</h3>
                        <p>Redécouvrez les joies des statistiques de vos équipes sur une interface simple et épurée.
                            Dites
                            adieu aux lenteurs de chargement, aux conflits de filtres, et aux dizaines d'onglets
                            inutiles.
                            (Pour bientot...)</p>
                    </div>
                    <div className={styles.cardSoon}>
                        <h3>Suivi des impayés Aviv (en cours de développement)</h3>
                        <p>Retrouvez facilement, sur une seule et même page, toutes les données concernant les impayés
                            d'un
                            client donné. Obtenez plus de transparence et de vision sur ce sujet opaque. (Pour
                            bientôt...)</p>
                    </div>
                </div>

                <div className={styles.suggestionContainer}>
                    <h2 className={styles.headerTwo}>Un projet en constante évolution 🌱</h2>
                    <p>Avez-vous des idées en tête ? Cela pourrait peut-être constituer une prochaine fonctionnalité de
                        ce
                        projet ! N'hésitez pas à contacter Alex de l'équipe Sales Performance pour en discuter.</p>
                </div>
            </section>
            <footer className={styles.footer}>
                <p className={styles.credits}>Fait avec ♥ par Alex M.K.</p>
            </footer>
        </main>
    );
}
