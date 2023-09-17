import React from 'react'
import { Form } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import classes from './PhoneInput.module.scss'


const PhoneInputField = ({ label, error, ...props }) => {
    return (
        <div className={classes.container}>
            {label && <Form.Label>{label}</Form.Label>}
            <PhoneInput
                {...props}
            />
            {error &&
                <Form.Text>
                    {error}
                </Form.Text>
            }
        </div>
    )
}

export default PhoneInputField