import React from 'react';
import {useForm} from "../../contexts/FromContext.jsx";

const QuickLinks = () => {
    const {setActiveForm} = useForm();

    return (

        <section className="flex gap-5 items-center">
            <button onClick={() => {setActiveForm("student")}}>dodaj ucznia</button>
        </section>
    );
};

export default QuickLinks;