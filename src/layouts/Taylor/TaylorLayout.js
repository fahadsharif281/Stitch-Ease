import React from 'react';
import classes from './Taylor.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/images/jpeg/stitch_logo.jpeg';
import home from '../../assets/images/png/home.png';
import logout from '../../assets/images/png/logout.png';
import orders from '../../assets/images/png/orders.png';
import { Nav } from 'react-bootstrap';
import Input from '../../components/Input/Input';
export const TaylorLayout = () => {
    let items = [
        {
            name: 'Home',
            src: home,
            key: 'Home',
            to: '/tailor/home'
        },
        {
            name: 'Orders',
            src: orders,
            key: 'Favorite',
            to: '/tailor/orders'
        }
    ]
    return (
        <div className={classes.container}>
            <div className={classes.side_bar}>
                <div className={classes.image_container}>
                    <img src={logo} width='200px' /></div>
                <div className={classes.items}>
                    {items.map((item) => {
                        return (
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? classes.item_active : classes.item
                                }>
                                <img src={item.src} width='23px' height='23px' />
                                <div className={classes.link}>{item.name}</div>
                            </NavLink>
                        )
                    })}

                    <Nav.Item className={classes.item}>
                        <img src={logout} width='23px' height='23px' />
                        <Nav.Link className={classes.link} eventKey="2" title="Item">
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.search_bar}>
                    <Input
                        type='text'
                        placeholder='Search ...'
                    />
                </div>
                <div className={classes.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
