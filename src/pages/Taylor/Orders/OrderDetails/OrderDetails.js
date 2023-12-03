import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classes from './OrderDetails.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import useFirebase from '../../../../utils/hooks/useFirebase';
import { setUser } from '../../../../redux/reducers/auth/authReducer';
import { Rating } from '@mui/material';
import whatsAppIcon from '../../../../assets/images/png/whatsapp.png';

const OrderDetails = () => {
    const { user } = useSelector(state => state.auth);
    const [orderDetails, setOrderDetails] = useState();
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
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
    }, [user]);
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
                const sumOfRatingsCount = customer.ratings?.reduce((accumulator, currentRating) => {
                    // Convert the count property to a number before adding to the accumulator
                    const count = Number(currentRating.count);
                    return accumulator + count;
                }, 0);
                const averageRating =
                    customer?.ratings?.length > 0
                        ? sumOfRatingsCount / customer?.ratings?.length
                        : rating;
                const updateCustomer = {
                    ...customer,
                    orders: updatedOrders,
                    ratings: [...customer?.ratings, {
                        id: user?.id,
                        count: rating
                    }],
                    averageRating: Math.round(averageRating)
                }
                let customerDocRef = doc(db, 'users', orderDetails?.tailorId)
                setDoc(customerDocRef, updateCustomer);
            }

        }).catch((error) => {
            console.log('error handling:', error)
        });
    }

    const handleAddRating = () => {
        handleShow();
        handleUpdateStatus('isDelieverd')
    }
    const handleShow = () => {
        setShow(prev => !prev);
    }

    const handleWhatsAppClick = () => {
        const phoneNumber = orderDetails?.phone; // Replace with the recipient's phone number
        const message = 'Hello, I took your number from Stitch Ease!'; // Replace with your message

        // Create the WhatsApp link
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open the link in a new tab or window
        window.open(whatsappLink, '_blank');
    };
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
                            <Button onClick={handleShow} className={classes.approve}>Mark As Delieverd</Button>
                        </>
                    }
                    <Button className={classes.approve} onClick={handleWhatsAppClick}>
                        <img src={whatsAppIcon} />
                        WhatsApp
                    </Button>
                </>
            }
            <Modal show={show}>
                <Modal.Body className={classes.modal_body}>
                    <p>What was your experice with {orderDetails?.name?.toLowerCase()}?</p>
                    <p className={classes.interest_p}>we glad to know your thoughts about {orderDetails?.name?.toLowerCase()}, we will surely appricate your interest to rate this tailor.</p>
                    <Rating
                        onChange={(e) => setRating(e?.target?.defaultValue)}
                    />
                    <div className={classes.submit_container}>
                        <Button disabled={rating === 0 ? true : false} onClick={handleAddRating} className={classes.submit_rating}>Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default OrderDetails