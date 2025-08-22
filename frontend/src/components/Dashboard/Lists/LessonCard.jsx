import React from 'react';
import {NavLink} from "react-router-dom";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};


const LessonCard = ({item}) => {
    if (!item) {
        return <div>Brak danych do wyświetlenia</div>
    }

    return (
        <NavLink to={`${item.id}`}className="flex gap-2 w-100 bg-white/80 drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103">
            <div className="flex flex-col gap-1 py-5 justify-between">
                <h2 className="text-xl font-semibold">{item.topic}</h2>
                <h2 className="text-xl font-[500]">{item.studentName}</h2>
                <p className="text-lg text-gray-500">{formatDate(item.date)}</p>
            </div>
        </NavLink>
    );
};

export default LessonCard;