import React from 'react';
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg';
import Input from '../../../components/Input/Input';
import Select from 'react-select'
import { Button, Nav } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInputField from '../../../components/PhoneInput/PhoneInput';
import { useNavigate } from 'react-router-dom';
import useFirebase from '../../../utils/hooks/useFirebase';
import { getFirestore } from 'firebase/firestore';
import classes from './EditProfile.module.scss';
import { useSelector } from 'react-redux';

const EditProfile = () => {
    const { signUpWithEmailAndPassword, app } = useFirebase();
    const db = getFirestore(app);
    const { user } = useSelector(state => state.auth)
    const formik = useFormik({
        initialValues: {
            address: user?.address || '',
            phone: `+${user?.phone}` || '',
            cnic: user?.cnic || '',
        },
        validationSchema: Yup.object().shape({
            address: Yup.string().required('Required').min(5, 'Minium 5 characters required').max(50, 'Cannot exceed 50 characters'),
            phone: Yup.string().required('Required'),
            cnic: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    })

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
                    disabled
                    value={user?.email}
                />
                <Input
                    label={'Full Name'}
                    type='text'
                    placeholder='John Alex'
                    disabled
                    value={user?.name}
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
                {user?.role === 'Tailor' &&
                    <Input
                        label={'CNIC'}
                        type='text'
                        placeholder='####-######-#'
                        value={formik.values.cnic}
                        onChange={formik.handleChange('cnic')}
                        onBlur={formik.handleBlur('cnic')}
                        error={formik.touched.cnic && formik.errors.cnic && formik.errors.cnic}
                    />
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
                    isDisabled={true}
                    defaultValue={{ value: user?.role, label: user?.role }}
                />
                <Button type='submit' className={classes.submit}>Update</Button>
            </form>
        </div>
    )
}

export default EditProfile