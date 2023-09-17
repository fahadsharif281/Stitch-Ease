import React from 'react'
import { Header } from './Header/Header'
import { Home } from './Home/Home'
import { AboutUs } from './About/AboutUs'
import { ContactUs } from './ContactUs/ContactUs'
import { Block } from './Block/Block'
import { Highlight } from './Highlight/Highlight'
import { Footer } from './Footer/Footer'

const LandingPage = () => {
    return (
        <>
            <div>
                <div>
                    <Header />
                </div>
                <div id='home'>
                    <Home />
                </div>
                <div>
                    <Highlight />
                </div>
                <div id='aboutUs'>
                    <AboutUs />
                </div>
                <div>
                    <Block />
                </div>
                <div id='contactUs'>
                    <ContactUs />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default LandingPage