import React from 'react';
import classes from './AboutUs.module.scss'
import customer1 from '../../../assets/images/jpeg/customer1.jpeg';
import customer2 from '../../../assets/images/jpeg/customer2.jpeg';
import customer3 from '../../../assets/images/jpeg/customer3.jpeg';
import customer4 from '../../../assets/images/jpeg/customer4.jpeg';
import customer5 from '../../../assets/images/jpeg/customer5.jpeg';

export const AboutUs = () => {
    const customers = [
        {
            src: customer1,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus.'
        },
        {
            src: customer2,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus.'
        },
        {
            src: customer3,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus.'
        },
        {
            src: customer4,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus.'
        },
        {
            src: customer5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus.'
        }
    ]
    return (
        <div className={classes.container}>
            <p className={classes.heading}>ABOUT US</p>
            <div className={classes.section}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus.

                    Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. Vivamus ut ultrices magna. Etiam pharetra pretium iaculis. Etiam eu tincidunt elit, ac dignissim felis. Donec rhoncus dolor id arcu vestibulum, in vestibulum purus blandit. Sed pulvinar turpis ut ex venenatis faucibus. Nullam sed diam nec nulla bibendum pulvinar eget non arcu. Aliquam mattis velit nulla, convallis malesuada ex finibus non. Morbi vehicula tellus in elit volutpat bibendum. Sed vel scelerisque massa. Curabitur ultricies lectus metus. Praesent consequat dapibus est nec condimentum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus. Mauris non vehicula odio. Duis ac quam sit amet dui elementum faucibus. Morbi non lacinia justo. Phasellus pharetra ex nec elit facilisis cursus. Phasellus laoreet placerat libero, nec venenatis velit consectetur nec. Vestibulum quis aliquet ex, at porttitor ipsum. Sed porttitor felis vitae eros lobortis, sit amet pulvinar orci mattis. Suspendisse dignissim tellus non scelerisque tincidunt. Integer a mauris non nisl condimentum facilisis. Morbi in enim sit amet purus dictum ultricies. Phasellus tristique in purus eu faucibus.

                    Sed malesuada est eget sapien aliquet, vel sagittis ipsum elementum. Vestibulum et enim a lorem sodales laoreet. Cras ut aliquam purus. Donec non nisi sollicitudin, scelerisque augue nec, mollis nisi. Duis nec pharetra orci. Vivamus ut ultrices magna. Etiam pharetra pretium iaculis. Etiam eu tincidunt elit, ac dignissim felis. Donec rhoncus dolor id arcu vestibulum, in vestibulum purus blandit. Sed pulvinar turpis ut ex venenatis faucibus. Nullam sed diam nec nulla bibendum pulvinar eget non arcu. Aliquam mattis velit nulla, convallis malesuada ex finibus non. Morbi vehicula tellus in elit volutpat bibendum. Sed vel scelerisque massa. Curabitur ultricies lectus metus. Praesent consequat dapibus est nec condimentum.
                </p>
                <p className={classes.customer_heading}>Our Satisfied Customers</p>
                <div className={classes.customers}>
                    {customers.map((item, index) => {
                        return (
                            <div key={index} className={classes.customers_contain}>
                                <img className={classes.customers_img} src={item.src} width='250px' />
                                <p className={classes.customers_reviews}>{item.review}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
