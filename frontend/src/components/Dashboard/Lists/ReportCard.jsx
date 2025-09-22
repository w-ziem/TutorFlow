import React from 'react';
import {NavLink} from "react-router-dom";
import {formatDate} from "../../../utils/HelperFunctions.js";

const ReportCard = ({item}) => {
    return (
        <NavLink to={`/dashboard-tutor/reports/${item.id}`} className="rounded-xl flex gap-2 w-100 bg-white/40 drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103">
            <div className="flex flex-col justify-between py-5 h-full">
                <h2 className="text-xl font-semibold">{item.studentName}</h2>
                <h2 className="text-xl ">wygenerowano: {formatDate(item.createdDate)}</h2>
            </div>
        </NavLink>
    );
};

export default ReportCard;