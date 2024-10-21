import React from 'react';
import {getListOfGsheets} from "@/utils/helpers/googleInteraction";
import styles from "./NewExtractFormSalesforceInfo.module.css"
import LoadingSpinner from "@/components/LoadingSpinner";

function NewExtractFormSalesforceInfo({ salesforceReportId, setSalesforceReportId, frequency, setFrequency, startingHour, setStartingHour, endingHour, setEndingHour, newGsheetToCreate, setNewGsheetToCreate, newGsheetName, setNewGsheetName, newTabName, setNewTabName, listOfGsheetFiles, setListOfGsheetFiles, existingGsheetId, setExistingGsheetId, status, setStatus }) {


    const availableHours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

    return (
        <>
            <fieldset>
                <legend>Veuillez saisir ci-dessous l'ID du rapport Salesforce que vous souhaitez importer :
                </legend>
                <div>
                    <label htmlFor="salesforce-report-id">ID (contient 18 caractères)* :</label>
                    <input
                        disabled={status === "loading"}
                        required={true}
                        minLength={18}
                        maxLength={18}
                        type="text"
                        id="salesforce-report-id"
                        value={salesforceReportId}
                        onChange={event => {
                            setSalesforceReportId(event.target.value)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    Choisissez la fréquence de mise à jour désirée :
                </legend>
                <div>
                    <input
                        disabled={status === "loading"}
                        type="radio"
                        name="chosen-frequency"
                        id="trente-min"
                        value="Toutes les 30 minutes"
                        checked={frequency === "Toutes les 30 minutes"}
                        onChange={event => {
                            setFrequency(event.target.value)
                        }}
                    />
                    <label htmlFor="trente-min">Toutes les 30 minutes</label>
                </div>
                <div>
                    <input
                        disabled={status === "loading"}
                        type="radio"
                        name="chosen-frequency"
                        id="une-heure"
                        value="Toutes les heures"
                        checked={frequency === "Toutes les heures"}
                        onChange={event => {
                            setFrequency(event.target.value)
                        }}
                    />
                    <label htmlFor="une-heure">Toutes les heures</label>
                </div>
                <div>
                    <input
                        disabled={status === "loading"}
                        type="radio"
                        name="chosen-frequency"
                        id="un-jour"
                        value="Tous les jours"
                        checked={frequency === "Tous les jours"}
                        onChange={event => {
                            setFrequency(event.target.value)
                        }}
                    />
                    <label htmlFor="un-jour">Tous les jours</label>
                </div>
            </fieldset>

            <fieldset>
                <legend>Choisissez la fenêtre horaire de mise à jour désirée :</legend>
                <div>
                    <label htmlFor="starting-hour">Heure de début / minimale de refresh :</label>
                    <select
                        disabled={status === "loading"}
                        id="starting-hour" value={startingHour} onChange={event => {
                        console.log("Nouvelle heure de début :", event.target.value)
                        setStartingHour(event.target.value)
                    }}>
                        {availableHours.map(hour => (
                            <option key={hour} value={hour} disabled={hour >= endingHour}>{`${hour}h00`}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="ending-hour">Heure de fin / maximale de refresh :</label>
                    <select
                        disabled={status === "loading"}
                        id="ending-hour" value={endingHour} onChange={event => {
                        console.log("Nouvelle heure de fin :", event.target.value)
                        setEndingHour(event.target.value)
                    }}>
                        {availableHours.map(hour => (
                            <option key={hour} value={hour} disabled={hour <= startingHour}>{`${hour}h00`}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {status === "loading" && <LoadingSpinner/>}

            <fieldset>
                <legend>Souhaitez-vous disposer de l'extract sur un nouveau Google Sheet, ou réutiliser un
                    fichier
                    précédemment créé via Coeffective ?
                </legend>
                <div>
                    <input
                        disabled={status === "loading"}
                        type="radio"
                        name="new-gsheet-choice"
                        id="create-new-gsheet"
                        value={true}
                        checked={newGsheetToCreate === true}
                        onChange={event => {
                            setNewGsheetToCreate(true)
                        }}
                    />
                    <label htmlFor="create-new-gsheet">Créer un nouveau Gsheet</label>
                </div>
                <div>
                    <input
                        disabled={status === "loading"}
                        type="radio"
                        name="new-gsheet-choice"
                        id="reuse-previous-gsheet"
                        value={false}
                        checked={newGsheetToCreate === false}
                        onChange={event => {
                            setNewGsheetToCreate(false)
                        }}
                    />
                    <label htmlFor="reuse-previous-gsheet">Réutiliser un Gsheet existant</label>
                </div>
            </fieldset>



            {newGsheetToCreate === true
                &&
                <>
                    <fieldset>
                        <legend>Donnez un nom à ce nouveau fichier Google Sheets :
                        </legend>
                        <div>
                            <label htmlFor="new-gsheet-name">Nom du nouveau fichier :</label>
                            <input
                                disabled={status === "loading"}
                                required={true}
                                type="text"
                                id="new-gsheet-name"
                                value={newGsheetName}
                                onChange={event => {
                                    setNewGsheetName(event.target.value)
                                }}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Un nouvel onglet va être créé pour votre extract (sur ce nouveau Gsheet). Veuillez
                            choisir un nom à cet
                            onglet :
                        </legend>
                        <div>
                            <label htmlFor="new-tab-name">Nom du nouvel onglet :</label>
                            <input
                                disabled={status === "loading"}
                                required={true}
                                type="text"
                                maxLength="50"
                                id="new-tab-name"
                                value={newTabName}
                                onChange={event => {
                                    setNewTabName(event.target.value)
                                }}
                            />
                        </div>
                    </fieldset>

                    <button className={styles.confirmButton} disabled={status === "loading"}>Valider</button>
                </>
            }


            {newGsheetToCreate === false
                &&
                <>
                    {listOfGsheetFiles.length === 0 &&
                        (<div className={styles.showMoreContainer} onClick={async () => {
                            setStatus("loading")
                            const listOfGsheets = await getListOfGsheets();
                            setListOfGsheetFiles(listOfGsheets)
                            setStatus("idle")
                        }}>
                            <p>Afficher la liste des Gsheets existants</p>
                        </div>)}
                    {listOfGsheetFiles.length!==0 && (
                        <fieldset>
                            <legend>Choisissez le Gsheet que vous souhaitez réutiliser :</legend>
                            {listOfGsheetFiles.map((gsheetFile) => (
                                <div key={gsheetFile.id}>
                                    <input
                                        disabled={status==="loading"}
                                        type="radio"
                                        name="chosen-existing-gsheet"
                                        id={gsheetFile.id}
                                        value={gsheetFile.id}
                                        checked={existingGsheetId===gsheetFile.id}
                                        onChange={event => {
                                            setExistingGsheetId(event.target.value)
                                        }}
                                    />
                                    <label htmlFor={gsheetFile.id}>{gsheetFile.name} <a
                                        href={`https://docs.google.com/spreadsheets/d/${gsheetFile.id}`} target={"_blank"}>🔗</a></label>
                                </div>
                            ))}
                        </fieldset>
                    )}
                    {existingGsheetId
                        &&
                        <>
                            <fieldset>
                                <legend>Un nouvel onglet va être créé pour votre extract (sur le Gsheet existant). Veuillez choisir un nom à cet
                                    onglet :
                                </legend>
                                <div>
                                    <label htmlFor="new-tab-name">Nom du nouvel onglet :</label>
                                    <input
                                        disabled={status === "loading"}
                                        required={true}
                                        type="text"
                                        maxLength="50"
                                        id="new-tab-name"
                                        value={newTabName}
                                        onChange={event => {
                                            setNewTabName(event.target.value)
                                        }}
                                    />
                                </div>
                            </fieldset>
                            <button className={styles.confirmButton} disabled={status === "loading"}>Valider</button>
                        </>
                    }
                </>

            }


        </>
    );
}

export default NewExtractFormSalesforceInfo;
