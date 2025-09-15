import React from 'react';
import QuickLink from "./QuickLink.jsx";
import { Plus, Calendar, Newspaper, Settings, BarChart3} from 'lucide-react';
import {FaRobot} from "react-icons/fa"
import { useForm } from "../../contexts/FromContext.jsx";

const QuickLinks = () => {
    const { openModal } = useForm();

    const quickActions = [
        {
            name: "Dodaj Ucznia",
            icon: Plus,
            onClick: () => openModal("students"),
            gradient: "from-emerald-500/20 to-teal-500/20",
            iconColor: "text-emerald-400",
            borderColor: "border-emerald-500/20"
        },
        {
            name: "Zaplanuj Lekcję",
            icon: Calendar,
            onClick: () => openModal("lessons"),
            gradient: "from-purple-500/20 to-fuchsia-500/20",
            iconColor: "text-purple-400",
            borderColor: "border-purple-500/20"
        },
        {
            name: "Dodaj Materiały",
            icon: Newspaper,
            onClick: () => openModal("materials"),
            gradient: "from-blue-700/30 to-sky-700/20",
            iconColor: "text-blue-700",
            borderColor: "border-blue-700/20"
        },
        {
            name: "Wygeneruj Raport AI",
            icon: FaRobot,
            onClick: () => openModal("reports"),
            gradient: "from-gray-500/20 to-slate-500/20",
            iconColor: "text-gray-400",
            borderColor: "border-gray-500/20"
        }
    ];

    return (
            <div className="relative p-8 rounded-2xl">
                <div className="absolute inset-0 rounded-2xl"></div>

                <div className="relative z-10">

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickActions.map((action, index) => (
                            <QuickLink
                                key={index}
                                {...action}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default QuickLinks;