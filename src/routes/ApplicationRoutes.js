import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import Login from '../pages/Auth/Login/Login'
import SignUp from '../pages/Auth/SignUp/SignUp'
import { useSelector } from 'react-redux'
import TaylorRoutes from './TaylorRoutes/TaylorRoutes'
import CustomerRoutes from './CustomerRoutes/CustomerRoutes'
import ProtectedRoute from './protected'

const ApplicationRoutes = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <div>
            <Routes>
                <Route element={<ProtectedRoute />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={<LandingPage />} />
            </Routes>
        </div>
    )
}

export default ApplicationRoutes