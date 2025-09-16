import React, {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import MaterialCard from "./Lists/MaterialCard.jsx";
import {FaTurnDown} from "react-icons/fa6";
import {useForm} from "../../contexts/FromContext.jsx";

const LessonsMaterials = ({lessonId, refreshTrigger}) => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {openModal} = useForm();

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
        return <div className="w-100">
                <p className="text-lg text-primary">Brak materiałów dla tej lekcji, wciśnij przycisk aby dodać <FaTurnDown className="text-primary text-xl inline ml-2" /></p>
            <button className="border-2 border-primary border-dashed p-4 cursor-pointer" onClick={() => {openModal("materials", lessonId)}}>Dodaj materiał</button>

        </div>;
    }

    return (
        <>
            <h2 className="text-primary text-xl">dodane materiały:</h2>
            <div className="flex gap-4 flex-wrap">
                {materials.map((material, index) => (
                    <MaterialCard key={material.id || index} item={material} />
                ))}
            </div>
            <button className="border-2 border-primary border-dashed p-4 cursor-pointer" onClick={() => {openModal("materials", lessonId)}}>Dodaj materiał</button>
        </>
    );
};

export default LessonsMaterials;