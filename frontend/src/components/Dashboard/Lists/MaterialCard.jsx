import React, {useEffect, useState} from 'react';
import axiosInstance from "../../../utils/axiosInstance.jsx";
import {formatDate} from "../../../utils/HelperFunctions.js";
import { useForm } from "../../../contexts/FromContext.jsx";

const MaterialCard = ({item}) => {
    const [lessonInfo, setLessonInfo] = useState();
    const { openModal } = useForm(); // Użyj hooka

    useEffect(() => {
        const fetchLessonInfo = async () => {
            try {
                const res = await axiosInstance.get(`/lessons/${item.lessonId}`);
                setLessonInfo(res.data);
            } catch (err) {
                console.error("Błąd pobierania lekcji:", err);
            }
        };

        fetchLessonInfo();
    }, []);

    const showFullNote = () => {
        openModal("fullnote", item);
    };

    switch(item.type) {
        case "TEXT":
            return <button 
                        onClick={showFullNote} 
                        className="flex gap-2 w-100 bg-white/80 cursor-pointer drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103 break-all text-left"
                    >
                        <div className="flex flex-col justify-evenly py-5 h-full w-full">
                            <h2 className="text-2xl font-semibold">{item.name}</h2>
                            <h2 className="text-xl max-w-4/5">{item.value.slice(0, 50)}...</h2>
                            {lessonInfo && (
                                <p className="text-lg text-gray-500">
                                    Lekcja: {lessonInfo.studentName} | {formatDate(lessonInfo.date)}
                                </p>
                            )}
                        </div>
                    </button>
        case "FILE":
            return <div>FILE</div>
        case "LINK":
            return <div>Link</div>
    }
};

export default MaterialCard;