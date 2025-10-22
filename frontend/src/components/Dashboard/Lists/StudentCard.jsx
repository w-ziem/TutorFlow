import React from "react";
import {NavLink} from "react-router-dom";
import {formatLink} from "/src/utils/HelperFunctions.js";


const StudentCard = ({ item }) => {
    if (!item) {
        return (
            <div className="rounded-2xl shadow-md bg-white p-4 flex flex-col gap-2">
                <p className="text-red-500">Błąd: Brak danych</p>
            </div>
        );
    }

    return (
        <NavLink to={`${item.id}`} className="rounded-xl flex flex-col sm:flex-row gap-3 md:gap-2 w-full bg-white/40 drop-shadow-md shadow-gray-300/100 p-4 md:p-5 transition duration-300 hover:scale-103">
            <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.name || 'Unknown'}`}
                alt={item.name || 'Unknown'}
                className="w-20 h-20 md:w-25 md:h-25 rounded-full p-3 md:p-5 mx-auto sm:mx-0"
            />
            <div className="flex flex-col gap-1 py-2 md:py-5 justify-between">
                <h3 className="text-2xl md:text-3xl font-semibold">{item.name}</h3>

                <div>
                    <p className="text-base md:text-lg text-gray-500 break-all">{item.email}</p>
                    <p className="text-primary font-[550]" >{item.educationLevel}</p>
                    <p className="text-sm md:text-base">{item.hourRate}zł/h</p>
                    <p className="text-sm md:text-base">odbytych lekcji: {item.lessonCount}</p>

                    <a href={formatLink(item.communicationLink)} target="_blank" className="text-sm md:text-md text-secondary font-semibold underline break-all">{item.communicationLink }</a>
                </div>
            </div>
        </NavLink>
    );
};
export default StudentCard;
