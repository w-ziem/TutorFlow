import React, { useEffect, useState } from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import LessonCard from "./Lists/LessonCard.jsx";
import { Clock } from 'lucide-react';

const LatestLessons = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (

            <div className="relative p-8 rounded-2xl shadow-xl ml-8 max-h-[250px] overflow-y-auto scroll-smooth no-scrollbar bg-gradient-to-b from-secondary/10 to-sky-200/10 backdrop-blur-xl backdrop-filter backdrop-saturate-150">

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-text">Ostatnie Lekcje</h2>
                            <p className="text-text/60">Twoja najnowsza aktywność</p>
                        </div>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="relative">
                                <div className="w-12 h-12 border-3 border-blue-500/20 border-t-sky-500 rounded-full animate-spin"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {!data || data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="p-4 rounded-full bg-gray-500/10 w-fit mx-auto mb-4">
                                        <Clock className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <p className="text-xl text-text/60 font-medium">
                                        Brak lekcji do wyświetlenia
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {data.map((item, index) => (
                                        <LessonCard item={item} index={index} isMainDashboard={true} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

    );
};

export default LatestLessons;