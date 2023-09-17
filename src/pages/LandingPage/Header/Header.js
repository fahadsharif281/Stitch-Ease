import React from 'react'
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg';
import classes from './Header.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    return (
        <div className={classes.container}>
            <img src={logo} width='150px' />
            <div className={classes.linkContainer}>
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#aboutUs">About Us</Nav.Link>
                <Button onClick={() => navigate('/login')}>Log In</Button>
                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
            </div>
        </div>
    )
}
