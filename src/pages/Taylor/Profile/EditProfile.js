import React from 'react';
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg';
import Input from '../../../components/Input/Input';
import Select from 'react-select'
import { Button, Nav } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInputField from '../../../components/PhoneInput/PhoneInput';
import useFirebase from '../../../utils/hooks/useFirebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import classes from './EditProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/reducers/auth/authReducer';

const EditProfile = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { app } = useFirebase();
    const db = getFirestore(app);
    const documentRef = doc(db, 'users', user?.id)
    const formik = useFormik({
        initialValues: {
            address: user?.address || '',
            phone: `+${user?.phone}` || '',
            cnic: user?.cnic || '',
            bio: user?.bio || ''
        },
        validationSchema: Yup.object().shape({
            address: Yup.string().required('Required').min(5, 'Minium 5 characters required').max(50, 'Cannot exceed 50 characters'),
            phone: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            const updateUser = {
                ...user,
                address: values?.address,
                phone: values?.phone,
                cnic: values?.cnic,
                bio: values?.bio
            }
            setDoc(documentRef, updateUser);
            dispatch(setUser(updateUser));
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
                    isDisabled={true}
                    defaultValue={{ value: user?.role, label: user?.role }}
                />
                <Button type='submit' className={classes.submit}>Update</Button>
            </form>
        </div>
    )
}

export default EditProfile