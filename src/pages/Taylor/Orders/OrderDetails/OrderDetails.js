import React from 'react'
import { useSelector } from 'react-redux';
import classes from './OrderDetails.module.scss';
import { Button } from 'react-bootstrap';

const OrderDetails = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <div className={classes.container}>
            <label className={classes.label}>{user?.name}</label>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci.</p>
            <div className={classes.flex}>
                <p className={classes.heading}>Selected Plan: </p>
                <p className={classes.selection}>Kids</p>
            </div>
            <div className={classes.flex}>
                <p className={classes.heading}>Price: </p>
                <p className={classes.selection}>14000 pkr</p>
            </div>
            <Button className={classes.approve}>Approve</Button>
            <Button className={classes.cancel}>Cancel</Button>
        </div>
    )
}

export default OrderDetails