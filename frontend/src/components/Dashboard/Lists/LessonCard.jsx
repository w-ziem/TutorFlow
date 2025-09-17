import React from 'react';
import {NavLink} from "react-router-dom";
import {FaCircle} from "react-icons/fa";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};



const LessonCard = ({item, isMainDashboard=false}) => {
    const className = isMainDashboard ? "text-center w-fit mx-5 transition duration-300 hover:scale-102" : "rounded-xl flex gap-2 w-100 bg-white/80 drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103";

    if (!item) {
        return <div>Brak danych do wyświetlenia</div>
    }

    return (
        <NavLink to={`/dashboard-tutor/lessons/${item.id}`} className={className}>
            <div className="flex flex-col justify-between py-5 h-fit">
                <h2 className="text-xl font-semibold">{item.topic}</h2>
                <div className="mt-auto">
                    <h2 className="text-xl font-[500]">{item.studentName}</h2>
                    <p className="text-lg text-gray-500">{formatDate(item.date)}</p>
                    {item.paid ? <p><FaCircle className="text-green-500 inline"/> opłacona</p> : <p ><FaCircle className="text-red-600 inline"/> nieopłacona</p>}
                </div>
            </div>
        </NavLink>
    );
};

export default LessonCard;