'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        options: {
            emailRedirectTo: 'https://aviv-sp-tools.vercel.app/signup/welcome'
        }
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        if (error.code === "user_already_exists") {
            redirect("/signup/?error=true&type=existing-user")
        } else {
            redirect('/signup/?error=true')
        }
    }

    revalidatePath('/', 'layout')
    redirect('/signup/confirm')
}