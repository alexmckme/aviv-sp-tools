import React from "react"
import {retrieveDriveId} from "@/utils/helpers/coeffectiveDatabaseInteraction";

const userDriveId = await retrieveDriveId()

export default function SharedDrivePage() {
    return (
        <>
            <p>Un dossier partagé a été créé et vous a été partagé. Voici le lien pour y accéder :</p>
            <p><a href={`https://drive.google.com/drive/folders/${userDriveId}`}>ICI</a></p>
        </>
    )
}