import GoogleDriveChecker from "@/components/GoogleDriveChecker";
import Link from "next/link";
import React from "react";
import styles from "./page.module.css"

export default function CoeffectiveMain() {


    return (
        <section>
            <style>{'body {background-color: #D7E0FFFF}'}</style>
            <div className={styles.sectionWrapper}>
                <h1>Coeffective - Accueil</h1>
                <p>Coeffective est une solution spécialement conçue pour les Business Analysts de la Sales Performance,
                    leur
                    permettant de faciliter l'import d'extracts depuis Salesforce MA, Salesforce GSL, et Flamingo vers
                    des
                    fichiers Google Sheets, à une fréquence adaptée aux besoins du commerce (ex : toutes les 30 minutes).</p>
            </div>

            <div className={styles.sectionWrapper}>
                <h2>Commencer à utiliser Coeffective :</h2>
                <GoogleDriveChecker showMessage={true}/>
                <p><Link href="/main/coeffective/new">🆕 Nouvel import d'extract Salesforce MA, Salesforce GSL ou
                    Flamingo</Link></p>
                <p><Link href="/main/coeffective/manage-tableau-token">🥮 Création ou configuration de votre Token de
                    connexion Tableau</Link></p>
                <p><a href="/main/coeffective/extracts">✏️ Gestion de vos Google Sheets et imports existants</a>
                </p>
            </div>

            <div className={styles.sectionWrapper}>
                <h2> Informations utiles et importantes :</h2>
                <h3>Pour créer un import depuis Salesforce :</h3>
                <ul>
                    <li>Vous aurez besoin de l'ID (18 caractères) du rapport.</li>
                    <li>Les rapports privés ne peuvent pas être importés.</li>
                    <li>Pour les fréquences de refresh toutes les 30 min ou toutes les heures, les mises-à-jour se
                        feront dans l'intervalle horaire renseignée (heure minimale et maximale incluses). Pour la
                        fréquence
                        quotidienne, l'heure quotidienne de refresh correspondra au premier horaire xx:00 ou xx:30 suite à la configuration de l'import dans l'intervalle horaire que vous aurez sélectionnée.
                    </li>
                    <li>Vous devrez choisir un nom au fichier Google Sheet (si vous en créez un nouveau) et à l'onglet
                        où se
                        retrouvera votre import. <strong>Attention : si vous souhaitez absolument renommer le fichier ou les
                            onglets, il faudra les supprimer pour les recréer</strong>, car il n'est actuellement pas possible de les
                        renommer directement.
                    </li>
                </ul>
                <h3>Pour créer un import depuis Flamingo :</h3>
                <ul>
                    <li><em>Disclaimer</em> : il s'agit d'une fonctionnalité très expérimentale, certains imports peuvent ne pas être configurables. Plus de détails dans le <Link href={"/main/coeffective/information-tableau"}>guide d'utilisation</Link>.</li>
                    <li><em>Prérequis</em> : Vous devrez avoir configuré Tableau Desktop avec le connecteur Athena sur votre PC de travail,
                        et
                        déployé un extract Flamingo sur le serveur Tableau d'AVIV en tant que source de données avec
                        mises-à-jour programmées.
                    </li>
                    <li><em>Prérequis</em> : Vous aurez besoin de configurer un token de connexion Tableau en amont des imports sur
                        Coeffective.
                    </li>
                    <li>Surveillez vos mails sur votre boîte Gmail AVIV afin de vous assurer au fil des semaines que les
                        mises-à-jour programmées sur votre source de donnée Tableau se désactivent pas pour cause
                        "d'inactivité".
                    </li>
                    <li>Retrouvez toutes les explications pas-à-pas sur la page <Link href={"/main/coeffective/information-tableau"}>Guide d'utilisation</Link> (à suivre...)</li>
                </ul>
                <h3>Utilisation des imports une fois créés :</h3>
                <ul>
                    <li><strong>Le premier import d'extract ne s'effectue qu'à la première exécution de refresh.</strong>
                    </li>
                    <li>Les exécutions de refresh se font tous les xx:00 et xx:30, selon la fréquence et l'intervalle
                        que
                        vous avez sélectionnées.
                    </li>
                    <li><strong>Il n'est pas
                        (encore) possible d'effectuer une exécution manuelle d'un import.</strong></li>
                    <li>Des fichiers et onglets sont créés dans le drive qui vous a été partagé. Ce drive n'est
                        accessible
                        qu'en tant que "Commentateur". Hormis l'ajout de commentaires, vous ne pourrez donc pas y
                        effectuer
                        de modifications directement.
                    </li>
                    <li>Après avoir créé un import, vous pourrez ensuite effectuer des importrange sur vos propres
                        fichiers.
                    </li>
                    <li>Quand vient l'heure du refresh, les mises-à-jour s'effectuent les unes après les autres sur les
                        Google Sheets du drive partagé. Quand les mises-à-jour sont effectuées pour un fichier donné,
                        l'onglet <em>{`>> Infos Màj Extracts <<`}</em> présente le dernier statut de mise-à-jour de
                        chaque
                        extract.
                    </li>
                    <li>La page "Gestion des fichiers Google Sheets et imports existants" vous donne une vision complète
                        des
                        fichiers et imports créés, et vous permet de les supprimer.
                    </li>
                </ul>
            </div>
        </section>
    )
}