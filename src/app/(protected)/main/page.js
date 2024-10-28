import React from "react";
import styles from "./page.module.css"
import Link from "next/link";

export default async function PrivatePage() {

    return (
        <section className={styles.sectionWrapper}>
            <style>{'body {background-color: #D7E0FFFF}'}</style>
            <div>
                <h2>Bienvenue sur Aviv SP Helper !</h2>
                <p>Si vous êtes Business Analyst à la Sales Performance et que c'est la première fois que vous voyez
                    cette page, cliquez ici 😉 : </p>
                <p className={styles.importantLink}>👉 <Link href="/main/coeffective">Coeffective</Link> 👈</p>
                <hr/>
                <p><em>Ce projet est une expérimentation, en constante évolution. Les feedbacks sont bienvenus. Merci !</em></p>
            </div>
        </section>
    )
}