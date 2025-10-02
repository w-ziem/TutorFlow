import React from 'react';
import Cta from "../components/MainPage/Cta.jsx";
import Hero from "../components/MainPage/Hero.jsx";
import Features from "../components/MainPage/Features.jsx";
import Header from "../components/MainPage/Header.jsx";
import Footer from "../components/MainPage/Footer.jsx";
import Pricing from "../components/MainPage/Pricing.jsx";
import Testimonials from "../components/MainPage/Testimonials.jsx";



const MainPage = () => {
    return (
        <div className="min-h-screen text-lg">
            <Header />
            <Hero />
            <Features />
            <Testimonials />
            <Pricing />
            <Cta />
            <Footer />
        </div>
    );
};

export default MainPage;