import { Navbar } from '@/components/shared/navbar'
import React from 'react'
import { getMe } from './_services/getMe';

const PublicLayout = async (
    { children }: { children: React.ReactNode }
) => {
    const user = await getMe();
    return (
        <>
            <Navbar user={user} />
            {children}
        </>
    )
}

export default PublicLayout
