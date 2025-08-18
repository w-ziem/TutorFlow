import React from 'react';

const CardInfo = ({children}) => {
    return (
        <div className="p-1 text-lg font-[600] border-1 border-text-secondary/20 rounded-xl h-20 w-47 flex justify-center items-center">
            {children}
        </div>
    );
};

export default CardInfo;