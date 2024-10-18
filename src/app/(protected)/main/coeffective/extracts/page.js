import React from "react"
import {getListOfGsheets} from "@/utils/helpers/googleInteraction";
import SheetsAndExtractsTable from "@/components/SheetsAndExtractsTable";
import {
    retreiveCoeffectiveExtracts,
    retrieveCoeffectiveGsheetsMoreInfo
} from "@/utils/helpers/coeffectiveDatabaseInteraction";


export default async function ExtractsManager() {

    const listOfGsheets = await getListOfGsheets()
    const listOfExtracts = await retreiveCoeffectiveExtracts()
    const listOfGsheetsMoreInfo = await retrieveCoeffectiveGsheetsMoreInfo()

    return (
        <>
            <p>Retrouvez ici la liste de tous les Google Sheets créés via Coeffective :</p>
            <SheetsAndExtractsTable listOfGsheets={listOfGsheets} listOfExtracts={listOfExtracts} listOfGsheetsMoreInfo={listOfGsheetsMoreInfo}/>
        </>
    )
}