import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar.jsx";

const TutorLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default TutorLayout;