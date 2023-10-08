import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import Login from '../pages/Auth/Login/Login'
import SignUp from '../pages/Auth/SignUp/SignUp'
import { useSelector } from 'react-redux'
import ProtectedRoute from './protected'
import HomeTaylor from '../pages/Taylor/Home/HomeTaylor'
import { TaylorLayout } from '../layouts/Taylor/TaylorLayout'
import OrderTaylor from '../pages/Taylor/Orders/OrderTaylor'

const ApplicationRoutes = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <div>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<TaylorLayout />}>
                        <Route path='/tailor/home' element={<HomeTaylor />} />
                        <Route path='/tailor/orders' element={<OrderTaylor />} />
                    </Route>
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={<LandingPage />} />
            </Routes>
        </div>
    )
}

export default ApplicationRoutes