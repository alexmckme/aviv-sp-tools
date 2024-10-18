import React from 'react';
import Fragment from "react";
import SheetTableRow from "@/components/SheetTableRow";
import styles from "./SheetsAndExtractsTable.module.css"

function SheetsAndExtractsTable({listOfGsheets, listOfExtracts, listOfGsheetsMoreInfo}) {

    return (
        <>
            <table className={styles.table}>
                <thead>
                <tr className={styles.mainHeader}>
                    <th scope="col">Date de création</th>
                    <th scope="col">Lien Gsheet</th>
                    <th scope="col">Nom du fichier</th>
                    {/*<th scope="col">Modifier</th>*/}
                    <th scope="col">Détails</th>
                    <th scope="col">Supprimer</th>
                </tr>
                </thead>

                {listOfGsheets.map((gsheetFile) => {

                        const gsheetCreationDateString = listOfGsheetsMoreInfo
                            .find((element) => (element.gsheet_id === gsheetFile.id))
                            .created_at

                        const parsedGsheetCreationDate = new Date(gsheetCreationDateString)
                        const formattedGsheetCreationDate = parsedGsheetCreationDate.toLocaleString("fr-FR", {timeZone: "Europe/Paris"})

                        const gsheetExtractsList = listOfExtracts.filter((element) => (element.gsheet_id === gsheetFile.id))

                        return (
                            <SheetTableRow key={Math.random()} formattedGsheetCreationDate={formattedGsheetCreationDate} gsheetFile={gsheetFile} gsheetExtractsList={gsheetExtractsList}/>
                        )
                    }
                )}
            </table>
        </>
    );
}

export default SheetsAndExtractsTable;



