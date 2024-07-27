import React from 'react';
import {retrieveTableauToken} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import {getListOfGsheets} from "@/utils/helpers/googleInteraction";

function NewExtractFormFlamingoInfo({ tableauTokenName, setTableauTokenName, newTableauDatasourceName, setNewTableauDatasourceName, startingHour, setStartingHour, setEndingHour, newGsheetToCreate, setNewGsheetToCreate, newGsheetName, setNewGsheetName, newTabName, setNewTabName, listOfGsheetFiles, setListOfGsheetFiles, existingGsheetId, setExistingGsheetId, status }) {


  const availableStartingFlamingoHours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

  return (
      <>
        <fieldset>
          <legend>Vérifiez que vous avez bien configuré un token Tableau afin d'automatiser cet import :
          </legend>
          {tableauTokenName === ""
              &&
              <p onClick={async () => {
                const retrievedTableauTokenName = await retrieveTableauToken()
                if (!retrievedTableauTokenName) {
                  setTableauTokenName("None")
                } else {
                  setTableauTokenName(retrievedTableauTokenName)
                }
              }}>Vérifier maintenant</p>
          }
          {tableauTokenName === "None"
              &&
              <>
                <p>Veuillez définir votre token d'accès personnel Tableau : ici</p>
              </>
          }
          {tableauTokenName !== "None" && tableauTokenName !== ""
              &&
              <>
                <p>Voici le nom de token actuellement connu de Coeffective : {tableauTokenName}</p>
              </>

          }
        </fieldset>
        {tableauTokenName !== "None" && tableauTokenName !== ""
            &&
            <>
              <fieldset>
                <legend>Saisissez le nom exact de l'extract que vous avez créé, que vous souhaitez
                  importer :
                </legend>
                <label htmlFor="new-tableau-datasource-name">Nom exact de la source de donnée
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
              </fieldset>

              <fieldset>
                <legend>Choisissez l'heure de mise à jour souhaitée :</legend>
                <label htmlFor="starting-hour">Heure approximative du refresh :</label>
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
              </fieldset>

              <fieldset>
                <legend>Souhaitez-vous disposer de l'extract sur un nouveau Google Sheet, ou
                  réutiliser un
                  fichier
                  précédemment créé via Coeffective ?
                </legend>
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
              </fieldset>
              {newGsheetToCreate===true
                  &&
                  <>
                    <fieldset>
                      <legend>Donnez un nom à ce nouveau fichier Google Sheets :
                      </legend>
                      <label htmlFor="new-gsheet-name">Nom du nouveau fichier :</label>
                      <input
                          disabled={status==="loading"}
                          required={true}
                          type="text"
                          id="new-gsheet-name"
                          value={newGsheetName}
                          onChange={event => {
                            setNewGsheetName(event.target.value)
                          }}
                      />
                    </fieldset>

                    <fieldset>
                      <legend>Un nouvel onglet va être créé pour votre extract (sur ce nouveau Gsheet). Veuillez choisir un nom à cet
                        onglet :
                      </legend>
                      <label htmlFor="new-tab-name">Nom du nouvel onglet :</label>
                      <input
                          disabled={status==="loading"}
                          required={true}
                          type="text"
                          id="new-tab-name"
                          value={newTabName}
                          onChange={event => {
                            setNewTabName(event.target.value)
                          }}
                      />
                    </fieldset>

                    <button>Valider</button>
                  </>
              }
              {newGsheetToCreate===false
                  &&
                  <>
                    {listOfGsheetFiles.length===0 &&
                        (<div onClick={async () => {
                          const listOfGsheets = await getListOfGsheets();
                          setListOfGsheetFiles(listOfGsheets)
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
                            <label htmlFor="new-tab-name">Nom du nouvel onglet :</label>
                            <input
                                disabled={status==="loading"}
                                required={true}
                                type="text"
                                id="new-tab-name"
                                value={newTabName}
                                onChange={event => {
                                  setNewTabName(event.target.value)
                                }}
                            />
                          </fieldset>
                          <button>Valider</button>
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
