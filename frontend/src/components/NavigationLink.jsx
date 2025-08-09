import React from 'react';
import NavLink from "react-router-dom";

const baseStyles= "text-white hover:text-secondary ease-[0.3] transition-all"

const NavigationLink = ({path='/', styles='', children,...props}) => {
    return (
        <NavLink to={path} className={baseStyles + "" +  styles} {...props}>
            {children}
        </NavLink>
    );
};

export default NavLink;