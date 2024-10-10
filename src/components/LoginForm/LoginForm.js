"use client"
import React from 'react';
import Link from "next/link";
import {login} from "@/app/(public)/login/actions";
import LoadingSpinner from "@/components/LoadingSpinner";

function LoginForm({ formStyle, inputContainerStyle, forgotPasswordStyle, buttonStyle }) {

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
                await login({
                    email: emailValue,
                    password: passwordValue,
                })
                setStatus("idle")
            }}
            className={formStyle}
        >
            {status !== "idle" && <LoadingSpinner/>}
            <div className={inputContainerStyle}>
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="Ex : dupont@exemple.com"
                       disabled={status !== "idle"} required/>
            </div>
            <div className={inputContainerStyle}>
                <label htmlFor="password">Mot de passe</label>
                <input id="password" name="password" type="password" placeholder="Ex : ********"
                       disabled={status !== "idle"} required/>
            </div>
            <Link className={forgotPasswordStyle} href="/login/forgot-password">Mot de passe oublié
                ?</Link>
            <button className={buttonStyle} disabled={status !== "idle"}>Se connecter</button>
        </form>
    );
}

export default LoginForm;
