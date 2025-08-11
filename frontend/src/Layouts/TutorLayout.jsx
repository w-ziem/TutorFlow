import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const TutorLayout = () => {
    return (
        <div className="flex gap-4">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default TutorLayout;