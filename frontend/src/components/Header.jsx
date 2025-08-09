import React from 'react';
import {NavLink} from "react-router-dom";
import {FaRocket} from "react-icons/fa";
import logo from "../assets/logo.png";


const Header = () => {
    return (
        <header className="flex items-center justify-evenly gap-25 py-2 px-8">
            <img className="h-30" src={logo} alt="TutorFlow Logo"/>
            <nav className="flex gap-15 justify-evenly w-fit px-12 py-4 rounded-4xl bg-black">
                <NavLink className="text-white hover:text-secondary ease-[0.3] transition-all" to="about">Funkcje</NavLink>
                <NavLink className="text-white hover:text-secondary ease-[0.3] transition-all" to="#testimonials" >Cennik</NavLink>
                <NavLink className="text-white hover:text-secondary ease-[0.3] transition-all" to="#testimonials">Opinie</NavLink>
            </nav>
            <NavLink
             className="group inline-flex items-center bg-gradient-to-r from-[#242E7C] to-[#5FA3F7]
             hover:from-[#5FA3F7] hover:to-[#242E7C]
             text-white font-bold py-3 px-6 rounded-4xl
             transition-colors duration-300"
             path="/signup"
            >
            Rozpocznij nauczanie
            <FaRocket
            className="text-white inline-block ml-2
               transition-transform duration-300
               group-hover:translate-x-1.5 group-hover:-rotate-8"
            />
            </NavLink>
        </header>
    );
};

export default Header;