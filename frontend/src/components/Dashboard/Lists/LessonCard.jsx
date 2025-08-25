import React from 'react';
import {NavLink} from "react-router-dom";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};



const LessonCard = ({item, isMainDashboard=false}) => {
    const className = isMainDashboard ? "bg-white drop-shadow-lg to-sky-200/60 rounded-[25px] w-100 shadow-gray-300/100 p-5 transition duration-300 hover:scale-103" : "flex gap-2 w-100 bg-white/80 drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103";

    if (!item) {
        return <div>Brak danych do wyświetlenia</div>
    }

    return (
        <NavLink to={`${item.id}`} className={className}>
            <div className="flex flex-col justify-between py-5 h-full">
                <h2 className="text-xl font-semibold">{item.topic}</h2>
                <div className="mt-auto">
                    <h2 className="text-xl font-[500]">{item.studentName}</h2>
                    <p className="text-lg text-gray-500">{formatDate(item.date)}</p>
                </div>
            </div>
        </NavLink>
    );
};

export default LessonCard;