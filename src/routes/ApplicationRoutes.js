import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import Login from '../pages/Auth/Login/Login'
import SignUp from '../pages/Auth/SignUp/SignUp'
import ProtectedRoute from './protected'
import HomeTaylor from '../pages/Taylor/Home/HomeTaylor'
import { Layout } from '../layouts/Layout'
import OrderTaylor from '../pages/Taylor/Orders/OrderTaylor'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaylorDetail from '../pages/Taylor/Details/TaylorDetail'
import EditProfile from '../pages/Taylor/Profile/EditProfile'
import OrderDetails from '../pages/Taylor/Orders/OrderDetails/OrderDetails'
import HomeCustomer from '../pages/Customer/Home/HomeCustomer'
import SelectTailor from '../pages/Customer/SelectTailor/SelectTailor'
import CustomerOrders from '../pages/Customer/Orders/CustomerOrders'
import Profile from '../pages/Taylor/Profile/Profile'
import Cart from '../pages/Customer/Cart/Cart'

const ApplicationRoutes = () => {

    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path='/tailor/home' element={<HomeTaylor />} />
                        <Route path='/tailor/profile' element={<Profile />} />
                        <Route path='/tailor/orders' element={<OrderTaylor />} />
                        <Route path='/tailor/home/detail/:id' element={<TaylorDetail />} />
                        <Route path='/tailor/orders/detail/:id' element={<OrderDetails />} />
                        <Route path='/tailor/update-profile' element={<EditProfile />} />
                        <Route path='/customer/home' element={<HomeCustomer />} />
                        <Route path='/customer/profile' element={<EditProfile />} />
                        <Route path='/customer/orders' element={<CustomerOrders />} />
                        <Route path='/customer/cart' element={<Cart />} />
                        <Route path='/customer/home/tailor-detail/:id' element={<SelectTailor />} />
                        <Route path='/customer/orders/detail/:id' element={<OrderDetails />} />
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