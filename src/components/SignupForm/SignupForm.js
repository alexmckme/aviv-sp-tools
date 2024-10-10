"use client"
import React from 'react';
import {signup} from "@/app/(public)/signup/actions";
import LoadingSpinner from "@/components/LoadingSpinner";

function SignupForm({formStyle, inputContainerStyle, buttonStyle}) {

    const [status, setStatus] = React.useState("idle")
    // valeurs possibles : idle, loading, success, error

    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault()
                setStatus("loading")
                const emailField = document.getElementById("email");
                const emailValue = emailField.value
                const passwordField = document.getElementById("password");
                const passwordValue = passwordField.value
                await signup({
                    email: emailValue,
                    password: passwordValue,
                })
                setStatus("idle")
            }}
            className={formStyle}>
            {status !== "idle" && <LoadingSpinner/>}
            <div className={inputContainerStyle}>
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="Ex : dupont@exemple.com"
                       disabled={status !== "idle"} required/>
            </div>
            <div className={inputContainerStyle}>
                <label htmlFor="password">Mot de passe</label>
                <input id="password" name="password" type="password"
                       title="Le mot de passe doit contenir au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial."
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$"
                       placeholder="Ex : ********" disabled={status !== "idle"} required/>
            </div>
            <button className={buttonStyle} disabled={status !== "idle"}>S'inscrire</button>
        </form>
    );
}

export default SignupForm;
