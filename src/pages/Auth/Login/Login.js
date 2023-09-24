import React, { useEffect } from 'react';
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg';
import classes from './Login.module.scss';
import Input from '../../../components/Input/Input';
import Select from 'react-select'
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/reducers/auth/authReducer';

const Login = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            role: { value: 'Tailor', label: 'Tailor' }
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email')
                .required('Required'),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                )
        }),
        onSubmit: (values) => {
            console.log('values:', values)
            dispatch(setUser(values))
        }
    })
    const options = [
        { value: 'Tailor', label: 'Tailor' },
        { value: 'Customer', label: 'Customer' },
    ]

    useEffect(() => {
        dispatch(setUser(''))
    }, [])

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
                <Select
                    onChange={(e) => {
                        formik.setFieldValue('role', {
                            value: e.value,
                            label: e.label
                        })
                    }}
                    value={formik.values.role}
                    options={options} />
                <Button type='submit' className={classes.submit}>Log In</Button>
            </form>
        </div>
    )
}

export default Login