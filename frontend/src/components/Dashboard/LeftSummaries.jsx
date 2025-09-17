import React, {useEffect, useState} from 'react';
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
        <div className="w-[55%] p-10 h-screen flex flex-col justify-evenly">
            <div className="ml-10">
                <h1 className="gradient-text drop-shadow-2xl drop-shadow-secondary text-5xl/18 line-2 font-semibold">Cześć, {name}</h1>
                <p className="text-xl text-text/70 font-medium">
                    Witaj ponownie. Co dzisiaj chcesz zrobić?
                </p>
            </div>
            <QuickLinks />
            <LatestLessons />
        </div>
    );
};

export default LeftSummaries;
