import React, {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import MaterialCard from "./Lists/MaterialCard.jsx";

const LessonsMaterials = ({lessonId}) => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [lessonId]);


    if (loading) {
        return <div>Ładowanie materiałów...</div>;
    }


    if (error) {
        return <div>Błąd podczas ładowania materiałów: {error}</div>;
    }

    if (materials.length === 0) {
        return <div>Brak materiałów dla tej lekcji</div>;
    }

    return (
        <>
            <h2 className="text-primary text-xl">dodane materiały:</h2>
            <div className="flex gap-4 flex-wrap">
                {materials.map((material, index) => (
                    <MaterialCard key={material.id || index} item={material} />
                ))}
            </div>
        </>
    );
};

export default LessonsMaterials;