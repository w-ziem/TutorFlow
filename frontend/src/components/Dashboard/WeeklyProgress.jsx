import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, BadgeDollarSign, DollarSign } from 'lucide-react';
import axiosInstance from "../../utils/axiosInstance.jsx";

const WeeklyProgress = () => {
    const [stats, setStats] = useState({
        lessonsThisWeek: 0,
        averageGrade: 0,
        earningsThisWeek: 0,
        averageHourRate: 0,
    });

    const fetchWeeklyStats = async () => {
        try{
            const response = await axiosInstance.get("/stats/weekly");
            const data = await response.data;
            setStats(data);
        }catch(err){
            console.log("Error fetching weekly stats: " + err.message);
            window.reload();
        }
    };

    useEffect(() => {
        fetchWeeklyStats();
    }, []);

    const statCards = [
        {
            label: "Lekcje w tym tygodniu",
            value: stats.lessonsThisWeek,
            icon: Calendar,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10"
        },
        {
            label: "Średnia stawka",
            value: `${stats.averageHourRate.toFixed(2)}zł/h`,
            icon: BadgeDollarSign,
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10"
        },
        {
            label: "Zarobki tygodniowe",
            value: `${stats.earningsThisWeek.toFixed(2)}zł`,
            icon: DollarSign,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10"
        },
        {
            label: "Średnia ocena",
            value: `${stats.averageGrade.toFixed(2)}`,
            icon: TrendingUp,
            color: "text-orange-400",
            bgColor: "bg-orange-500/10"
        }
    ];

    return (
        <div className="mt-8">
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-purple-500/5"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-violet-500/10 backdrop-blur-sm">
                            <TrendingUp className="w-7 h-7 text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-text">Postępy Tygodniowe</h2>
                            <p className="text-text/60">Twoja aktywność w bieżącym tygodniu</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        {statCards.map((stat, index) => (
                            <div
                                key={index}
                                className="relative p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:scale-105 transition-all duration-300"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className={`absolute inset-0 rounded-xl ${stat.bgColor} opacity-30`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <p className="text-[1.3rem] font-bold text-text mb-1">{stat.value}</p>
                                    <p className="text-sm text-text/60 leading-tight">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyProgress;