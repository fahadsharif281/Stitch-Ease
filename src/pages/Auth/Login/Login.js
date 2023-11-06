import React, { useEffect } from 'react';
import logo from '../../../assets/images/jpeg/stitch_logo.jpeg';
import classes from './Login.module.scss';
import Input from '../../../components/Input/Input';
import Select from 'react-select'
import { Button, Nav } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/reducers/auth/authReducer';
import { useNavigate } from 'react-router-dom';
import useFirebase from '../../../utils/hooks/useFirebase';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';


const Login = () => {
    const { user } = useSelector(state => state.auth);
    const { loginWithEmailAndPassword, app } = useFirebase();
    const db = getFirestore(app);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
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
        onSubmit: async (values) => {
            loginWithEmailAndPassword(values.email, values.password).then((response) => {
                getDoc(doc(db, "users", response.user.uid)).then((res) => {
                    toast.success("Login Successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                    dispatch(setUser(res?.data()))
                    navigate('/tailor/home')
                }).catch((error) => {
                    console.log('error handling:', error)
                });
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

    useEffect(() => {
        if (user?.role.value === 'Tailor') {
            navigate('/tailor/home');
        } else
            if (user?.role.value === 'Customer') {
                navigate('/customer/home')
            }
            else { }
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
                <Button type='submit' className={classes.submit}>Log In</Button>
                <Nav.Link className={classes.new_user} onClick={() => navigate('/signup')}>Register New User?</Nav.Link>
            </form>
        </div>
    )
}

export default Login