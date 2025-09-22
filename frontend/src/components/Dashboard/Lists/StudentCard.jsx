import React from "react";
import CardInfo from "../../Ui/CardInfo.jsx";
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
        <NavLink to={`${item.id}`} className="rounded-xl flex gap-2 w-100 bg-white/40 drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103">
            <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.name || 'Unknown'}`}
                alt={item.name || 'Unknown'}
                className="w-25 h-25 rounded-full p-5"
            />
            <div className="flex flex-col gap-1 py-5 justify-between">
                <h3 className="text-3xl font-semibold">{item.name}</h3>

                <div>
                    <p className="text-lg text-gray-500">{item.email}</p>
                    <p className="text-primary font-[550]" >{item.educationLevel}</p>
                    <p>{item.hourRate}zł/h</p>
                    <p>odbytych lekcji: {item.lessonCount}</p>

                    <a href={formatLink(item.communicationLink)} target="_blank" className="text-md text-secondary font-semibold underline">{item.communicationLink }</a>
                </div>
            </div>
        </NavLink>
    );
};
export default StudentCard;
