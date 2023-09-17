import React from 'react'
import classes from './Footer.module.scss';
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg'
import facebook from '../../../assets/images/png/facebook (1).png'
import twiitter from '../../../assets/images/png/twitter.png'
import instagram from '../../../assets/images/png/instagram.png'
import { Nav, Form, Button } from 'react-bootstrap';


export const Footer = () => {
    return (
        <div className={classes.container}>
            <div>
                <div>
                    <img src={logo} width='150px' />
                </div>
                <div className={classes.social_links}>
                    <img src={facebook} width='30px' />
                    <img src={instagram} width='30px' />
                    <img src={twiitter} width='30px' />
                </div>
            </div>
            <div>
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#">FAQ</Nav.Link>
                <Nav.Link href="#">ContactUs</Nav.Link>
                <Nav.Link href="#aboutUs">About Us</Nav.Link>
            </div>
            <div>
                Copyrights || © 2023
                Stitch Ease
            </div>
            <div>
                <form>
                    <Form.Label>Subscribe</Form.Label>
                    <Form.Control type="email" placeholder="Your email" />
                    <Button className={classes.submit_button} type='button'>Submit</Button>
                </form>
            </div>
        </div>
    )
}
