import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './Input.module.scss'

const Input = ({ label, error, ...props }) => {
    return (
        <div className={classes.container}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
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

export default Input