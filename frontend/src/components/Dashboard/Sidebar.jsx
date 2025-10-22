import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import SidebarLinks from "./SidebarLinks.jsx";
import {NavLink} from "react-router-dom";
import LogoutButton from "../Ui/LogoutButton.jsx";
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger Button - Mobile Only */}
            <button
                onClick={toggleMenu}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary/20 backdrop-blur-xl rounded-full border border-primary/30 shadow-lg"
            >
                {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
            </button>

            {/* Overlay - Mobile Only */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={closeMenu}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 
                bg-white/5 backdrop-blur-2xl 
                flex flex-col gap-8 lg:gap-20 p-4 lg:p-3 
                h-screen w-[280px] lg:w-[15%] 
                shadow-2xl border-r border-white/10
                z-40
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <NavLink to="/" onClick={closeMenu} className="mt-12 lg:mt-0">
                    <img src={logo} alt="TutorFlow logo" className="w-[80%] mx-auto"/>
                </NavLink>
                <SidebarLinks closeMenu={closeMenu} />
                <LogoutButton />
            </aside>
        </>
    );
};

export default Sidebar;