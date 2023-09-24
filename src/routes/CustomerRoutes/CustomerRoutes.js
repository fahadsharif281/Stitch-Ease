import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../protected'
import HomeCustomer from '../../pages/Customer/HomeCustomer/HomeCustomer'

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route index path='/customer' element={<HomeCustomer />} />
            </Route>
        </Routes>
    )
}

export default CustomerRoutes