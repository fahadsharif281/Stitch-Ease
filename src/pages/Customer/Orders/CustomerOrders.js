import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Customer.module.scss';
import DetailCard from '../../../components/Card/DetailCard';

const CustomerOrders = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const handleClick = () => {
        // navigate('/tailor/orders/detail')
    }
    return (
        <div>
            <label className={classes.label}>Your Orders {user?.name}</label>
            <DetailCard
                onClick={handleClick}
                className={classes.container}
                textClassName={classes.text}
                header={<div className={classes.header_class}>Customer <span>status: pending</span></div>}
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. '
                title='Mr John Ladies Tailor'
            />
            <DetailCard
                onClick={handleClick}
                className={classes.container}
                textClassName={classes.text}
                header={<div className={classes.header_class}>Customer <span>status: pending</span></div>}
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. '
                title='Mr John Ladies Tailor'
            />
            <DetailCard
                onClick={handleClick}
                className={classes.container}
                textClassName={classes.text}
                header={<div className={classes.header_class}>Customer <span>status: pending</span></div>}
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. '
                title='Mr John Ladies Tailor'
            />
        </div>
    )
}

export default CustomerOrders