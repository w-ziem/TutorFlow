import React, { useEffect, useState } from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import LessonCard from "./Lists/LessonCard.jsx";
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const LatestLessons = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchRecentLessons = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/lessons/recent");
            setData(response.data);
        } catch (err) {
            console.log("Error fetching recent lessons: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecentLessons();
    }, []);

    const nextLesson = () => {
        if (data && currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevLesson = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToLesson = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative p-8 rounded-2xl shadow-xl ml-8 max-h-[250px] bg-gradient-to-b from-secondary/10 to-sky-200/10 backdrop-blur-xl backdrop-filter backdrop-saturate-150">
            <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-text">Ostatnie Lekcje</h2>
                        <p className="text-text/60">Twoja najnowsza aktywność</p>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center flex-1">
                        <div className="relative">
                            <div className="w-12 h-12 border-3 border-blue-500/20 border-t-sky-500 rounded-full animate-spin"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        {!data || data.length === 0 ? (
                            <div className="text-center flex-1 flex flex-col justify-center">
                                <div className="p-4 rounded-full bg-gray-500/10 w-fit mx-auto mb-4">
                                    <Clock className="w-12 h-12 text-gray-400" />
                                </div>
                                <p className="text-xl text-text/60 font-medium">
                                    Brak lekcji do wyświetlenia
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Lesson Display Area */}
                                <div className="flex-1 relative overflow-hidden">
                                    <div
                                        className="flex transition-transform duration-300 ease-in-out h-full"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {data.map((item, index) => (
                                            <div key={index} className="w-full flex-shrink-0">
                                                <LessonCard item={item} index={index} isMainDashboard={true} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Navigation Arrows */}
                                    {data.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevLesson}
                                                disabled={currentIndex === 0}
                                                className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                                                    currentIndex === 0
                                                        ? 'bg-gray-300/20 text-gray-400 cursor-not-allowed'
                                                        : 'bg-white/20 hover:bg-white/30 text-text backdrop-blur-sm hover:scale-105'
                                                }`}
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={nextLesson}
                                                disabled={currentIndex === data.length - 1}
                                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                                                    currentIndex === data.length - 1
                                                        ? 'bg-gray-300/20 text-gray-400 cursor-not-allowed'
                                                        : 'bg-white/20 hover:bg-white/30 text-text backdrop-blur-sm hover:scale-105'
                                                }`}
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Dots Navigation */}
                                {data.length > 1 && (
                                    <div className="flex justify-center gap-2 mt-4 flex-shrink-0">
                                        {data.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToLesson(index)}
                                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                                    index === currentIndex
                                                        ? 'bg-sky-500 scale-125'
                                                        : 'bg-text/30 hover:bg-text/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestLessons;