import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeTaylor from '../../pages/Taylor/Home/HomeTaylor'
import { TaylorLayout } from '../../layouts/Taylor/TaylorLayout'
import ProtectedRoute from '../protected'

const TaylorRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route index path='/taylor' element={<HomeTaylor />} />
            </Route>
        </Routes>
    )
}

export default TaylorRoutes