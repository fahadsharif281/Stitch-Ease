import React from 'react';
import classes from './AboutUs.module.scss'
import customer1 from '../../../assets/images/jpeg/alteration-services.jpg';
import customer2 from '../../../assets/images/jpeg/fashion-designing-services.jpg';
import customer3 from '../../../assets/images/jpeg/stitching-service.jpg';
import customer4 from '../../../assets/images/jpeg/customer4.jpeg';
import customer5 from '../../../assets/images/jpeg/customer5.jpeg';

export const AboutUs = () => {
    const customers = [
        {
            src: customer1,
            heading: 'STITCHING',
            review: 'We provide premium quality stitching services. We collect the fabric from your doorsteps, stitch it to the finest quality, and deliver it back to you on time.'
        },
        {
            src: customer2,
            heading: 'DESIGNING',
            review: 'Boost your fashion business or start your own clothing line. We offer business guidance and assistance for emerging designers, brands.'
        },
        {
            src: customer3,
            heading: 'ALTERATIONS',
            review: 'Alteration services at your doorstep. Get your dream dress altered by professional tailors with free pickup and cash on delivery.'
        },
        // {
        //     src: customer4,
        //     review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus.'
        // },
        // {
        //     src: customer5,
        //     review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ex suscipit, dapibus erat et, lobortis dui. Aenean nisl purus, finibus nec feugiat condimentum, suscipit sed metus.'
        // }
    ]
    return (
        <div className={classes.container}>
            <p className={classes.heading}>ABOUT US</p>
            <div className={classes.section}>
                <p>
                    Welcome to StitchEase, where style meets craftsmanship. Our vision is to revolutionize the way you experience tailored clothing, bringing a seamless blend of technology and tradition. At StitchEase, we believe in the power of individual expression, and our platform connects you with skilled tailors who understand the art of creating garments that reflect your unique style.
                </p>
                <p> Founded with a passion for providing a personalized tailoring experience, StitchEase is more than just a web app; it's a gateway to a world where your fashion dreams come to life. Our curated network of tailors brings a wealth of expertise, ensuring each stitch embodies precision and care.</p>
                <p>  What sets us apart is our commitment to convenience and quality. From the comfort of your home, you can browse tailor profiles, choose your favorite, and embark on a journey to design clothing that speaks to your personality. Whether it's a bespoke suit for a special occasion or a wardrobe refresh, StitchEase is here to make your vision a reality.</p>
                <p className={classes.customer_heading}>OUR SERVICES</p>
                <p className={classes.customer_des}>Our Vision is to become externally bench marked online tailoring service provider in Pakistan. Our goal is to provide best services, values and continous improvements and innovative styles.</p>
                <div className={classes.customers}>
                    {customers.map((item, index) => {
                        return (
                            <div key={index} className={classes.customers_contain}>
                                <img className={classes.customers_img} src={item.src} width='250px' />
                                <p className={classes.customers_reviews}>{item.heading}</p>
                                <p className={classes.customers_reviews}>{item.review}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
