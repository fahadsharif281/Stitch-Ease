import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Customer.module.scss';
import DetailCard from '../../../components/Card/DetailCard';

const CustomerOrders = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const handleClick = (id) => {
        navigate(`/customer/orders/detail/${id}`)
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
                            header={<div className={classes.header_class}>Tailor<span>status: {items?.status}</span></div>}
                            text={items?.bio}
                            title={items?.name}
                        />
                    </>
                )
            })}
        </div>
    )
}

export default CustomerOrders