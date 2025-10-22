import React from "react";
import { useAuth } from "../../../contexts/AuthProvider";

const ListHeader = ({ heading, description, buttonLabel, onAdd }) => {
    const { isTutor } = useAuth()

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
            <div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-primary">{heading}</h1>
                <p className="text-sm md:text-base text-text">{description}</p>
            </div>
            {isTutor && (
                <button
                    onClick={onAdd}
                    className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 backdrop-blur-md border-2 border-secondary text-text text-base md:text-xl font-[500] rounded-lg shadow cursor-pointer hover:scale-105 transition-all duration-300"
                >
                    {buttonLabel}
                </button>)}

        </div>
    );
};

export default ListHeader;
