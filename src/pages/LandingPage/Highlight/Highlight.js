import React from 'react';
import hl1 from '../../../assets/images/jpeg/factory_workers.jpeg';
import hl2 from '../../../assets/images/jpeg/ladies_workers.jpeg';
import classes from './Highlight.module.scss';

export const Highlight = () => {
    return (
        <div>
            <div className={classes.contain}>
                <img src={hl1} width='50%' height='800px' />
                <img src={hl2} width='50%' height='800px' />
            </div>
        </div>
    )
}
