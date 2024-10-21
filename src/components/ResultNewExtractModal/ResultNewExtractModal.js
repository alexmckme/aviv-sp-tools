"use client"
import React from 'react';
import styles from "./ResultNewExtractModal.module.css"
import {RemoveScroll} from 'react-remove-scroll';

function ResultNewExtractModal({ status, setStatus }) {

    function handleClick(status) {
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
                            <a href="/main/coeffective/new">
                                <button className={styles.confirmButton} onClick={handleClick}>Créer un nouvel import</button>
                            </a>
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
                            <button className={styles.confirmButton} onClick={handleClick}>Continuer</button>
                        </div>
                    </div>
                </RemoveScroll>
            }
        </>
    );
}

export default ResultNewExtractModal;