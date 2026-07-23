import React from 'react'

const DashboardLayout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className='bg-emerald-100/30'>
            <div className='max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
