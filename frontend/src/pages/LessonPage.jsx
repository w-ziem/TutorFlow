import React, {useEffect, useState} from 'react';
import axiosInstance from "../utils/axiosInstance.jsx";
import {useAuth} from "../contexts/AuthProvider.jsx";
import {useParams} from "react-router-dom";
import LessonsMaterials from "../components/Dashboard/LessonsMaterials.jsx";
import {formatLink} from "../utils/HelperFunctions.js";

const LessonPage = () => {
    const [lesson, setLesson] = useState(null); // Zmiana na null
    const [loading, setLoading] = useState(true); // Dodanie loading state
    const [error, setError] = useState(null); // Dodanie error state
    const {id} = useParams();
    const {isStudent} = useAuth();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    console.log('ID:', id);
    console.log('Lesson:', lesson);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axiosInstance.get(`/lessons/${id}`);
                if (res.status === 200) {
                    setLesson(res.data);
                }
            } catch (err) {
                console.error('Error fetching lesson:', err);
                setError('Nie udało się załadować lekcji');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLesson();
        }
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <section>
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Ładowanie lekcji...</p>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section>
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            </section>
        );
    }

    // Brak danych
    if (!lesson) {
        return (
            <section>
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Nie znaleziono lekcji</p>
                </div>
            </section>
        );
    }

    // Render z danymi
    return (
        <section>
            <div className="flex flex-col p-20 m-10 ">
                <h1 className="text-5xl text-primary font-semibold">{lesson.topic}</h1>
                <h3 className="text-text text-2xl">{}</h3>
                {lesson.date && (
                    <p className="text-gray-500 mt-2 text-xl">
                        Data: {formatDate(lesson.date)}
                    </p>
                )}
                <hr className="my-4" />
                <p className="text-2xl font-semibold mb-20">Link do tablicy: <a href={formatLink(lesson.whiteboardLink)} target="_blank" className="underline text-secondary">{lesson.whiteboardLink}</a></p>
                <LessonsMaterials lessonId={id} />
            </div>

        </section>
    );
};

export default LessonPage;