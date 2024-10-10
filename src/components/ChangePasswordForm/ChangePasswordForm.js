"use client"
import React from 'react';
import {changePassword} from "@/app/(public)/login/change-password/actions";
import LoadingSpinner from "@/components/LoadingSpinner";

function ChangePasswordForm({formStyle, inputContainerStyle, buttonStyle}) {

    const [status, setStatus] = React.useState("idle")
    // valeurs possibles : idle, loading, success, error

    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault()
                setStatus("loading")
                const passwordField = document.getElementById("password");
                const passwordValue = passwordField.value
                await changePassword({
                    password: passwordValue,
                })
                setStatus("idle")
            }}
            className={formStyle}>
            {status !== "idle" && <LoadingSpinner/>}
            <div className={inputContainerStyle}>
                <label htmlFor="password">Mot de passe</label>
                <input id="password" name="password" type="password"
                       title="Le mot de passe doit contenir au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial."
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$"
                       placeholder="Ex : ********"
                       disabled={status !== "idle"}
                       required/>
            </div>
            <button className={buttonStyle} disabled={status !== "idle"}>Confirmer le mot de passe</button>
        </form>
    );
}

export default ChangePasswordForm;
