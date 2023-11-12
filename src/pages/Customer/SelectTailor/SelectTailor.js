import React from 'react'
import DetailCard from '../../../components/Card/DetailCard';
import { useSelector } from 'react-redux';
import classes from './SelectTailor.module.scss';
import { Button } from 'react-bootstrap';

const SelectTailor = () => {
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
            <div className={classes.flex}>
                <label className={classes.label}>{user?.name}</label>
                <Button className={classes.add_cart}>Add To Cart</Button>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus. Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci.</p>

            <label className={classes.specilization}>Specialization</label>
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

export default SelectTailor