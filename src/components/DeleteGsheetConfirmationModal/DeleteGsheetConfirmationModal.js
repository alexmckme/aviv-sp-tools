"use client"
import React from 'react';
import styles from "./DeleteGsheetConfirmationModal.module.css"
import {deleteGsheet} from "@/utils/helpers/googleInteraction";
import {
    deleteAllExtractsOfGsheetFromDB,
    deleteCoeffectiveGsheetFromDB
} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import LoadingSpinner from "@/components/LoadingSpinner";

function DeleteGsheetConfirmationModal({setIsModalOpen, gsheetFile, setIsSheetRowDeleted, gsheetExtractsList}) {

    const [status, setStatus] = React.useState('idle')
    // idle, loading, success, error

    async function handleDelete() {
        setStatus("loading")
        const deletedAllExtractsOfGsheetFromDB= await deleteAllExtractsOfGsheetFromDB(gsheetFile.id, gsheetExtractsList)
        const deletedGsheet = await deleteGsheet(gsheetFile.id)
        const deletedGsheetFromDB = await deleteCoeffectiveGsheetFromDB(gsheetFile.id)
        setStatus("idle")
        setIsModalOpen(false)
        setIsSheetRowDeleted(true)
    }

    return (
        <div className={styles.wrapper}>
            {status === "loading" && <LoadingSpinner className={styles.loading}/>}
            <h1>Êtes vous sûr de vouloir continuer ?</h1>
            <p>Cette action est irreversible. Avant suppression, assurez-vous d'avoir pris note des extracts associés à ce Google Sheet dont vous pourriez peut-être avoir besoin dans le futur.</p>
            <button onClick={() => {
                setIsModalOpen(false)
            }}>Annuler</button>
            <button onClick={handleDelete}>Supprimer</button>
        </div>
    );
}

export default DeleteGsheetConfirmationModal;
