import React, {useEffect, useState} from 'react';
import axiosInstance from "../utils/axiosInstance.jsx";
import {useParams} from "react-router-dom";
import LessonsMaterials from "../components/Dashboard/LessonsMaterials.jsx";
import {formatLink} from "../utils/HelperFunctions.js";
import {useForm} from "../contexts/FromContext.jsx";
import {formatDate} from "../utils/HelperFunctions.js";

const LessonPage = () => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshMaterials, setRefreshMaterials] = useState(0); // Stan do wymuszania przeładowania materiałów
    const {id} = useParams();
    const { openModal, setOnSuccessRefresh } = useForm();

    // Funkcja do odświeżania materiałów
    const handleRefreshMaterials = () => {
        setRefreshMaterials(prev => prev + 1);
    };

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

    useEffect(() => {
        setOnSuccessRefresh(handleRefreshMaterials);
    }, [setOnSuccessRefresh]);

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
        <section className="relative">
            <div className="flex flex-col p-20 m-10 ">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <h1 className="text-5xl text-primary font-semibold">{lesson.topic}</h1>
                        <h3 className="text-text text-2xl">{}</h3>
                        {lesson.date && (
                            <p className="text-gray-500 mt-2 text-xl">
                                Data: {formatDate(lesson.date)}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => {openModal("finishLesson", id);}}
                        className={`px-6 py-3 backdrop-blur-md border-2 text-xl font-[500] rounded-lg shadow ${
                            lesson.completed
                                ? 'border-gray-400 text-gray-500 cursor-default'
                                : 'border-secondary text-text cursor-pointer hover:scale-105 transition-all duration-300'
                        }`}
                        disabled={lesson.completed}
                    >
                        {lesson.completed ? 'Lekcja zakończona' : 'Zakończ lekcję'}
                    </button>
                </div>

                {!lesson.paid && Date.now() - new Date(lesson.date).getTime() > 7 * 24 * 60 * 60 * 1000 && (
                    <p className="text-red-600 font-semibold mt-2">
                        Uwaga! Lekcja nieopłacona od tygodnia!
                    </p>
                )}

                <hr className="my-4" />
                <p className="text-2xl font-semibold">Link do tablicy: <a href={formatLink(lesson.whiteboardLink)} target="_blank" className="underline text-secondary">{lesson.whiteboardLink}</a></p>
                {lesson.note && <p className="mb-20 text-lg text-text">Komentarz do lekcji: {lesson.note}</p>}
                <LessonsMaterials lessonId={id} refreshTrigger={refreshMaterials} />
            </div>
        </section>
    );
};

export default LessonPage;