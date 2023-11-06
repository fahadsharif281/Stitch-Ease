import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import Login from '../pages/Auth/Login/Login'
import SignUp from '../pages/Auth/SignUp/SignUp'
import ProtectedRoute from './protected'
import HomeTaylor from '../pages/Taylor/Home/HomeTaylor'
import { TaylorLayout } from '../layouts/Taylor/TaylorLayout'
import OrderTaylor from '../pages/Taylor/Orders/OrderTaylor'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaylorDetail from '../pages/Taylor/Details/TaylorDetail'

const ApplicationRoutes = () => {

    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<TaylorLayout />}>
                        <Route path='/tailor/home' element={<HomeTaylor />} />
                        <Route path='/tailor/orders' element={<OrderTaylor />} />
                        <Route path='/tailor/home/detail' element={<TaylorDetail />} />
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