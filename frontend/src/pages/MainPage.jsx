import React from 'react';
import Cta from "../components/Cta.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Pricing from "../components/Pricing.jsx";



const MainPage = () => {
    return (
        <div className="min-h-screen text-lg">
            <Header />
            <Hero />
            <Features />
            <Pricing />
            <Cta />
            <Footer />
        </div>
    );
};

export default MainPage;