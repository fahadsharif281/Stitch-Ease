import React, { useEffect, useState } from 'react'
import DetailCard from '../../../components/Card/DetailCard'
import { useSelector } from 'react-redux';
import classes from './TaylorDetail.module.scss';
import { useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import SwipeableTextMobileStepper from '../../../components/SwipeableStepper/SwipeableStepper';


const TaylorDetail = () => {
    const { tailors } = useSelector(state => state.tailors);
    const { id } = useParams();
    const storage = getStorage();
    const [selectedUser, setSelectedUser] = useState();
    const [images, setImages] = useState([])
    useEffect(() => {
        tailors?.filter((items) => {
            if (items.id === id) {
                setSelectedUser(items)
            }
            return items
        })
    }, []);

    useEffect(() => {
        const listRef = ref(storage, `${id}/`);
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
            <label className={classes.label}>{selectedUser?.name}</label>
            <p>{selectedUser?.bio}</p>
            {!!images.length &&
                <div className={classes.stepper}>
                    <SwipeableTextMobileStepper images={images} />
                </div>
            }
            <div className={classes.plan_cards}>
                {selectedUser?.portFolio?.map((items, index) => {
                    return (
                        <>
                            <div className={classes.plan}>
                                <DetailCard
                                    className={classes.card}
                                    bodyClassName={classes.body}
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
        </div>
    )
}

export default TaylorDetail