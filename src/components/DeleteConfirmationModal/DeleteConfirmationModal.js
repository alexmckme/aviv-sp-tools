"use client"
import React from 'react';
import styles from "./DeleteConfirmationModal.module.css"
import {deleteTabFromGsheet} from "@/utils/helpers/googleInteraction";
import {deleteCoeffectiveExtractFromDB} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import LoadingSpinner from "@/components/LoadingSpinner";

function DeleteConfirmationModal({setIsModalOpen, gsheetFile, extract, setIsExtractRowHidden }) {

    const [status, setStatus] = React.useState("idle");
    // idle, loading, success, error

    async function handleDelete() {
        setStatus("loading")
        const deletedTabFromGsheet = await deleteTabFromGsheet(gsheetFile.id, extract.onglet_id)
        const deletedExtractFromDB = await deleteCoeffectiveExtractFromDB(gsheetFile.id, extract.onglet_id)
        setStatus("idle")
        setIsModalOpen(false)
        setIsExtractRowHidden(true)
    }

    return (
        <div className={styles.wrapper}>
            {status === "loading" && <LoadingSpinner className={styles.loading}/>}
            <h1>Êtes vous sûr de vouloir continuer ?</h1>
            <p>Si vous souhaitez de nouveau faire cet import après suppression, vous devrez le reconfigurer.</p>
            <button onClick={() => {
                setIsModalOpen(false)
            }}>Annuler</button>
            <button onClick={handleDelete}>Supprimer</button>
        </div>
    );
}

export default React.memo(DeleteConfirmationModal);
