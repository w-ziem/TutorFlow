import React, {useEffect, useState} from 'react';
import {ClipLoader} from "react-spinners";
import axiosInstance from "../../utils/axiosInstance.jsx";
import {FaTurnDown} from "react-icons/fa6";
import MaterialCard from "./Lists/MaterialCard.jsx";
import LessonCard from "./Lists/LessonCard.jsx";

const StudentLessons = ({studentId, refreshTrigger}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axiosInstance.get(`/lessons/student/${studentId}`);
                setData(response.data || []);
            } catch (err) {
                console.log("Error fetching related materials: " + err.message);
                setError(err.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, [studentId, refreshTrigger]);

    if(loading) {
        return <ClipLoader color={"blue"} size={50} className="mt-30" />;
    }

    if(error) {
        return <div>Bład podczas ładowania lekcji!</div>
    }

    if (data.length === 0) {
        return <div className="w-100">
            <p className="text-lg text-primary">Brak lekcji dla tego ucznia</p>
        </div>;
    }

    return (
        <>
            <h2 className="text-primary text-xl mb-2">Lekcje: </h2>
            <div className="flex gap-4 flex-wrap">
                {data.map((lesson, index) => (
                <LessonCard key={lesson.id || index} item={lesson} />
                 ))}
            </div>
        </>
    );
};

export default StudentLessons;