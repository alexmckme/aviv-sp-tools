"use client"
import React from 'react';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

function LogOutButton() {
    const supabase = createClient()

    const router = useRouter();

    async function logOut() {
        const { error } = await supabase.auth.signOut()
        router.push("/login")
    }

    return (
        <button onClick={logOut}>
            Se déconnecter
        </button>);
}

export default LogOutButton;
