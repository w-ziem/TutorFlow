import React from 'react';

const LinkInput = ({value, onChange, title, id, placeholder, className=''}) => {
    const inputClass = "mb-2 border-b-2 border-gray-300 p-2 text-lg text-primary font-[550] focus:outline-0 focus:border-b-secondary focus:scale-105 transition-all duration-300" + className;
    const labelClass = "text-lg text-primary font-[550] ";

    return (
        <>
            <label htmlFor={id} className={labelClass} >{title}</label>
            <input id={id} type="text" placeholder={placeholder} className={inputClass} value={value} onChange={onChange}/>
        </>
    );
};

export default LinkInput;