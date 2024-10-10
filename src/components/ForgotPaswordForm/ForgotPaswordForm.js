"use client"

import React from 'react';
import {recoverPassword} from "@/app/(public)/login/forgot-password/actions";
import LoadingSpinner from "@/components/LoadingSpinner";

function ForgotPaswordForm({formStyle, inputContainerStyle, buttonStyle}) {

  const [status, setStatus] = React.useState("idle")
  // valeurs possibles : idle, loading, success, error

  return (
      <form
          onSubmit={async (event) => {
            event.preventDefault()
            setStatus("loading")
            const emailField = document.getElementById("email");
            const emailValue = emailField.value
            await recoverPassword({
              email: emailValue,
            })
            setStatus("idle")
          }}
          className={formStyle}>
        {status !== "idle" && <LoadingSpinner/>}
        <div className={inputContainerStyle}>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" placeholder="Ex : dupont@exemple.com" disabled={status !== "idle"} required/>
        </div>
        <button className={buttonStyle} disabled={status !== "idle"}>Obtenir un lien de connexion</button>
      </form>
  );
}

export default ForgotPaswordForm;
