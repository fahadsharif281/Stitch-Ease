import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import Login from '../pages/Auth/Login/Login'
import SignUp from '../pages/Auth/SignUp/SignUp'
const ApplicationRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={<LandingPage />} />
            </Routes>
        </div>
    )
}

export default ApplicationRoutes