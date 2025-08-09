import React from 'react';
import Header from "../components/Header.jsx";
import About from "../components/About.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Cta from "../components/Cta.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";



const MainPage = () => {
    return (
        <>
            <Header/>
            <Hero />
            <About />
            <Testimonials />
            <Cta />
            <Footer />
        </>
    );
};

export default MainPage;