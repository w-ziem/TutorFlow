import React, {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";

const LessonsMaterials = ({lessonId}) => {
    const [materials, setMaterials] = useState(null);

    useEffect(() => {
        const fetchRelatedMaterials = async () => {
            try {
                const response = await axiosInstance.get(`/lessons/${lessonId}/materials`);
                setMaterials(response.data);
            } catch (err) {
                console.log("Error fetching related materials: " + err.message);
            }
        }
        fetchRelatedMaterials();
    }, [lessonId]);

    return (
        <div className="w-[60%] bg-secondary">
            TU BEDA MATERIAŁY JAK BEDZIE DLA NICH ENDPOINT I CRUD Z MATERIALAMI
        </div>
    );
};

export default LessonsMaterials;