import React from "react"
import NewExtractForm from "@/components/NewExtractForm";
import styles from "./page.module.css"
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";


export default function NewExtractConfigurationPage() {


    return (
        <section className={styles.sectionWrapper}>
            <style>{'body {background-color: #D7E0FFFF}'}</style>
            <h1>Coeffective - Nouvel import d'extract</h1>
            <p className={styles.description}>Sur cette page, vous pouvez configurer un import d'extract Salesforce MA, Salesforce GSL, et Flamingo (expérimental, cf. <Link href={"/main/coeffective/information-tableau"}>guide d'utilisation</Link>). Après avoir créé l'import, les données n'apparaîtront qu'à partir de la première mise-à-jour, selon la fréquence et l'horaire configurées. Vous pourrez ensuite faire des importrange à partir des Google Sheets créés. Enjoy!</p>
            <NewExtractForm/>
        </section>
    )
}