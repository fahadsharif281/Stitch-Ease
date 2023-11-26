import React from 'react'
import DetailCard from '../../../components/Card/DetailCard'
import classes from './OrderTaylor.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderTaylor = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const handleClick = (id) => {
        navigate(`/tailor/orders/detail/${id}`)
    }
    return (
        <div>
            <label className={classes.label}>You Have {!!user?.orders?.length && user?.orders?.length} Orders {user?.name}</label>
            {user?.orders?.map((items) => {
                return (
                    <>
                        <DetailCard
                            onClick={() => handleClick(items?.orderId)}
                            className={classes.container}
                            textClassName={classes.text}
                            header={<div className={classes.header_class}>Customer<span>status: {items?.status}</span></div>}
                            text={items?.bio}
                            title={items?.name}
                        />
                    </>
                )
            })}
        </div>
    )
}

export default OrderTaylor