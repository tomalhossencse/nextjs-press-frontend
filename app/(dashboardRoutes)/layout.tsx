import { Navbar } from '@/components/shared/navbar'
import React from 'react'
import { getMe } from '../../services/getMe';

const DashboardLayout = async (
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

export default DashboardLayout
