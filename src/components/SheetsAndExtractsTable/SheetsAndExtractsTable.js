import React from 'react';
import Fragment from "react";
import SheetTableRow from "@/components/SheetTableRow";

function SheetsAndExtractsTable({listOfGsheets, listOfExtracts, listOfGsheetsMoreInfo}) {

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th scope="col">Date de création</th>
                    <th scope="col">Lien</th>
                    <th scope="col">Nom du fichier</th>
                    {/*<th scope="col">Modifier</th>*/}
                    <th scope="col">Supprimer</th>
                    <th scope="col">Détails</th>
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



