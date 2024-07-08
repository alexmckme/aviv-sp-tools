"use server"
import { createClient } from '@/utils/supabase/server'


export async function getUserData() {
    const supabase = createClient()

    const {data, error} = await supabase.auth.getUser()
    if (error) {
        console.error(error)
    }
    if (data) {
        const currentUserData = {
            email: data.user.email,
            id: data.user.id
        }
        return currentUserData
    }
}


export async function retrieveDriveId() {
    const supabase = createClient()
    const userData = await getUserData()

    const {data,error} = await supabase
        .from("coeffective_users")
        .select("*")
        .eq("email", userData.email)

    if (error) {
        console.error(error)
    }

    if (data) {
        return (data[0].drive_id)
    }
}


export async function createNewCoeffectiveExtractSF(chosenSystem, salesforceReportId, gsheetId, ongletId, frequency, startingHour, endingHour) {
    const supabase = createClient()
    const userData = await getUserData()

    const newExtractData = {
        extract_type: chosenSystem,
        report_id: salesforceReportId,
        gsheet_id: gsheetId,
        onglet_id: ongletId,
        frequency: frequency,
        starting_hour: startingHour,
        ending_hour: endingHour,
        user_id: userData.id
    }

    const { data, error } = await supabase
        .from("coeffective_extracts")
        .insert(newExtractData)
        .select()

    if (error) {
        console.error(error)
    }

    if (data) {
        return {
            data: data,
            ok: true
        }
    }
}

export async function storeUpdateTabId(gsheetId, majTabId) {
    const supabase = createClient()
    const userData = await getUserData()
    const majTabData = {
        gsheet_id: gsheetId,
        updatetab_id: majTabId,
        user_id: userData.id
    }

    const { data, error } = await supabase
        .from("coeffective_updatetabs")
        .insert(majTabData)

    if (error) {
        console.error(error)
    }

    if (data) {
        console.log(data)
    }

}