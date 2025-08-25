import React from 'react';
import {useForm} from "../../contexts/FromContext.jsx";
import QuickLink from "./QuickLink.jsx";
import {FaUserGraduate, FaBook, FaNewspaper, FaRobot} from "react-icons/fa"

const QuickLinks = () => {
    const {setActiveForm} = useForm();

    return (

        <section className="flex gap-5 items-center mt-6 z-10">
            <QuickLink onClick={() => {setActiveForm("students")}} icon={FaUserGraduate} name="Dodaj ucznia"/>
            <QuickLink onClick={() => {setActiveForm("lessons")}} icon={FaBook} name="Utwórz nową lekcję"/>
            <QuickLink onClick={() => {setActiveForm("materials")}} icon={FaNewspaper} name="Dodaj materiały"/>
            <QuickLink onClick={() => {setActiveForm("reports")}} icon={FaRobot} name="Wygeneruj raport AI"/>
        </section>
    );
};

export default QuickLinks;