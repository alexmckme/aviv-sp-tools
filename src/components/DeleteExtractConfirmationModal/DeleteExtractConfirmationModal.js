"use client"
import React from 'react';
import styles from "./DeleteExtractConfirmationModal.module.css"
import {deleteTabFromGsheet} from "@/utils/helpers/googleInteraction";
import {deleteCoeffectiveExtractFromDB} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import LoadingSpinner from "@/components/LoadingSpinner";
import {RemoveScroll} from 'react-remove-scroll';

function DeleteExtractConfirmationModal({setIsModalOpen, gsheetFile, extract, setIsExtractRowHidden }) {

    const [status, setStatus] = React.useState("idle");
    const [isDisabled, setIsDisabled] = React.useState(false);
    // idle, loading, success, error

    async function handleDelete() {
        setStatus("loading")
        setIsDisabled(true)
        const deletedTabFromGsheet = await deleteTabFromGsheet(gsheetFile.id, extract.onglet_id)
        const deletedExtractFromDB = await deleteCoeffectiveExtractFromDB(gsheetFile.id, extract.onglet_id)
        setStatus("idle")
        setIsModalOpen(false)
        setIsExtractRowHidden(true)
    }

    return (
        <RemoveScroll>
            <div className={styles.bg}></div>
            <div className={styles.wrapper}>
                {status === "loading" && <LoadingSpinner className={styles.loading}/>}
                <h2>Êtes vous sûr de vouloir continuer ?</h2>
                <p>Si vous souhaitez de nouveau faire cet import après suppression, vous devrez le reconfigurer.</p>
                <div>
                    <button className={styles.cancelButton} disabled={isDisabled} onClick={() => {
                        setIsModalOpen(false)
                    }}>Annuler
                    </button>
                    <button className={styles.confirmButton} onClick={handleDelete} disabled={isDisabled}>Supprimer</button>
                </div>
            </div>
        </RemoveScroll>
    );
}

export default React.memo(DeleteExtractConfirmationModal);
