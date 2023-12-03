import React, { useState } from 'react';
import classes from './Layout.module.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/images/jpeg/stitch_logo.jpeg';
import home from '../assets/images/png/home.png';
import logout from '../assets/images/png/logout.png';
import orders from '../assets/images/png/orders.png';
import userImage from '../assets/images/png/user.png';
import shoppingCart from '../assets/images/png/shopping-cart.png';
import { Button, Nav } from 'react-bootstrap';
import Input from '../components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/reducers/auth/authReducer';
import { Avatar, MenuItem, Badge } from '@mui/material';
import { setTailors } from '../redux/reducers/taylor/taylorReducer';
import { setCart } from '../redux/reducers/customer/cart';
export const Layout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.cart)
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    let items = [];
    let tailorItems = [
        {
            name: 'Home',
            src: home,
            key: 'Home',
            to: '/tailor/home'
        },
        {
            name: 'Orders',
            src: orders,
            key: 'Orders',
            to: '/tailor/orders',
            badge: !!user?.orders?.length && user?.orders?.length
        },
        {
            name: 'Profile',
            src: userImage,
            key: 'Profile',
            to: '/tailor/profile',
        },
    ]
    let customerItems = [
        {
            name: 'Home',
            src: home,
            key: 'Home',
            to: '/customer/home'
        },
        {
            name: 'Orders',
            src: orders,
            key: 'Favorite',
            to: '/customer/orders',
            badge: !!user?.orders?.length && user?.orders?.length
        }
    ]
    if (user?.role === 'Tailor') {
        items = [...tailorItems];
    }
    if (user?.role === 'Customer') {
        items = [...customerItems];
    }

    const handleClick = () => {
        setOpenMenu(!openMenu)
    }
    const handleSelect = () => {
        setOpenMenu(!openMenu);
        { user?.role === 'Tailor' && navigate('/tailor/update-profile') }
        { user?.role === 'Customer' && navigate('/customer/profile') }
    }

    const handleLogoNavigate = () => {
        if (user?.role === 'Tailor') {
            navigate('/tailor/home')
        }
        else {
            navigate('/customer/home')
        }
    }

    return (
        <div className={classes.container}>
            <div className={user?.role === 'Tailor' ? classes.tailor_side_bar : classes.customer_side_bar}>
                <div className={classes.image_container}>
                    <img onClick={handleLogoNavigate} src={logo} width='300px' /></div>
                <div className={classes.items}>
                    {items.map((item) => {
                        return (
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? classes.item_active : classes.item
                                }>
                                {item?.badge &&
                                    <Badge badgeContent={item?.badge} color='primary' />
                                }
                                <img src={item.src} width='23px' height='23px' />
                                <div className={classes.link}>{item.name}</div>
                            </NavLink>
                        )
                    })}

                    <Nav.Item onClick={() => {
                        dispatch(setUser(undefined));
                        dispatch(setTailors(undefined));
                        dispatch(setCart(undefined));
                        navigate('/login')

                    }} className={classes.item}>
                        <img src={logout} width='23px' height='23px' />
                        <Nav.Link className={classes.link} eventKey="2" title="Item">
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.header_flex}>
                    <div className={classes.search_bar}>
                        <Input
                            type='text'
                            placeholder='Search ...'
                        />
                    </div>
                    {user?.role === 'Tailor' &&
                        <>
                            {!user?.portFolio?.length && <Button disabled className={classes.not_verified}>not verified</Button>}
                            {!!user?.portFolio?.length && <Button disabled className={classes.verified}>verified</Button>}
                        </>

                    }
                    {user?.role === 'Customer' &&
                        <div onClick={() => navigate('/customer/cart')} className={classes.cart}>
                            <Badge badgeContent={cart ? 1 : 0} color='primary' />
                            <img width='35px' src={shoppingCart} />
                        </div>
                    }
                    <div className={classes.profile}>
                        <Avatar onClick={handleClick} className={classes.avatar}>{user?.name[0].toUpperCase()}</Avatar>
                        <div className={openMenu ? classes.open_menu : classes.close_menu}>
                            <MenuItem onClick={handleSelect}>Edit Profile</MenuItem>
                        </div>
                    </div>

                </div>
                <div className={classes.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
