'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function recoverPassword(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {redirectTo: "https://aviv-sp-tools.vercel.app/login/change-password"}
    )

    if (error) {
        console.error(error)
        redirect('/error')
    }

    revalidatePath('/login/change-password', 'layout')
    redirect('/login/forgot-password/confirm')
}