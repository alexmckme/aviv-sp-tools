"use client"
import React from 'react';
import {updateTableauToken} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import styles from "./TableauTokenForm.module.css"
import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmedTableauTokenModal from "@/components/ConfirmedTableauTokenModal";

function TableauTokenForm() {

    const [newTableauUserFullName, setNewTableauUserFullName] = React.useState("")
    const [newPersonalTableauTokenName, setNewPersonalTableauTokenName] =  React.useState("")
    const [newPersonalTableauTokenValue, setNewPersonalTableauTokenValue] =  React.useState("")

    const [status, setStatus] = React.useState("idle")
    // valeurs possibles : idle, loading, success, error


    return (
        <form onSubmit={async (event) => {
            event.preventDefault()
            setStatus("loading")
            try {
                const updatedTableauToken = await updateTableauToken(newTableauUserFullName, newPersonalTableauTokenName, newPersonalTableauTokenValue)
                if (updatedTableauToken?.ok) {
                    setStatus("success")
                } else {
                    setStatus("error")
                }
            }
            catch {
                setStatus("error")
            }
        }}>
            {status === "loading" && <LoadingSpinner/>}
            <fieldset>
                <legend>Si vous souhaitez configurer votre token Tableau ou le modifier, remplissez les champs suivants
                    :
                </legend>
                <div className={styles.inputWrapper}>
                    <label htmlFor="new-user-full-name">Votre nom d'utilisateur Tableau :<br/></label>
                    <input
                        disabled={status === "loading"}
                        required={true}
                        type="text"
                        id="new-user-full-name"
                        value={newTableauUserFullName}
                        onChange={event => {
                            setNewTableauUserFullName(event.target.value)
                        }}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="new-personal-token-name">Nom exact du token :<br/></label>
                    <input
                        disabled={status === "loading"}
                        required={true}
                        type="text"
                        id="new-personal-token-name"
                        value={newPersonalTableauTokenName}
                        onChange={event => {
                            setNewPersonalTableauTokenName(event.target.value)
                        }}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="new-personal-token-value">Valeur du token :<br/></label>
                    <input
                        disabled={status === "loading"}
                        required={true}
                        type="text"
                        id="new-personal-token-value"
                        value={newPersonalTableauTokenValue}
                        onChange={event => {
                            setNewPersonalTableauTokenValue(event.target.value)
                        }}
                    />
                </div>
                <button className={styles.confirmButton} disabled={status === "loading"}>Valider</button>
            </fieldset>
            <ConfirmedTableauTokenModal status={status} setStatus={setStatus}/>
        </form>
    )
}

export default TableauTokenForm;