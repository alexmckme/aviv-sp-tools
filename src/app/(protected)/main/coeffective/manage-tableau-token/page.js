import React from "react"
import TableauTokenForm from "@/components/TableauTokenForm";
import {retrieveTableauToken} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import Link from "next/link";
import styles from "./page.module.css"

export default async function TableauTokenManagement() {

    const retrievedTableauTokenName = await retrieveTableauToken()

    return (
        <section className={styles.sectionWrapper}>
            <style>{'body {background-color: #D7E0FFFF}'}</style>
            <h1>Coeffective - Configuration de votre token Tableau</h1>
            <p className={styles.description}>Afin de pouvoir faire des imports depuis Flamingo, vous devez au préalable avoir pris connaissance des informations et suivi toutes les instructions du <Link href={"/main/coeffective/information-tableau"}><strong>guide d'utilisation</strong></Link> de cette fonctionnalité.</p>
            {!retrievedTableauTokenName ?
                <p className={styles.description}>
                    <strong>Vous n'avez pour l'instant pas encore configuré votre token Tableau.</strong>
                </p> :
                <p className={styles.description}>
                    Vous avez déjà configuré un token Tableau. Voici son nom, tel qu'actuellement connu de Coeffective
                    : <strong>{retrievedTableauTokenName}</strong>
                </p>}
            <TableauTokenForm/>
        </section>
    )
}