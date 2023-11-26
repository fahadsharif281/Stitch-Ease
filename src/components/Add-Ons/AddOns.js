import React, { useEffect } from 'react'
import Input from '../Input/Input'
import { useFormik } from 'formik'
import { Button } from 'react-bootstrap'
import classes from './AddOns.module.scss';
import * as Yup from 'yup';
import useFirebase from '../../utils/hooks/useFirebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/reducers/auth/authReducer';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
const AddOns = ({ handleShow }) => {
    const { user } = useSelector(state => state.auth);
    const { app } = useFirebase();
    const storage = getStorage();
    const db = getFirestore(app);
    const documentRef = doc(db, 'users', user?.id)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            title: '',
            price: '',
            description: '',
            image: ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required('Required'),
            price: Yup.string()
                .required('Required'),
            description: Yup.string()
                .required('Required'),
        }),
        onSubmit: async (values) => {
            let portFolio = [];
            if (user?.portFolio) {
                portFolio = [...user?.portFolio]
            }
            if (!!values.image) {
                const storageRef = ref(storage, `${user?.id}/${values.image.name}`);
                uploadBytes(storageRef, values.image);
            }
            portFolio.push({
                title: values.title,
                price: values.price,
                description: values.description,
            })
            const updateUser = {
                ...user,
                portFolio: portFolio
            }
            setDoc(documentRef, updateUser);
            dispatch(setUser(updateUser));
            handleShow();
        }
    })

    return (
        <div className={classes.container}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e)
                }}
            >
                <Input
                    label={'Title'}
                    type='text'
                    placeholder=''
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    error={formik.touched.title && formik.errors.title && formik.errors.title}
                />
                <Input
                    label={'Price'}
                    type='number'
                    placeholder=''
                    value={formik.values.price}
                    onChange={formik.handleChange('price')}
                    onBlur={formik.handleBlur('price')}
                    error={formik.touched.price && formik.errors.price && formik.errors.price}
                />
                <Input
                    label={'Description'}
                    as="textarea"
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    error={formik.touched.description && formik.errors.description && formik.errors.description}
                />
                <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => { formik.setFieldValue('image', e.target.files[0]) }}
                />
                <Button type='submit' className={classes.submit}>Submit</Button>
            </form>
        </div>
    )
}

export default AddOns