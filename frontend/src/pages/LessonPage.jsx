import React, {useEffect, useState} from 'react';
import axiosInstance from "../utils/axiosInstance.jsx";
import {useParams} from "react-router-dom";
import LessonsMaterials from "../components/Dashboard/LessonsMaterials.jsx";
import {formatLink} from "../utils/HelperFunctions.js";
import {useForm} from "../contexts/FromContext.jsx";
import {formatDate} from "../utils/HelperFunctions.js";
import { Calendar, ExternalLink, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const LessonPage = () => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshMaterials, setRefreshMaterials] = useState(0);
    const {id} = useParams();
    const { openModal, setOnSuccessRefresh } = useForm();

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

    // Enhanced Loading State
    if (loading) {
        return (
            <div className="relative min-h-screen overflow-hidden">
                {/* Background Effects */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute w-[600px] h-[400px] bg-gradient-to-br from-secondary/40 via-fuchsia-400/20 to-cyan-400/10 rounded-full blur-[200px] top-1/4 right-1/4 animate-pulse"></div>
                    <div className="absolute w-[400px] h-[300px] bg-gradient-to-tl from-violet-500/15 via-rose-400/10 to-amber-300/5 rounded-full blur-[150px] bottom-1/4 left-1/4 animate-pulse delay-1000"></div>
                </div>

                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="relative mb-6">
                            <div className="w-20 h-20 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto"></div>
                            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-fuchsia-400/50 rounded-full animate-spin animation-delay-150 mx-auto"></div>
                        </div>
                        <p className="text-2xl text-text/70 font-medium">Ładowanie lekcji...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Enhanced Error State
    if (error) {
        return (
            <div className="relative min-h-screen overflow-hidden">
                <div className="fixed inset-0 -z-10">
                    <div className="absolute w-[600px] h-[400px] bg-gradient-to-br from-red-500/20 via-rose-400/15 to-pink-400/10 rounded-full blur-[200px] top-1/4 right-1/4 animate-pulse"></div>
                </div>

                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <p className="text-2xl text-red-500 font-medium">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="relative min-h-screen overflow-hidden">
                <div className="fixed inset-0 -z-10">
                    <div className="absolute w-[600px] h-[400px] bg-gradient-to-br from-gray-500/20 via-slate-400/15 to-gray-400/10 rounded-full blur-[200px] top-1/4 right-1/4 animate-pulse"></div>
                </div>

                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <p className="text-2xl text-text/70 font-medium">Nie znaleziono lekcji</p>
                    </div>
                </div>
            </div>
        );
    }

    const isOverdue = !lesson.paid && Date.now() - new Date(lesson.date).getTime() > 7 * 24 * 60 * 60 * 1000;

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute w-[900px] h-[700px] bg-gradient-to-br from-secondary/50 via-fuchsia-400/25 to-cyan-400/15 rounded-full blur-[300px] -top-40 -right-40 animate-pulse"></div>
                <div className="absolute w-[700px] h-[500px] bg-gradient-to-tl from-violet-500/20 via-rose-400/15 to-amber-300/10 rounded-full blur-[250px] bottom-40 -left-40 animate-pulse delay-1000"></div>

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]"
                     style={{
                         backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                         backgroundSize: '60px 60px'
                     }}>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen backdrop-blur-[1px] bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">

                    {/* Header Card */}
                    <div className="mb-12">
                        <div className="relative p-10 rounded-3xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                            {/* Inner glow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-secondary/5 to-fuchsia-400/5"></div>

                            <div className="relative z-10">
                                {/* Header Content */}
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
                                    <div className="flex-1">
                                        <h1 className="text-5xl lg:text-6xl text-primary font-bold mb-4 leading-tight">
                                            {lesson.topic}
                                        </h1>

                                        {lesson.date && (
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 rounded-xl bg-secondary/10 backdrop-blur-sm">
                                                    <Calendar className="w-6 h-6 text-secondary" />
                                                </div>
                                                <p className="text-xl text-text/80 font-medium">
                                                    {formatDate(lesson.date)}
                                                </p>
                                            </div>
                                        )}

                                        {/* Status indicator */}
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl backdrop-blur-sm ${
                                                lesson.completed ? 'bg-green-500/10' : 'bg-orange-500/10'
                                            }`}>
                                                {lesson.completed ?
                                                    <CheckCircle2 className="w-6 h-6 text-green-600" /> :
                                                    <Clock className="w-6 h-6 text-orange-700" />
                                                }
                                            </div>
                                            <span className={`text-lg font-medium ${
                                                lesson.completed ? 'text-green-600' : 'text-orange-700'
                                            }`}>
                                                {lesson.completed ? 'Zakończona' : 'W trakcie'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={() => {openModal("finishLesson", id);}}
                                            className={`group relative px-8 py-4 rounded-2xl font-semibold text-xl transition-all duration-300 ${
                                                lesson.completed
                                                    ? 'bg-gray-500/20 text-gray-400 cursor-default border border-gray-500/20'
                                                    : 'bg-gradient-to-r from-[#242E7C] to-[#5FA3F7] text-white cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-secondary/20 border border-secondary/20'
                                            }`}
                                            disabled={lesson.completed}
                                        >
                                            {!lesson.completed && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                            )}
                                            <span className="relative">
                                                {lesson.completed ? 'Lekcja zakończona' : 'Zakończ lekcję'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Warning Alert */}
                    {isOverdue && (
                        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-xl border border-red-500/20 shadow-xl">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-red-500/20">
                                    <AlertTriangle className="w-8 h-8 text-red-600" />
                                </div>
                                <p className="text-xl font-semibold text-red-600">
                                    Uwaga! Lekcja nieopłacona od tygodnia!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Content Cards */}
                    <div className="grid gap-8">

                        {/* Whiteboard Link Card */}
                        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-cyan-500/10 backdrop-blur-sm">
                                        <ExternalLink className="w-7 h-7 text-secondary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text">Link do tablicy</h3>
                                </div>

                                <a
                                    href={formatLink(lesson.whiteboardLink)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-xl text-secondary transition-colors duration-300 font-medium hover:underline group"
                                >
                                    <span>{lesson.whiteboardLink}</span>
                                    <ExternalLink className="w-5 h-7 mb-1 inline group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>

                        {/* Note Card */}
                        {lesson.note && (
                            <div className="relative p-8 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-purple-500/5"></div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-text mb-4">Komentarz do lekcji</h3>
                                    <p className="text-lg text-text/80 leading-relaxed">{lesson.note}</p>
                                </div>
                            </div>
                        )}

                        {/* Materials Section */}
                        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>

                            <div className="relative z-10">
                                <LessonsMaterials lessonId={id} refreshTrigger={refreshMaterials} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade effect */}
            <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"></div>
        </div>
    );
};

export default LessonPage;

