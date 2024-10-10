'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function changePassword(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        password: formData?.password
    }

    const { error } = await supabase.auth.updateUser(data)

    if (error) {
        console.error(error)
        redirect('/login/change-password/?error=true')
    }

    revalidatePath('/', 'layout')
    redirect('/login/change-password/confirm')
}