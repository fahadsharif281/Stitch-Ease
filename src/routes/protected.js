import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = () => {
    const { user } = useSelector(state => state.auth)
    console.log('user:', user)
    return (
        <div>
            {user ? <Outlet /> : <Navigate replace to='/' />}
        </div>
    )
}

export default ProtectedRoute