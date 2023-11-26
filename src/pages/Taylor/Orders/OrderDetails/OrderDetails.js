import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classes from './OrderDetails.module.scss';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import useFirebase from '../../../../utils/hooks/useFirebase';
import { setUser } from '../../../../redux/reducers/auth/authReducer';

const OrderDetails = () => {
    const { user } = useSelector(state => state.auth);
    const [orderDetails, setOrderDetails] = useState();
    const dispatch = useDispatch();
    const { app } = useFirebase();
    const db = getFirestore(app);
    const documentRef = doc(db, 'users', user?.id);
    const { id } = useParams();
    useEffect(() => {
        user?.orders?.filter((item) => {
            if (item.orderId === id) {
                setOrderDetails(item);
            }
            return item
        })
    }, []);
    const handleUpdateStatus = (statusToUpdate) => {
        const updatedOrders = user?.orders?.map((order) => {
            if (order?.orderId === id) {
                return { ...order, status: statusToUpdate };
            }
            return order;
        });
        const updateUser = {
            ...user,
            orders: updatedOrders
        }
        dispatch(setUser(updateUser));
        setDoc(documentRef, updateUser);
        handleUpdateCustomer(statusToUpdate);
    }

    const handleUpdateCustomer = (statusToUpdate) => {
        getDocs(collection(db, 'users')).then((res) => {
            const allUsers = res?.docs?.map((data) =>
                data?.data()
            )
            if (!!orderDetails?.customerId) {
                const customer = allUsers.find((item) => item.id === orderDetails?.customerId);
                const updatedOrders = customer?.orders?.map((order) => {
                    if (order?.orderId === id) {
                        return { ...order, status: statusToUpdate };
                    }
                    return order;
                });
                const updateCustomer = {
                    ...customer,
                    orders: updatedOrders
                }
                let customerDocRef = doc(db, 'users', orderDetails?.customerId)
                setDoc(customerDocRef, updateCustomer);
            }
            else {
                const customer = allUsers.find((item) => item.id === orderDetails?.tailorId);
                const updatedOrders = customer?.orders?.map((order) => {
                    if (order?.orderId === id) {
                        return { ...order, status: statusToUpdate };
                    }
                    return order;
                });
                const updateCustomer = {
                    ...customer,
                    orders: updatedOrders
                }
                let customerDocRef = doc(db, 'users', orderDetails?.tailorId)
                setDoc(customerDocRef, updateCustomer);
            }

        }).catch((error) => {
            console.log('error handling:', error)
        });
    }
    return (
        <div className={classes.container}>
            <label className={classes.label}>{orderDetails?.name}</label>
            <p>{orderDetails?.bio}</p>
            <div className={classes.flex}>
                <p className={classes.heading}>Status: </p>
                <p className={classes.selection}>{orderDetails?.status}</p>
            </div>
            <div className={classes.flex}>
                <p className={classes.heading}>Address: </p>
                <p className={classes.selection}>{orderDetails?.address}</p>
            </div>
            <div className={classes.flex}>
                <p className={classes.heading}>Phone: </p>
                <p className={classes.selection}>{orderDetails?.phone}</p>
            </div>
            <div className={classes.flex}>
                <p className={classes.heading}>Email: </p>
                <p className={classes.selection}>{orderDetails?.email}</p>
            </div>
            <div className={classes.flex}>
                <p className={classes.heading}>Selected Plan: </p>
                <p className={classes.selection}>{orderDetails?.plan}</p>
            </div>
            <div className={classes.flex}>
                <p className={classes.heading}>Special Instructions: </p>
                <p className={classes.selection}>{orderDetails?.instructions}</p>
            </div>
            {user?.role === 'Tailor' &&
                <>
                    {orderDetails?.status === 'requested' &&
                        <>
                            <Button onClick={() => handleUpdateStatus('isActive')} className={classes.approve}>Approve</Button>
                            <Button onClick={() => handleUpdateStatus('isCancelled')} className={classes.cancel}>Cancel</Button>
                        </>
                    }
                    {orderDetails?.status === 'isActive' &&
                        <>
                            <Button onClick={() => handleUpdateStatus('isCompleted')} className={classes.approve}>Mark As Complete</Button>
                        </>
                    }
                    {orderDetails?.status === 'isCompleted' &&
                        <>
                            <Button disabled className={classes.approve}>Mark As Complete</Button>
                        </>
                    }
                </>
            }
            {user?.role === 'Customer' &&
                <>
                    {orderDetails?.status === 'isCompleted' &&
                        <>
                            <Button onClick={() => handleUpdateStatus('isDelieverd')} className={classes.approve}>Mark As Delieverd</Button>
                        </>
                    }
                </>
            }
        </div>
    )
}

export default OrderDetails