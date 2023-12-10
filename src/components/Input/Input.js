import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './Input.module.scss'

const Input = ({ containerClassName, labelClassName, label, error, ...props }) => {
    let containerClass = classes.container;
    if (containerClassName) {
        containerClass = `${containerClass} ${containerClassName}`
    }
    return (
        <div className={containerClass}>
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