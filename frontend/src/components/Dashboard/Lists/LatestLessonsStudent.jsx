import React, {useEffect, useState} from 'react';
import {ClipLoader} from "react-spinners";
import axiosInstance from "/src/utils/axiosInstance.jsx";
import {formatDate, getGradeColor} from "../../../utils/HelperFunctions.js";
import {ChevronRight, Calendar, Clock, CheckCircle, DollarSign, TrendingUp} from "lucide-react";
import {NavLink} from "react-router-dom";

const LatestLessonsStudent = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get("/lessons/recent");
                const data = res.data;
                setLessons(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                window.location.reload();
            }
        }
        fetchLessons()
    }, []);


    if(loading) {
        return () => {
            <ClipLoader loading={loading} size={50} color="blue" />;
        }
    }

    return (
        <div className="relative p-8 rounded-2xl mt-10 shadow-xl h-fit bg-gradient-to-b from-secondary/5 to-sky-500/5 backdrop-blur-xl backdrop-filter backdrop-saturate-150">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 backdrop-blur-sm">
                    <Clock className="w-7 h-7 text-green-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-text">Ostatnie Lekcje</h2>
                    <p className="text-text/60">Twoja najnowsza aktywność</p>
                </div>
            </div>

            <NavLink to="lessons"
                     className="text-blue-600 hover:text-blue-700 font-medium text-md flex items-center gap-1 absolute top-10 right-15">
                Zobacz wszystkie
                <ChevronRight className="w-4 h-4"/>
            </NavLink>


                <div className="space-y-3">
                         {lessons.map((lesson) => (
                    <NavLink to={`lessons/${lesson.id}`} key={lesson.id} className="flex items-center justify-between p-4 bg-gray-100/70 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{lesson.topic}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(lesson.date)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{lesson.duration}m</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-center">
                                <div className={`text-lg font-bold ${getGradeColor(lesson.grade)}`}>
                                    {lesson.grade}/10
                                </div>
                                <div className="text-xs text-gray-500">ocena</div>
                            </div>

                            <div className={`p-2 rounded-lg ${lesson.paid ? 'bg-green-100' : 'bg-red-100'}`}>
                                {lesson.paid ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                    <DollarSign className="w-4 h-4 text-red-600" />
                                )}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default LatestLessonsStudent;