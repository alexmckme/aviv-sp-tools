import React from "react"
import {getListOfGsheets} from "@/utils/helpers/googleInteraction";
import SheetsAndExtractsTable from "@/components/SheetsAndExtractsTable";
import {
    retreiveCoeffectiveExtracts,
    retrieveCoeffectiveGsheetsMoreInfo
} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import styles from "./page.module.css"


export default async function ExtractsManager() {

    const listOfGsheets = await getListOfGsheets()
    const listOfExtracts = await retreiveCoeffectiveExtracts()
    const listOfGsheetsMoreInfo = await retrieveCoeffectiveGsheetsMoreInfo()

    return (
        <>
            <style>{'body {background-color: #D7E0FFFF}'}</style>
            <div className={styles.textWrapper}>
                <h1>Gestion des fichiers Google Sheets et imports existants</h1>
                <p>Vous retrouverez ci-dessous une vue d'ensemble des fichiers et extracts que vous avez créés. Features
                    disponibles aujourd'hui :</p>
                <ul>
                    <li><strong>Détail de tous les extracts</strong> configurés pour chaque Google Sheet</li>
                    <li><strong>URLs directs</strong> vers les Google Sheets et rapports Salesforce MA & GSL</li>
                    <li><strong>Possibilité de supprimer</strong> un import d'extract individuel ou un Google Sheet
                        entier
                    </li>
                </ul>
            </div>
            <SheetsAndExtractsTable listOfGsheets={listOfGsheets} listOfExtracts={listOfExtracts}
                                    listOfGsheetsMoreInfo={listOfGsheetsMoreInfo}/>
        </>
    )
}