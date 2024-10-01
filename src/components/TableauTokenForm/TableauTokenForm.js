"use client"
import React from 'react';
import {updateTableauToken} from "@/utils/helpers/coeffectiveDatabaseInteraction";
import styles from "./styles.module.css"

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
            const updatedTableauToken = await updateTableauToken(newTableauUserFullName, newPersonalTableauTokenName, newPersonalTableauTokenValue)
            if (updatedTableauToken?.ok) {
                setStatus("success")
            } else {
                setStatus("error")
            }
        }}>
            <p>Si vous configurez votre token Tableau pour la première fois ou si vous souhaitez le re-configurer pour
                Coeffective, vous êtes au bon endroit !</p>
            <div className={styles.inputWrapper}>
                <label htmlFor="new-personal-token-name">Nom du token :<br/></label>
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

            <div className={styles.inputWrapper}>
                <label htmlFor="new-user-full-name">Confirmer votre nom d'utilisateur complet :<br/></label>
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
            <button>Valider</button>
        </form>
    )
}

export default TableauTokenForm;