import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import QuickLinks from "./QuickLinks.jsx";
import {useAuth} from "../../contexts/AuthProvider.jsx";
import AddStudentForm from "../Forms/AddStudentForm.jsx";
import LatestLessons from "./LatestLessons.jsx";

const LeftSummaries = () => {
    const {user} = useAuth();
    const [name, setName] = useState("");
    useEffect(() => {
        setName(user?.name.split(" ")[0] || "Korepetytorze");
    }, [user]);

    return (
        <div className="w-[60%] h-screen p-10">
            <h1 className="gradient-text drop-shadow-2xl drop-shadow-secondary text-5xl/18 line-2 font-semibold">Cześć, {name}</h1>
            <QuickLinks />
            <LatestLessons />
        </div>
    );
};

export default LeftSummaries;