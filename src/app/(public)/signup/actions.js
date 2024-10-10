'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData?.email,
        password: formData?.password,
        options: {
            emailRedirectTo: 'https://aviv-sp-tools.vercel.app/signup/welcome'
        }
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        if (error.code === "user_already_exists") {
            redirect("/signup/?error=true&type=existing-user")
        } else if (error.code === "weak_password") {
            redirect("/signup/?error=true&type=weak-password")
        } else {
            console.error(error)
            redirect('/signup/?error=true')
        }
    }

    revalidatePath('/', 'layout')
    redirect('/signup/confirm')
}