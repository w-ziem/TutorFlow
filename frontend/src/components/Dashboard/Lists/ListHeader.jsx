import React from "react";

const ListHeader = ({ heading, description, buttonLabel, onAdd }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-6xl font-semibold text-primary">{heading}</h1>
                <p className="text-text">{description}</p>
            </div>
            <button
                onClick={onAdd}
                className="px-6 py-3 backdrop-blur-md border-2 border-secondary text-text text-xl font-[500] rounded-lg shadow cursor-pointer hover:scale-105 transition-all duration-300"
            >
                {buttonLabel}
            </button>
        </div>
    );
};

export default ListHeader;
