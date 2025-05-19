import React from 'react'
import Sidebar from '../admin/components/Sidebar'
import { Outlet } from 'react-router-dom'
import Appbar from '../admin/components/Appbar'

const AdminRoute = () => {
    return (
        <>
            <Sidebar >
                <Outlet />
            </Sidebar>
        </>
    )
}

export default AdminRoute