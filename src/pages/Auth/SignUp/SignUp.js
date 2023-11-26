import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg';
import classes from './SignUp.module.scss';
import Input from '../../../components/Input/Input';
import Select from 'react-select'
import { Button, Nav } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInputField from '../../../components/PhoneInput/PhoneInput';
import { useNavigate } from 'react-router-dom';
import useFirebase from '../../../utils/hooks/useFirebase';
import { collection, getFirestore, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const SignUp = () => {
    const navigate = useNavigate();
    const { signUpWithEmailAndPassword, app } = useFirebase();
    const db = getFirestore(app);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            phone: '',
            role: { value: 'Tailor', label: 'Tailor' },
            cnic: '',
            fullName: '',
            bio: ''
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
            phone: Yup.string().required('Required'),
            cnic: Yup.string().required('Required'),
            fullName: Yup.string().required('Required'),
            bio: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            signUpWithEmailAndPassword(values.email, values.password).then((res) => {
                const userCollection = collection(db, "users");
                const userDocRef = doc(userCollection, res.user.uid); // Assuming 'res.user.uid' holds the UID
                setDoc(userDocRef, {
                    email: res.user.email,
                    address: values.address,
                    cnic: values.cnic,
                    phone: values.phone,
                    role: values.role.value,
                    name: values.fullName,
                    bio: values.bio
                })
                toast.success("User Registered Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                navigate('/login')
            }).catch((error) => {
                toast.error(`(${error.message.split('/')[1]}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
        }
    })
    const options = [
        { value: 'Tailor', label: 'Tailor' },
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
                <Input
                    label={'Full Name'}
                    type='text'
                    placeholder='John Alex'
                    value={formik.values.fullName}
                    onChange={formik.handleChange('fullName')}
                    onBlur={formik.handleBlur('fullName')}
                    error={formik.touched.fullName && formik.errors.fullName && formik.errors.fullName}
                />
                {formik.values.role.value === 'Tailor' &&
                    <>
                        <Input
                            label={'CNIC'}
                            type='text'
                            placeholder='####-######-#'
                            value={formik.values.cnic}
                            onChange={formik.handleChange('cnic')}
                            onBlur={formik.handleBlur('cnic')}
                            error={formik.touched.cnic && formik.errors.cnic && formik.errors.cnic}
                        />
                        <Input
                            label={'Add Bio'}
                            as="textarea"
                            rows={3}
                            value={formik.values.bio}
                            onChange={formik.handleChange('bio')}
                            onBlur={formik.handleBlur('bio')}
                            error={formik.touched.bio && formik.errors.bio && formik.errors.bio}
                        />
                    </>
                }

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