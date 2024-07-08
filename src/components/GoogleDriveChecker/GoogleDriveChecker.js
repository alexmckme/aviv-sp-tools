import React from 'react';
import { createClient } from '@/utils/supabase/server'
import { checkAndCreateDriveFolder } from "@/utils/helpers/googleInteraction";




async function GoogleDriveChecker() {
  const supabase = createClient()

  async function getUserEmail(supabaseClient) {
    const {data, error} = await supabaseClient.auth.getUser()
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

  async function addCoeffectiveUser(supabaseClient, userDataObjToAdd, driveIdToAdd) {
    const { error } = await supabaseClient
        .from("coeffective_users")
        .insert({
          id: userDataObjToAdd.id,
          email: userDataObjToAdd.email,
          drive_id: driveIdToAdd
        })

    if (error) {
      console.error(error)
    }
  }

  const currentUserData = await getUserEmail(supabase)
  const currentUserEmail = currentUserData.email

  const {data,error} = await supabase
      .from("coeffective_users")
      .select("*")
      .eq("email", currentUserEmail)

  if (error) {
    console.error(error)
  } else if (data[0] === undefined) {
    const newDriveId = await checkAndCreateDriveFolder(currentUserEmail)
    const addUserToTable = await addCoeffectiveUser(supabase, currentUserData, newDriveId)
    console.log(`Successfully created and shared folder to ${currentUserEmail}, ID ${newDriveId}`)
  } else if (data[0]) {
    console.log("User's drive was already created")
  }

  return <></>;
}

export default GoogleDriveChecker;
