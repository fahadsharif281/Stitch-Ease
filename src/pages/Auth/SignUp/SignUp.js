import React from 'react';
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg';
import classes from './SignUp.module.scss';
import Input from '../../../components/Input/Input';
import Select from 'react-select'
import { Button, Nav } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInputField from '../../../components/PhoneInput/PhoneInput';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            phone: '',
            role: { value: 'Taylor', label: 'Taylor' }
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email')
                .required('Required'),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
            confirmPassword: Yup.string().required('Required')
                .oneOf([Yup.ref('password'), null], 'Confirm password must match with password'),
            address: Yup.string().required('Required').min(5, 'Minium 5 characters required').max(50, 'Cannot exceed 50 characters'),
            phone: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log('values:', values);
            navigate('/login')
        }
    })
    const options = [
        { value: 'Taylor', label: 'Taylor' },
        { value: 'Customer', label: 'Customer' },
    ]

    return (
        <div className={classes.container}>
            <form onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e)
            }} className={classes.form}>
                <img src={logo} width='300px' />
                <Input
                    label={'Email'}
                    type='text'
                    placeholder='your email'
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    error={formik.touched.email && formik.errors.email && formik.errors.email}
                />
                <Input
                    label={'Password'}
                    type='password'
                    placeholder='...'
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    error={formik.touched.password && formik.errors.password && formik.errors.password}
                />
                <Input
                    label={'Confirm Password'}
                    type='password'
                    placeholder='...'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange('confirmPassword')}
                    onBlur={formik.handleBlur('confirmPassword')}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword && formik.errors.confirmPassword}
                />
                <Input
                    label={'Address'}
                    type='text'
                    placeholder='H#832 street 1 block abc'
                    value={formik.values.address}
                    onChange={formik.handleChange('address')}
                    onBlur={formik.handleBlur('address')}
                    error={formik.touched.address && formik.errors.address && formik.errors.address}
                />

                <PhoneInputField
                    label={'Phone'}
                    country={'pk'}
                    value={formik.values.phone}
                    onChange={(phone) => formik.setFieldValue('phone', phone)}
                    onBlur={formik.handleBlur('phone')}
                    error={formik.touched.phone && formik.errors.phone && formik.errors.phone}
                />
                <Select
                    onChange={(e) => {
                        formik.setFieldValue('role', {
                            value: e.value,
                            label: e.label
                        })
                    }}
                    value={formik.values.role}
                    options={options} />
                <Nav.Link className={classes.already_member} onClick={() => navigate('/login')}>Already a member?</Nav.Link>
                <Button type='submit' className={classes.submit}>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp