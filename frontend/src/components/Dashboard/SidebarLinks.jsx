import React from 'react';
import {NavLink} from "react-router-dom";
import {FaUserGraduate, FaHome, FaLink, FaNewspaper, FaBook} from "react-icons/fa";
import {useAuth} from "../../contexts/AuthProvider.jsx";


const SidebarLinks = ({ closeMenu }) => {
    const linkClass = ({isActive}) => isActive
        ? "p-3 border-1 bg-gradient-to-r from-[#242E7C] to-[#5FA3F7] text-white border-primary rounded-full font-[500] text-base lg:text-lg w-full lg:w-[80%]"
        : "p-3 border-1 bg-none backdrop-blur-2xl text-primary shadow-xl border-primary rounded-full font-[500] text-base lg:text-lg w-full lg:w-[80%] transition duration-300 hover:bg-primary/20 hover:translate-x-2";
    const {user, isTutor, isStudent} = useAuth();

    const handleClick = () => {
        if (closeMenu) closeMenu();
    };

    return (
        <nav className="flex flex-col gap-3 ml-0 lg:ml-3">
            <NavLink className={linkClass} to={`/dashboard-${user.role.toLowerCase()}`} end onClick={handleClick}>
                <FaHome className="inline mr-3 mb-0.5"/>
                Dashboard
            </NavLink>
            {isTutor && <NavLink className={linkClass} to="/dashboard-tutor/students" onClick={handleClick}>
                <FaUserGraduate className="inline mr-3 mb-0.5"/>
                Uczniowie
            </NavLink>}
            <NavLink className={linkClass} to={`/dashboard-${user.role.toLowerCase()}/lessons`} onClick={handleClick}>
                <FaBook className="inline mr-3 mb-0.5"/>
                Lekcje
            </NavLink>
            <NavLink className={linkClass} to={`/dashboard-${user.role.toLowerCase()}/materials`} onClick={handleClick}>
                <FaLink className="inline mr-3 mb-0.5"/>
                Materiały
            </NavLink>
            {isTutor && <NavLink className={linkClass} to="/dashboard-tutor/reports" onClick={handleClick}>
                <FaNewspaper className="inline mr-3 mb-0.5"/>
                Raporty
            </NavLink>}
        </nav>
    );
};

export default SidebarLinks;