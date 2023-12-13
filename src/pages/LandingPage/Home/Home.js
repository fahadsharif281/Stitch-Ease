import React from 'react'
import bg_Image from '../../../assets/images/jpeg/clothing.jpeg'
import classes from './Home.module.scss';

export const Home = () => {
    return (
        <div className={classes.container}>
            <img src={bg_Image} width='100%' height='800px' />
            <p className={classes.heading}>
                "Tailoring Excellence, Your Style, Your Way."
            </p>
        </div>
    )
}
