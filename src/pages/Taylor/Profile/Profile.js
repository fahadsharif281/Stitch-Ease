import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import classes from './Profile.module.scss';
import { Button, Carousel, Modal } from 'react-bootstrap';
import AddOns from '../../../components/Add-Ons/AddOns';
import DetailCard from '../../../components/Card/DetailCard';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import TextMobileStepper from '../../../components/SwipeableStepper/SwipeableStepper';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([])
    const storage = getStorage();
    const handleShow = () => {
        setShow(!show);
    }
    useEffect(() => {
        const listRef = ref(storage, `${user?.id}/`);
        listAll(listRef).then((data) => {
            data.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    if (!images.includes(url)) {
                        setImages(pre => [...pre, url])
                    }
                })
            })
        })
    }, [])
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
                                    title={items?.title}
                                    text={
                                        <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <p>{items.price} pkr</p>
                                            <p>{items.description}</p>
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
                <AddOns handleShow={handleShow} />
            </Modal>
        </div>
    )
}

export default Profile