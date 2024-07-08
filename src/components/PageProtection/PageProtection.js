import React from 'react';
import { createClient } from '@/utils/supabase/server'
import {redirect} from "next/navigation";

async function PageProtection() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  return (
      <></>
  )
}

export default PageProtection;
