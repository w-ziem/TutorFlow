import React, {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import MaterialCard from "./Lists/MaterialCard.jsx";
import {FaTurnDown} from "react-icons/fa6";
import {useForm} from "../../contexts/FromContext.jsx";
import {useAuth} from "../../contexts/AuthProvider.jsx";

const LessonsMaterials = ({lessonId, refreshTrigger}) => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {openModal} = useForm();
    const {isStudent, isTutor} = useAuth();

    useEffect(() => {
        const fetchRelatedMaterials = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axiosInstance.get(`/lessons/${lessonId}/materials`);
                setMaterials(response.data || []);
            } catch (err) {
                console.log("Error fetching related materials: " + err.message);
                setError(err.message);
                setMaterials([]);
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchRelatedMaterials();
        }
    }, [lessonId, refreshTrigger]);


    if (loading) {
        return <div>Ładowanie materiałów...</div>;
    }


    if (error) {
        return <div>Błąd podczas ładowania materiałów: {error}</div>;
    }

    if (materials.length === 0) {
        if(isTutor){
            return <div className="w-full">
                <p className="text-base md:text-lg text-primary">Brak materiałów dla tej lekcji, wciśnij przycisk aby
                    dodać <FaTurnDown className="text-primary text-lg md:text-xl inline ml-2"/></p>
                <button className="border-2 border-primary border-dashed p-3 md:p-4 cursor-pointer mt-3 text-sm md:text-base" onClick={() => {
                    openModal("materials", lessonId)
                }}>Dodaj materiał
                </button>
            </div>;
        }

        if(isStudent){
            return <div className="w-full">
                <p className="text-base md:text-lg text-primary">Brak materiałów dla tej lekcji</p>
            </div>;
        }
    }

    return (
        <>
            <h2 className="text-primary text-lg md:text-xl mb-3">dodane materiały:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {materials.map((material, index) => (
                    <MaterialCard key={material.id || index} item={material} />
                ))}
            </div>
            {isTutor && <button className="border-2 border-primary border-dashed p-3 md:p-4 cursor-pointer mt-4 text-sm md:text-base" onClick={() => {
                openModal("materials", lessonId)
            }}>Dodaj materiał</button>
            }        </>
    );
};

export default LessonsMaterials;