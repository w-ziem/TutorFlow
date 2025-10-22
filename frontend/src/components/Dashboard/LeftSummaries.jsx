import React, {useEffect, useState} from 'react';
import QuickLinks from "./QuickLinks.jsx";
import {useAuth} from "../../contexts/AuthProvider.jsx";
import LatestLessonsTutor from "./LatestLessonsTutor.jsx";

const LeftSummaries = () => {
    const {user} = useAuth();
    const [name, setName] = useState("");
    useEffect(() => {
        setName(user?.name.split(" ")[0] || "Korepetytorze");
    }, [user]);

    return (
        <div className="w-full lg:w-[55%] p-4 lg:p-10 min-h-screen lg:h-screen flex flex-col justify-evenly gap-6 lg:gap-0">
            <div className="ml-2 lg:ml-10">
                <h1 className="gradient-text drop-shadow-2xl drop-shadow-secondary text-5xl lg:text-5xl font-semibold leading-tight">
                    Cześć, {name}
                </h1>
                <p className="text-lg lg:text-xl text-text/70 font-medium">
                    Witaj ponownie. Co dzisiaj chcesz zrobić?
                </p>
            </div>
            <QuickLinks />
            <LatestLessonsTutor />
        </div>
    );
};

export default LeftSummaries;
