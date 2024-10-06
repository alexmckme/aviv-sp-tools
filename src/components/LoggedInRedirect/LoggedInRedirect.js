import React from 'react';
import { createClient } from '@/utils/supabase/server'
import {redirect} from "next/navigation";

async function LoggedInRedirect() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (data.user) {
    redirect("/main")
  }

  return (
      <></>
  )

}

export default LoggedInRedirect;
