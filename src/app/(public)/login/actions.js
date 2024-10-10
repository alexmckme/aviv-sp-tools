'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData?.email,
        password: formData?.password
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        if (error.code === 'invalid_credentials') {
            redirect('/login/?error=true&type=credentials')
        } else {
            redirect('/login/?error=true')
        }
    }

    revalidatePath('/', 'layout')
    redirect('/main')
}