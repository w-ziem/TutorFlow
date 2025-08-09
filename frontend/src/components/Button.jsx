import React from 'react';


const baseStyles = "px-4 py-2 rounded-4xl"

const Button = ({onClick, children, variant="primary", className = "", type="button", ...props }) => {
    return (
        <button
        type={type}
        className={baseStyles + " " + className}
        onClick={onClick}
        {...props}>
            { children }
        </button>
    );
};

export default Button;