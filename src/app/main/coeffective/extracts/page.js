import React from "react"
import {getListOfGsheets} from "@/utils/helpers/googleInteraction";


const listOfGsheets = await getListOfGsheets()

export default function ExtractsManager() {

    return (
        <>
            <p>Retrouvez ici la liste de tous les Google Sheets créés via Coeffective :</p>


            {listOfGsheets.map((gsheetFile) => (
                <div key={gsheetFile.id}>
                    <p htmlFor={gsheetFile.id}>{gsheetFile.name} <a
                        href={`https://docs.google.com/spreadsheets/d/${gsheetFile.id}`}
                        target={"_blank"}>🔗</a></p>
                </div>
            ))}

        </>
    )
}