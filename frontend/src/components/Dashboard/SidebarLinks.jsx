import React from 'react';
import {NavLink} from "react-router-dom";
import {FaUserGraduate, FaHome, FaLink, FaNewspaper, FaBook} from "react-icons/fa";
import {useAuth} from "../../contexts/AuthProvider.jsx";


const SidebarLinks = () => {
    const linkClass = ({isActive}) => isActive ? "p-3 border-1 bg-gradient-to-r from-[#242E7C] to-[#5FA3F7] text-white border-primary rounded-full font-[500] text-lg w-[80%]" : "p-3 border-1 bg-none backdrop-blux-2xl text-primary shadow-xl border-primary rounded-full font-[500] text-lg w-[80%] transition duration-300 hover:bg-primary/20 hover:translate-x-2";
    const {user, isTutor, isStudent} = useAuth();


    return (
        <nav className="flex flex-col gap-3 ml-3">
            <NavLink className={linkClass} to={`/dashboard-${user.role.toLowerCase()}`} end>
                <FaHome className="inline mr-3 mb-0.5"/>
                Dashboard
            </NavLink>
            {isTutor && <NavLink className={linkClass} to="/dashboard-tutor/students">
                <FaUserGraduate className="inline mr-3 mb-0.5"/>
                Uczniowie
            </NavLink>}
            <NavLink className={linkClass} to={`/dashboard-${user.role.toLowerCase()}/lessons`}>
                <FaBook className="inline mr-3 mb-0.5"/>
                Lekcje
            </NavLink>
            <NavLink  className={linkClass} to={`/dashboard-${user.role.toLowerCase()}/materials`}>
                <FaLink className="inline mr-3 mb-0.5"/>
                Materiały
            </NavLink>
            {isTutor && <NavLink className={linkClass} to="/dashboard-tutor/reports">
                <FaNewspaper className="inline mr-3 mb-0.5"/>
                Raporty
            </NavLink>}
        </nav>
    );
};

export default SidebarLinks;