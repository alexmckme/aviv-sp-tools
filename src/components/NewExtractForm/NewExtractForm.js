"use client"
import React from 'react';
import {createNewGoogleSheet, createNewTab, getListOfGsheets} from "@/utils/helpers/googleInteraction";
import {
    createNewCoeffectiveExtractSF, createNewCoeffectiveExtractTableau,
    retrieveDriveId, retrieveTableauToken,
    storeUpdateTabId
} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import NewExtractFormSystemChoice from "@/components/NewExtractFormSystemChoice";
import NewExtractFormSalesforceInfo from "@/components/NewExtractFormSalesforceInfo"
import NewExtractFormFlamingoInfo from "@/components/NewExtractFormFlamingoInfo";
import ResultNewExtractModal from "@/components/ResultNewExtractModal";


function NewExtractForm() {

    const [chosenSystem, setChosenSystem] = React.useState("")
    const [salesforceReportId, setSalesforceReportId] = React.useState("")
    const [newGsheetToCreate, setNewGsheetToCreate] = React.useState(undefined)
    const [newGsheetName, setNewGsheetName] = React.useState("")
    const [frequency, setFrequency] = React.useState("Toutes les 30 minutes")
    const [startingHour, setStartingHour] = React.useState(1)
    const [endingHour, setEndingHour] = React.useState(23)
    const [newTabName, setNewTabName] = React.useState("")

    const [listOfGsheetFiles, setListOfGsheetFiles] = React.useState([])
    const [existingGsheetId, setExistingGsheetId] = React.useState("")

    const [tableauTokenName, setTableauTokenName] = React.useState("")
    const [newPersonalTableauTokenName, setNewPersonalTableauTokenName] =  React.useState("")
    const [newTableauDatasourceName, setNewTableauDatasourceName] = React.useState("")

    const [status, setStatus] = React.useState("idle")
    // valeurs possibles : idle, loading, success, error

    return (
        <>
            <form
                onSubmit={async (event) => {
                    event.preventDefault()
                    setStatus("loading")
                    const userDriveId = await retrieveDriveId()
                    try {
                        if (newGsheetToCreate) {
                            const newGsheetData = await createNewGoogleSheet(newGsheetName, userDriveId)
                            const newTabId = await createNewTab(newGsheetData.gsheetId, newTabName)
                            let newExtractDbId

                            if (chosenSystem === "salesforce-ma" || chosenSystem === "salesforce-gsl") {
                                newExtractDbId = await createNewCoeffectiveExtractSF(chosenSystem, salesforceReportId, newGsheetData.gsheetId, newTabId, frequency, startingHour, endingHour)
                            } else if (chosenSystem === "flamingo") {
                                newExtractDbId = await createNewCoeffectiveExtractTableau(newTableauDatasourceName, newGsheetData.gsheetId, newTabId, startingHour, endingHour)
                            }

                            if (newExtractDbId.ok) {
                                setStatus("success")
                            } else {
                                setStatus("error")
                            }
                        }
                        if (!newGsheetToCreate) {
                            const newTabId = await createNewTab(existingGsheetId, newTabName)
                            let newExtractDbId

                            if (chosenSystem === "salesforce-ma" || chosenSystem === "salesforce-gsl") {
                                newExtractDbId = await createNewCoeffectiveExtractSF(chosenSystem, salesforceReportId, existingGsheetId, newTabId, frequency, startingHour, endingHour)
                            } else if (chosenSystem === "flamingo") {
                                newExtractDbId = await createNewCoeffectiveExtractTableau(newTableauDatasourceName, existingGsheetId, newTabId, startingHour, endingHour)
                            }

                            if (newExtractDbId.ok) {
                                setStatus("success")
                            } else {
                                setStatus("error")
                            }
                        }}
                    catch (error) {
                        console.log(error)
                        setStatus("error")
                    }

                }}
            >
                <NewExtractFormSystemChoice chosenSystem={chosenSystem} setChosenSystem={setChosenSystem} status={status} />

                {(chosenSystem==="salesforce-ma" || chosenSystem==="salesforce-gsl")
                    &&
                    <NewExtractFormSalesforceInfo
                        salesforceReportId={salesforceReportId}
                        setSalesforceReportId={setSalesforceReportId}
                        frequency={frequency}
                        setFrequency={setFrequency}
                        startingHour={startingHour}
                        setStartingHour={setStartingHour}
                        endingHour={endingHour}
                        setEndingHour={setEndingHour}
                        newGsheetToCreate={newGsheetToCreate}
                        setNewGsheetToCreate={setNewGsheetToCreate}
                        newGsheetName={newGsheetName}
                        setNewGsheetName={setNewGsheetName}
                        newTabName={newTabName}
                        setNewTabName={setNewTabName}
                        listOfGsheetFiles={listOfGsheetFiles}
                        setListOfGsheetFiles={setListOfGsheetFiles}
                        existingGsheetId={existingGsheetId}
                        setExistingGsheetId={setExistingGsheetId}
                        status={status}
                        setStatus={setStatus}
                    />
                }

                {(chosenSystem === "flamingo")
                    &&
                    <NewExtractFormFlamingoInfo
                        tableauTokenName={tableauTokenName}
                        setTableauTokenName={setTableauTokenName}
                        newTableauDatasourceName={newTableauDatasourceName}
                        setNewTableauDatasourceName={setNewTableauDatasourceName}
                        startingHour={startingHour}
                        setStartingHour={setStartingHour}
                        setEndingHour={setEndingHour}
                        newGsheetToCreate={newGsheetToCreate}
                        setNewGsheetToCreate={setNewGsheetToCreate}
                        newGsheetName={newGsheetName}
                        setNewGsheetName={setNewGsheetName}
                        newTabName={newTabName}
                        setNewTabName={setNewTabName}
                        listOfGsheetFiles={listOfGsheetFiles}
                        setListOfGsheetFiles={setListOfGsheetFiles}
                        existingGsheetId={existingGsheetId}
                        setExistingGsheetId={setExistingGsheetId}
                        status={status}
                        setStatus={setStatus}
                    />

                }

            </form>
            {<ResultNewExtractModal status={status} setStatus={setStatus}/>}

        </>

    )
        ;
}

export default NewExtractForm;
