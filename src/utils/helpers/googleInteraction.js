"use server"
import {createClient} from "@/utils/supabase/server";

const { google } = require("googleapis")
import {getUserData, storeUpdateTabId} from "./coeffectiveDatabaseInteraction"

const googleCreds = process.env.GOOGLE_COEFFECTIVE1_CREDS
const parsedGoogleCreds = googleCreds ? JSON.parse(googleCreds) : undefined

const SCOPE = ['https://www.googleapis.com/auth/drive']


export async function authorize() {
    const jwtClient = new google.auth.JWT(
        parsedGoogleCreds.client_email,
        null,
        parsedGoogleCreds.private_key,
        SCOPE
    )
    await jwtClient.authorize()
    return jwtClient
}


export async function createFolder(jwtClient, userEmail) {
    const drive = google.drive({version: 'v3', auth: jwtClient})

    const fileMetaData = {
        name: userEmail,
        parents: ["1nLt4OYfSnz5pCKYFOovkg02PaWHotqLB"],
        mimeType: "application/vnd.google-apps.folder",
    }

    const result = await drive.files
        .create({
            fields: "id",
            resource: fileMetaData
        })
        .catch(err => console.log(err))

    // retourne l'id du nouveau dossier
    return result.data.id
}


export async function shareFolder(jwtClient, userEmail, folderId) {
    const drive = google.drive({version: 'v3', auth: jwtClient})
    const permission =
        {
            type: 'user',
            role: 'writer',
            emailAddress: userEmail, // 'user@partner.com',
        }

    try {
        const result = await drive.permissions.create({
            resource: permission,
            fileId: folderId,
            fields: "id"
        })
        console.log("Successfully added permission: folder ID", folderId)
        return folderId
    } catch (error) {
        console.error(error)
    }
}

// La fonction suivante ne peut pas être utilisé dans un Client Component
export async function checkAndCreateDriveFolder(userEmail) {
    const autorisation = await authorize()
    const dossierId = await createFolder(autorisation, userEmail)
    const partagedDossierId = await shareFolder(autorisation, userEmail, dossierId)
    return partagedDossierId
}

export async function retrieveFilesFromFolder(folderId) {
    const autorisation = await authorize()
    const drive = google.drive({version: 'v3', auth: autorisation})
    const files = []

    try {
        const res = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.spreadsheet' and parents='${folderId}'`,
            spaces: "drive"
        });
        Array.prototype.push.apply(files, res.files)
        res.data.files.forEach(function(file) {
            console.log("found file:", file.name, file.id)
        })
        console.log("RES:", res.data.files)
        return res.data.files
    } catch (err) {
        throw err
    }
}

export async function createNewGoogleSheet(fileName, driveId) {
    const autorisation = await authorize()
    const drive = google.drive({version: 'v3', auth: autorisation})

    const fileMetaData = {
        name: fileName,
        parents: [driveId],
        mimeType: "application/vnd.google-apps.spreadsheet"
    }

    try {
        const res = await drive.files
            .create({
            resource: fileMetaData,
        })

        const gsheet = google.sheets({version: "v4", auth: autorisation})
        const res_update_locale = await gsheet.spreadsheets.batchUpdate({
            spreadsheetId: res.data.id,
            requestBody: {
                requests: [{
                    updateSpreadsheetProperties: {
                        properties: {
                            locale: "fr_FR"
                        },
                        fields: "locale"
                    }
                }]
            }
        })

        console.log("New spreadsheet created")
        const majTabId = await createNewTab(res.data.id, ">> Infos Màj Extracts <<")
        console.log("New tab created")
        const storeMajTab = await storeUpdateTabId(res.data.id, majTabId)
        return {
            gsheetId: res.data.id,
            majTabId: majTabId
        }
    } catch (err) {
        throw(err)
    }
}





export async function createNewTab(fileId, newTabName) {
    const autorisation = await authorize()
    const gsheet = google.sheets({version: "v4", auth: autorisation})

    const fileMetaData = {
        spreadsheetId: fileId
    }

    try {
        const res = await gsheet.spreadsheets.batchUpdate({
            spreadsheetId: fileMetaData.spreadsheetId,
            requestBody: {
                requests: [{
                    addSheet: {
                        properties: {
                            title: newTabName,
                        }
                    }
                }]
            }
        })
        const newSheetId = res.data.replies[0].addSheet.properties.sheetId
        return newSheetId
    } catch (err) {
        throw(err)
    }
}

export async function getListOfGsheets() {
    const supabase = createClient()
    const currentUserData = await getUserData()

    const { data, error } = await supabase
        .from("coeffective_users")
        .select("drive_id")
        .eq("id", currentUserData.id)

    const currentUserDriveId = data[0].drive_id

    const listOfFiles = await retrieveFilesFromFolder(currentUserDriveId)
    return listOfFiles

}


