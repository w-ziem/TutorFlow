import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaRocket, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="relative flex items-center justify-between gap-4 py-2 px-4 md:px-8 lg:justify-evenly">
            {/* Logo */}
            <img className="h-20 md:h-24 lg:h-30 flex-shrink-0" src={logo} alt="TutorFlow Logo"/>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-15 justify-evenly w-fit px-12 py-4 rounded-4xl bg-primary">
                <a className="text-white text-md font-semibold hover:text-secondary ease-[0.3] transition-all" href="#features">Funkcje</a>
                <a className="text-white text-md font-semibold hover:text-secondary ease-[0.3] transition-all" href="#pricing">Cennik</a>
                <a className="text-white text-md font-semibold hover:text-secondary ease-[0.3] transition-all" href="#testimonials">Opinie</a>
                <Link className="text-white text-md font-semibold hover:text-secondary ease-[0.3] transition-all" to="/login">Zaloguj się</Link>
            </nav>

            {/* Desktop CTA Button */}
            <Link
                className="hidden md:inline-flex group items-center bg-gradient-to-r from-[#242E7C] to-[#5FA3F7]
                hover:from-[#5FA3F7] hover:to-[#242E7C]
                text-white font-bold py-3 px-4 lg:px-6 rounded-4xl
                transition-colors duration-300 text-sm lg:text-base"
                to="/signup"
            >
                <span className="hidden lg:inline">Rozpocznij nauczanie</span>
                <span className="lg:hidden">Zacznij</span>
                <FaRocket
                    className="text-white inline-block ml-2
                    transition-transform duration-300
                    group-hover:translate-x-1.5 group-hover:-rotate-8"
                />
            </Link>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-black text-white hover:bg-secondary transition-colors duration-300"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 blur-2xl bg-opacity-50 z-40 md:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Menu */}
            <div className={`
                fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-bold text-heading">Menu</h3>
                    <button
                        onClick={closeMenu}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <FaTimes size={16} />
                    </button>
                </div>
                
                <nav className="flex flex-col p-4 space-y-4">
                    <a 
                        className="text-heading text-lg font-semibold hover:text-secondary transition-all py-3 border-b border-gray-100"
                        href="#features"
                        onClick={closeMenu}
                    >
                        Funkcje
                    </a>
                    <a 
                        className="text-heading text-lg font-semibold hover:text-secondary transition-all py-3 border-b border-gray-100"
                        href="#pricing"
                        onClick={closeMenu}
                    >
                        Cennik
                    </a>
                    <a 
                        className="text-heading text-lg font-semibold hover:text-secondary transition-all py-3 border-b border-gray-100"
                        href="#testimonials"
                        onClick={closeMenu}
                    >
                        Opinie
                    </a>
                    
                    {/* Mobile CTA Button */}
                    <Link
                        className="mt-6 group inline-flex items-center justify-center bg-gradient-to-r from-[#242E7C] to-[#5FA3F7]
                        hover:from-[#5FA3F7] hover:to-[#242E7C]
                        text-white font-bold py-4 px-6 rounded-4xl
                        transition-colors duration-300 text-center"
                        to="/signup"
                        onClick={closeMenu}
                    >
                        Rozpocznij nauczanie
                        <FaRocket
                            className="text-white inline-block ml-2
                            transition-transform duration-300
                            group-hover:translate-x-1.5 group-hover:-rotate-8"
                        />
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;