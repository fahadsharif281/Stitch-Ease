import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './Input.module.scss'

const Input = ({ labelClassName, label, error, ...props }) => {
    return (
        <div className={classes.container}>
            {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
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