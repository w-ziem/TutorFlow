import React, {useEffect, useState} from 'react';
import axiosInstance from "../../../utils/axiosInstance.jsx";
import {formatDate} from "../../../utils/HelperFunctions.js";
import { useForm } from "../../../contexts/FromContext.jsx";
import {FaExternalLinkAlt, FaDownload} from "react-icons/fa";
import {toast} from "react-hot-toast";

const MaterialCard = ({item}) => {
    const [lessonInfo, setLessonInfo] = useState();
    const { openModal } = useForm();

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

    const downloadAsset = async () => {
        try {
            const res = await axiosInstance.get(`/materials/${item.id}/download`, {
                responseType: "blob"
            });
            const mimeType = res.headers["content-type"];
            const blob = new Blob([res.data], { type: mimeType });
            const url = window.URL.createObjectURL(blob);


            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.name);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err){
            if (err.response?.status === 400) {
                toast.error("Uszkodzony plik!");
            }else {
                toast.error("Bład pobierania materiałów, spróbuj ponownie później.");
                console.log("Error downloading asset: " + err.message);
            }
        }
    }



    switch(item.type) {
        case "TEXT":
            return <button 
                        onClick={showFullNote} 
                        className="gap-2 w-100 bg-white/80 cursor-pointer drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103 break-all text-left"
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
            return <button onClick={downloadAsset}
                        className="flex flex-col justify-evenly relative gap-2 w-100 bg-white/80 cursor-pointer drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103 break-all text-left">
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p className="text-xl max-w-4/5">{item.value}</p>
                {lessonInfo && (
                    <p className="text-lg text-gray-500">
                        Lekcja: {lessonInfo.studentName} | {formatDate(lessonInfo.date)}
                    </p>
                )}
                <div className="absolute top-5 right-5">
                    <FaDownload className="text-xl text-primary"/>
                </div>
            </button>
        case "LINK":
            return <a href={item.value} target="_blank" className="flex flex-col justify-evenly relative gap-2 w-100 bg-white/80 cursor-pointer drop-shadow-md shadow-gray-300/100 p-5 transition duration-300 hover:scale-103 break-all text-left">
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p className="text-xl max-w-4/5">{item.value}</p>
                {lessonInfo && (
                    <p className="text-lg text-gray-500">
                        Lekcja: {lessonInfo.studentName} | {formatDate(lessonInfo.date)}
                    </p>
                )}
                <div className="absolute top-5 right-5">
                    <FaExternalLinkAlt className="text-xl text-primary"/>
                </div>
            </a>
    }
};

export default MaterialCard;