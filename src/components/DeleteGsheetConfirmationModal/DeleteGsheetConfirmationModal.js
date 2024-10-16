"use client"
import React from 'react';
import styles from "./DeleteGsheetConfirmationModal.module.css"
import {deleteGsheet} from "@/utils/helpers/googleInteraction";
import {
    deleteAllExtractsOfGsheetFromDB,
    deleteCoeffectiveGsheetFromDB
} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import LoadingSpinner from "@/components/LoadingSpinner";
import {RemoveScroll} from 'react-remove-scroll';

function DeleteGsheetConfirmationModal({setIsModalOpen, gsheetFile, setIsSheetRowDeleted, gsheetExtractsList}) {

    const [status, setStatus] = React.useState('idle')
    const [isDisabled, setIsDisabled] = React.useState(false);
    // idle, loading, success, error

    async function handleDelete() {
        setStatus("loading")
        setIsDisabled(true)
        const deletedAllExtractsOfGsheetFromDB= await deleteAllExtractsOfGsheetFromDB(gsheetFile.id, gsheetExtractsList)
        const deletedGsheet = await deleteGsheet(gsheetFile.id)
        const deletedGsheetFromDB = await deleteCoeffectiveGsheetFromDB(gsheetFile.id)
        setStatus("idle")
        setIsModalOpen(false)
        setIsSheetRowDeleted(true)
    }

    return (
        <RemoveScroll>
            <div className={styles.bg}></div>
            <div className={styles.wrapper}>
                {status === "loading" && <LoadingSpinner className={styles.loading}/>}
                <h2>Êtes vous sûr de vouloir continuer ?</h2>
                <p>Assurez-vous d'avoir pris note des extracts associés dont vous pourriez peut-être avoir besoin dans le futur.</p>
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

export default DeleteGsheetConfirmationModal;
