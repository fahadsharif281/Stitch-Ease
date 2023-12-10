import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classes from './Profile.module.scss';
import { Button, Carousel, Modal } from 'react-bootstrap';
import AddOns from '../../../components/Add-Ons/AddOns';
import DetailCard from '../../../components/Card/DetailCard';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import TextMobileStepper from '../../../components/SwipeableStepper/SwipeableStepper';
import dotIcon from '../../../assets/images/png/dots.png';
import { MenuItem } from '@mui/material';
import useFirebase from '../../../utils/hooks/useFirebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { setUser } from '../../../redux/reducers/auth/authReducer';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [editData, setEditData] = useState(null);
    const storage = getStorage();
    const { app } = useFirebase();
    const dispatch = useDispatch();
    const db = getFirestore(app);
    const documentRef = doc(db, 'users', user?.id);
    const handleShow = () => {
        setShow(!show);
        setEditData(null)
    }
    useEffect(() => {
        const listRef = ref(storage, `${user?.id}/`);
        listAll(listRef).then((data) => {
            data.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImages(pre => [...pre, url])
                })
            })
        })
    }, []);

    const handleMenu = (item) => {
        if (openMenu && openMenu.id === item.id) {
            // If the clicked menu is already open, close it
            setOpenMenu(undefined);
        } else {
            // If the clicked menu is different or no menu is open, open the clicked menu
            setOpenMenu(item);
        }
    }

    const handleDelete = (item) => {
        const filterPortfolio = user?.portFolio?.filter((data) => data?.id !== item?.id);
        const updateUser = {
            ...user,
            portFolio: filterPortfolio
        }
        setDoc(documentRef, updateUser);
        dispatch(setUser(updateUser));
    }
    const handleEdit = (item) => {
        handleShow();
        handleMenu(item);
        setEditData(item);
    }
    return (
        <div className={classes.container}>
            <div className={classes.flex}>
                <label className={classes.label}>{user?.name}</label>
                <Button onClick={handleShow} className={classes.add_work}>Add Work</Button>
            </div>
            <p>{user?.bio}</p>
            {!!images.length &&
                <div className={classes.stepper}>
                    <TextMobileStepper images={images} />
                </div>
            }
            <div className={classes.plan_cards}>
                {user?.portFolio?.map((items, index) => {
                    return (
                        <>
                            <div key={index} className={classes.plan}>
                                <DetailCard
                                    className={classes.card}
                                    bodyClassName={classes.body}
                                    header={
                                        <div className={classes.menu_container}>
                                            <img onClick={() => handleMenu(items)} src={dotIcon} width='15px' />
                                            <div className={openMenu && openMenu?.id === items?.id ? classes.open_menu : classes.close_menu}>
                                                <MenuItem onClick={() => handleEdit(items)}>Edit</MenuItem>
                                                <MenuItem onClick={() => handleDelete(items)}>Delete</MenuItem>
                                            </div>
                                        </div>}
                                    title={items?.title}
                                    text={
                                        <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <p>{items.price} pkr</p>
                                            <p className={classes.card_description}>{items.description}</p>
                                        </div>}
                                />
                            </div>
                        </>
                    )
                })}
            </div>
            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Work</Modal.Title>
                </Modal.Header>
                <AddOns handleShow={handleShow} editData={editData} />
            </Modal>
        </div>
    )
}

export default Profile