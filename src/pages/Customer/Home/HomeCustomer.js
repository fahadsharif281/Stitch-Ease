import React, { useEffect } from 'react'
import classes from './HomeCustomer.module.scss';
import DetailCard from '../../../components/Card/DetailCard';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import useFirebase from '../../../utils/hooks/useFirebase';
import { setTailors } from '../../../redux/reducers/taylor/taylorReducer';

const HomeCustomer = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { tailors } = useSelector(state => state.tailors);
    const dispatch = useDispatch();
    const { app } = useFirebase();
    const db = getFirestore(app);
    const handleClick = (id) => {
        navigate(`/customer/home/tailor-detail/${id}`)
    }
    useEffect(() => {
        getDocs(collection(db, 'users')).then((res) => {
            const allUsers = res?.docs?.map((data) =>
                data?.data()
            )
            dispatch(setTailors(allUsers.filter((item) => item.role === 'Tailor')))
        }).catch((error) => {
            console.log('error handling:', error)
        });

    }, [])
    return (
        <div>
            <label className={classes.label}>Welcome! {user?.name}</label>
            {tailors?.map((item) => {
                return (<>
                    <DetailCard
                        onClick={() => handleClick(item.id)}
                        className={classes.container}
                        textClassName={classes.text}
                        header='Tailor'
                        text={item.bio}
                        title={item.name}
                        ratingProps={{
                            readOnly: true,
                            defaultValue: 3
                        }}
                    />
                </>)
            })}
        </div>
    )
}

export default HomeCustomer