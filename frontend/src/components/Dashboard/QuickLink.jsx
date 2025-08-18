import React from 'react';

const QuickLink = ({icon: Icon, onClick, name}) => {
    return (
        <button onClick={onClick} className="rounded-xl w-[300px] h-[100px] border-1 backdrop-blur-md shadow-lg p-4 flex flex-col gap-2 justify-between cursor-pointer hover:scale-102 transition-all duration-300 hover:bg-text-secondary/20">
            <p className="text-lg font-semibold text-start">{name}</p>
            <Icon size={18} style={{color: "black"}}/>
        </button>
    );
};

export default QuickLink;