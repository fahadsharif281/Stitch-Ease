import React from 'react'
import classes from './ContactUs.module.scss'
import { Form } from 'react-bootstrap'
import contact_us_image from '../../../assets/images/jpeg/contact_us.jpeg'


export const ContactUs = () => {
    return (
        <div className={classes.container}>
            <img src={contact_us_image} width='100%' height='700px' />
        </div>
    )
}
