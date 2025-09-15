// import React from 'react';
//
// const QuickLink = ({icon: Icon, onClick, name}) => {
//     return (
//         <button onClick={onClick} className="rounded-xl w-[300px] h-[100px] border-1 backdrop-blur-md shadow-lg p-4 flex flex-col gap-2 justify-between cursor-pointer hover:scale-102 transition-all duration-300 hover:bg-text-secondary/20">
//             <p className="text-lg font-semibold text-start">{name}</p>
//             <Icon size={18} style={{color: "black"}}/>
//         </button>
//     );
// };
//
// export default QuickLink;

import React from 'react';

const QuickLink = ({ icon: Icon, onClick, name, gradient, iconColor, borderColor, index }) => {
    return (
        <button
            onClick={onClick}
            className={`group relative p-6 rounded-xl backdrop-blur-xl border ${borderColor} cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>

            {/* Hover glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300`}></div>

            <div className="relative z-10 flex flex-col items-start gap-4 h-full">
                <div className="flex-1">
                    <p className="text-lg font-bold text-text text-left leading-tight">
                        {name}
                    </p>
                </div>

                <div className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </button>
    );
};

export default QuickLink;