"use client"
import React from 'react';
import styles from "./ResultNewExtractModal.module.css"
import {RemoveScroll} from 'react-remove-scroll';
import {useRouter} from "next/navigation"

function ResultNewExtractModal({ status, setStatus, setSalesforceReportId, setNewTableauDatasourceName, setNewGsheetName, setNewTabName }) {

    const router = useRouter()

    function handleClick(event) {
        event.preventDefault()

        if (status === "success") {
            setStatus("idle")
            setSalesforceReportId("")
            setNewTableauDatasourceName("")
            setNewGsheetName("")
            setNewTabName("")
            router.push("/main/coeffective/new")
        }

        setStatus("idle")
    }

    return (
        <>
            {
                (status === "success") &&
                <RemoveScroll>
                    <div className={styles.bg}></div>
                    <div className={styles.wrapper}>
                        <h2>Configuration de l'import réussie 🎉</h2>
                        <p>Vous pouvez désormais retrouver votre nouvel import sur <a href="/main/coeffective/extracts">cette page</a>.</p>
                        <div>
                            <div>
                                <button className={styles.confirmButton} onClick={handleClick}>Créer un nouvel import</button>
                            </div>
                        </div>
                    </div>
                </RemoveScroll>
            }
            {
                (status === "error") &&
                <RemoveScroll>
                    <div className={styles.bg}></div>
                    <div className={styles.wrapper}>
                        <h2>Une erreur s'est produite 🤔</h2>
                        <p>Avez-vous peut-être renseigné un nom d'onglet qui existait déjà ? Veuillez réessayer.</p>
                        <div>
                            <button className={styles.confirmButton} onClick={handleClick}>Réessayer</button>
                        </div>
                    </div>
                </RemoveScroll>
            }
        </>
    );
}

export default ResultNewExtractModal;