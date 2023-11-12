import React from 'react'
import DetailCard from '../../../components/Card/DetailCard'
import { useSelector } from 'react-redux';
import classes from './TaylorDetail.module.scss';

const TaylorDetail = () => {
    const { user } = useSelector(state => state.auth);
    const plans = [
        {
            title: 'Kids',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum',
            rates: '3000 pkr'
        },
        {
            title: 'Mens',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum',
            rates: '25000 pkr'
        },
        {
            title: 'Woman',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum',
            rates: '12000 pkr'
        },
        {
            title: 'Formal',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum',
            rates: '40000 pkr'
        },
        {
            title: 'Casual',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum',
            rates: '9000 pkr'
        }
    ]
    return (
        <div className={classes.container}>
            <label className={classes.label}>{user?.name}</label>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. .</p>
            {/* <p className={classes.label}>Catalogue</p> */}

            <label className={classes.label}>Specialization</label>
            <div className={classes.plan_cards}>
                {plans?.map((items, index) => {
                    return (
                        <>
                            <div className={classes.plan}>
                                <DetailCard
                                    className={classes.card}
                                    bodyClassName={classes.body}
                                    title={items?.title}
                                    text={
                                        <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <p>{items.rates}</p>
                                            <p>{items.description}</p>
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