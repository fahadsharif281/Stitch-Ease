import React, { useEffect, useState } from 'react'
import DetailCard from '../../../components/Card/DetailCard';
import classes from './HomeTaylor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApplicationToast } from '../../../components/Toast/ApplicationToast';
import { Alert, Button } from 'react-bootstrap';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import useFirebase from '../../../utils/hooks/useFirebase';
import { setTailors } from '../../../redux/reducers/taylor/taylorReducer';

const HomeTaylor = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { tailors } = useSelector(state => state.tailors);
  const dispatch = useDispatch();
  const { app } = useFirebase();
  const db = getFirestore(app);
  const handleClick = (id) => {
    navigate(`/tailor/home/detail/${id}`)
  }
  useEffect(() => {
    getDocs(collection(db, 'users')).then((res) => {
      const allUsers = res?.docs?.map((data) =>
        data?.data()
      )
      dispatch(setTailors(allUsers.filter((item) => item.role === 'Tailor' && !!item?.portFolio?.length && item?.id !== user?.id)))
    }).catch((error) => {
      console.log('error handling:', error)
    });

  }, [])
  return (
    <div>
      {!user?.portFolio?.length &&
        <Alert variant='danger'>Complete Your Profile! Please Add Your Work and Pricing From Your Profile Until Unless You Will Not Be Featured. </Alert>}
      <label className={classes.label}>Welcome! {user?.name}</label>

      {tailors?.map((item, index) => {
        return (<>
          <DetailCard
            key={index}
            onClick={() => handleClick(item.id)}
            className={classes.container}
            textClassName={classes.text}
            header='Tailor'
            text={item.bio}
            title={item.name}
            ratingProps={{
              readOnly: true,
              defaultValue: item?.averageRating
            }}
          />
        </>)
      })}
    </div>
  )
}

export default HomeTaylor