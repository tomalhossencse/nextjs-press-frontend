import { Navbar } from '@/components/shared/navbar'
import React from 'react'
import { getMe } from './_services/getMe';

const AuthLayout = async (
    { children }: { children: React.ReactNode }
) => {
    const user = await getMe();
    return (
        <div className='bg-emerald-100/30'>
            <Navbar user={user} />
            <div className='max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
