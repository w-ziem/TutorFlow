import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar.jsx";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto w-full lg:w-auto pt-16 lg:pt-0">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;