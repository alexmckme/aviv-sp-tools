import React from 'react';
import {retrieveTableauToken} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import {getListOfGsheets} from "@/utils/helpers/googleInteraction";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./NewExtractFormFlamingoInfo.module.css";
import Link from "next/link";

function NewExtractFormFlamingoInfo({ tableauTokenName, setTableauTokenName, newTableauDatasourceName, setNewTableauDatasourceName, startingHour, setStartingHour, setEndingHour, newGsheetToCreate, setNewGsheetToCreate, newGsheetName, setNewGsheetName, newTabName, setNewTabName, listOfGsheetFiles, setListOfGsheetFiles, existingGsheetId, setExistingGsheetId, status, setStatus }) {


    const availableStartingFlamingoHours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

    return (
        <>
            <fieldset>
                <legend>Vérifiez que vous avez bien configuré un token Tableau afin d'automatiser cet import :
                </legend>
                {tableauTokenName === ""
                    &&
                    <div className={styles.showMoreContainer} onClick={async () => {
                        setStatus("loading")
                        const retrievedTableauTokenName = await retrieveTableauToken()
                        if (!retrievedTableauTokenName) {
                            setTableauTokenName("None")
                        } else {
                            setTableauTokenName(retrievedTableauTokenName)
                        }
                        setStatus("idle")
                    }}><p>Cliquez ici pour vérifier</p>
                    </div>
                }
                {tableauTokenName === "None"
                    &&
                    <>
                        <p>Veuillez définir votre token d'accès personnel Tableau : <Link href={"/main/coeffective/manage-tableau-token"}>ici</Link>.</p>
                        <p>Plus d'informations disponibles sur la page <Link href={"/main/coeffective/information-tableau"}>guide d'utilisation</Link>.</p>
                    </>
                }
                {tableauTokenName !== "None" && tableauTokenName !== ""
                    &&
                    <>
                        <p>Voici le nom du token que vous avez configuré, actuellement connu de Coeffective : <strong>{tableauTokenName}</strong></p>
                        <p>Si ce token est invalide, vous pouvez le reconfigurer de nouveau <Link href={"/main/coeffective/manage-tableau-token"}>ici</Link>.</p>
                    </>

                }
            </fieldset>
            {tableauTokenName !== "None" && tableauTokenName !== ""
                &&
                <>
                    <fieldset>
                        <legend>Saisissez le nom <strong>exact</strong> de l'extract que vous avez créé, que vous souhaitez
                            importer :
                        </legend>
                        <div>
                            <label htmlFor="new-tableau-datasource-name">Nom <strong>exact</strong> de la source de donnée
                                :</label>
                            <input
                                disabled={status === "loading"}
                                required={true}
                                type="text"
                                id="new-tableau-datasource-name"
                                value={newTableauDatasourceName}
                                onChange={event => {
                                    setNewTableauDatasourceName(event.target.value)
                                }}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Choisissez l'heure de mise à jour souhaitée :</legend>
                        <div>
                            <label htmlFor="starting-hour">Heure approximative souhaitée du refresh :</label>
                            <select
                                disabled={status === "loading"}
                                id="starting-hour" value={startingHour} onChange={event => {
                                const chosenStartingHour = Number(event.target.value)
                                console.log("Nouvelle heure de début :", chosenStartingHour, "Nouvelle heure de fin :", chosenStartingHour + 1)
                                setStartingHour(chosenStartingHour)
                                setEndingHour(chosenStartingHour + 1)
                            }}>
                                {availableStartingFlamingoHours.map(hour => (
                                    <option key={hour} value={hour}>{`${hour}h00`}</option>
                                ))}
                            </select>
                        </div>
                    </fieldset>

                    {status === "loading" && <LoadingSpinner/>}

                    <fieldset>
                        <legend>Souhaitez-vous disposer de l'extract sur un nouveau Google Sheet, ou
                            réutiliser un
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

                            <button disabled={status === "loading"}>Valider</button>
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
                                    <p> Afficher la liste des Gsheets existants </p>
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

            }
        </>


    );
}

export default NewExtractFormFlamingoInfo;
