import React from 'react';
import classes from './Cart.module.scss';
import Select from 'react-select'
import Input from '../../../components/Input/Input';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../../redux/reducers/customer/cart';
import useFirebase from '../../../utils/hooks/useFirebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { setUser } from '../../../redux/reducers/auth/authReducer';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { app } = useFirebase();
    const db = getFirestore(app);
    const documentRef = doc(db, 'users', user?.id)
    const tailorDocumentRef = cart && doc(db, 'users', cart?.id);
    const formik = useFormik({
        initialValues: {
            plan: '',
            instructions: ''
        },
        validationSchema: Yup.object().shape({
            plan: Yup.string().required('Required'),
            instructions: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            handlPlaceOrder(values);
        }

    });
    const formattedOptions = cart?.portFolio?.map(option => ({
        value: option.title,
        label: `${option.title} - ${option.price}pkr`,
        title: option.title,
        price: option.price,
    }));

    const handlPlaceOrder = (values) => {
        let orders = [];
        let tailorOrders = [];
        const orderID = uuidv4();
        if (user?.orders) {
            orders = [...user?.orders]
        }
        if (cart?.orders) {
            tailorOrders = [...cart?.orders]
        }

        orders.push({
            tailorId: cart?.id,
            plan: values.plan,
            instructions: values.instructions,
            orderId: orderID,
            status: 'requested',
            name: cart?.name,
            bio: cart?.bio,
            address: cart?.address,
            phone: cart?.phone,
            email: cart?.email
        });

        tailorOrders.push({
            customerId: user?.id,
            plan: values.plan,
            instructions: values.instructions,
            orderId: orderID,
            status: 'requested',
            name: user?.name,
            bio: user?.bio,
            address: user?.address,
            phone: user?.phone,
            email: user?.email
        })

        const updateUser = {
            ...user,
            orders: orders,
        }
        const updateTailor = {
            ...cart,
            orders: tailorOrders
        }
        setDoc(documentRef, updateUser);
        setDoc(tailorDocumentRef, updateTailor);
        dispatch(setUser(updateUser));
        dispatch(setCart(undefined));
        navigate('/customer/home');
        toast.success("Order is Successfully Placed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }

    return (
        <div className={classes.container}>
            {!cart &&
                <p className={classes.empty_cart}>Sorry You Have Nothing In the Cart!</p>
            }
            {!!cart &&
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                    }}
                >
                    <div className={classes.flex}>
                        <label className={classes.label}>{cart?.name}</label>
                        <Button onClick={() => dispatch(setCart(undefined))} className={classes.add_cart}>Remove</Button>
                    </div>
                    <p className={classes.bio}>{cart?.bio}</p>
                    <div className={classes.plan_container}>
                        <p className={classes.select_plan}>Select Plan:</p>
                        <Select
                            isClearable
                            options={formattedOptions}
                            value={formattedOptions.find((option) => option.value === formik.values.plan)}
                            onChange={(option) => formik.setFieldValue('plan', option ? option.value : '')}
                            onBlur={formik.handleBlur('plan')}

                        />
                        {formik.touched.plan && formik.errors.plan && formik.errors.plan &&
                            <Form.Text>{formik.errors.plan}</Form.Text>
                        }
                    </div>
                    <div className={classes.plan_container}>
                        <Input
                            label={'Special Instructions'}
                            as="textarea"
                            rows={5}
                            labelClassName={classes.select_plan}
                            value={formik.values.instructions}
                            onChange={formik.handleChange('instructions')}
                            onBlur={formik.handleBlur('instructions')}
                            error={formik.touched.instructions && formik.errors.instructions && formik.errors.instructions}
                        />
                    </div>
                    <Button type='submit' className={classes.place_order}>Place Order</Button>
                </form>
            }
        </div>
    )
}

export default Cart