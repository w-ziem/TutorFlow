import React, {useState} from 'react';
import logo from "../assets/logo.png";
import SidebarLinks from "./SidebarLinks.jsx";

const Sidebar = () => {


    return (
        <aside className="sticky left-0 bg-none backdrop-blur-2xl flex gap-20 flex-row sm:flex-col p-3 h-screen w-[15%] shadow-2xl ">
            <img src={logo} alt="TutorFlow logo" className="w-[80%]"/>
            <SidebarLinks />
        </aside>
    );
};

export default Sidebar;