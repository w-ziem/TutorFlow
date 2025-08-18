import React, {useState} from 'react';
import logo from "../../assets/logo.png";
import SidebarLinks from "./SidebarLinks.jsx";
import {NavLink} from "react-router-dom";

const Sidebar = () => {


    return (
        <aside className="sticky left-0 bg-none backdrop-blur-2xl flex gap-20 flex-row sm:flex-col p-3 h-screen w-[15%] shadow-2xl ">
            <NavLink to="/">
            <img src={logo} alt="TutorFlow logo" className="w-[80%]"/>
            </NavLink>
            <SidebarLinks />
        </aside>
    );
};

export default Sidebar;