import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import QuickLinks from "./QuickLinks.jsx";
import {useAuth} from "../../contexts/AuthProvider.jsx";
import AddStudentForm from "../Forms/AddStudentForm.jsx";

const LeftSummaries = () => {
    const {user} = useAuth();

    return (
        <div className="w-[60%] h-screen p-10">
            <h1 className="gradient-text drop-shadow-2xl drop-shadow-secondary text-5xl/18 line-2 font-semibold">Cześć, {user?.name || "Korepetytorze"}</h1>
            <QuickLinks />
        </div>
    );
};

export default LeftSummaries;