import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import QuickLinks from "./QuickLinks.jsx";

const LeftSummaries = () => {
    //TODO: name z AuthContext

    return (
        <div className="w-[60%] h-screen p-10">
            <h1 className="gradient-text drop-shadow-2xl drop-shadow-secondary text-5xl/18 line-2 font-semibold">Cześć, Korepetytorze</h1>
            //TODO: components
            <QuickLinks />

        </div>
    );
};

export default LeftSummaries;