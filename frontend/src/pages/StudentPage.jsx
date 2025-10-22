import React, { useEffect, useState } from "react";
import StudentLessons from "../components/Dashboard/StudentLessons.jsx";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.jsx";
import { formatLink } from "../utils/HelperFunctions.js";
import { useForm } from "../contexts/FromContext.jsx";
import { ExternalLink, User, Mail, GraduationCap, BookOpen, DollarSign } from "lucide-react";

//todo: add option to edit link and rate
const StudentPage = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { openModal, setOnSuccessRefresh } = useForm();

    const [refreshLessons, setRefreshLessons] = useState(0);

    const handleRefreshLessons = () => {
        setRefreshLessons(prev => prev + 1);
    }



    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get(`/students/${id}`);
                if (res.status === 200) {
                    setStudent(res.data);
                }
            } catch (err) {
                console.error("Error fetching student:", err);
                setError("Nie udało się załadować danych studenta");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchStudent();
    }, [id]);

    if (loading) return <p>Ładowanie studenta...</p>;
    if (error) return <p>{error}</p>;
    if (!student) return <p>Nie znaleziono studenta</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
            {/* Header */}
            <div className="mb-6 md:mb-10 p-4 md:p-8 rounded-3xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3 md:mb-4 flex items-center gap-3 md:gap-4">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
                    {student.name}
                </h1>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-base md:text-lg text-text/80">
                    <div className="flex items-center gap-2 md:gap-3">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                        <a href={`mailto:${student.email}`} className="hover:underline break-all">{student.email}</a>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-tertiary" />
                        <span>{student.educationLevel}</span>
                    </div>
                </div>
                <div className="mt-5 flex items-center gap-3 text-sm text-text/80">
                    <button
                        onClick={() => {
                            openModal("lessons", student.email);
                            setOnSuccessRefresh(handleRefreshLessons);
                        }}
                        className="px-4 md:px-6 py-2 md:py-3 rounded-xl bg-gradient-to-r from-[#242E7C] to-[#5FA3F7] text-white font-semibold hover:scale-105 transition text-sm md:text-base"
                    >
                        Dodaj lekcję
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {/* Komunikacja */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-600/10 to-blue-500/5 backdrop-blur-xl border border-white/10 shadow-xl">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <ExternalLink className="w-6 h-6 text-secondary" /> Link komunikacyjny
                    </h3>
                    <a href={formatLink(student.communicationLink)} target="_blank" className="text-secondary hover:underline">
                        {student.communicationLink}
                    </a>
                </div>

                {/* Stawka */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 backdrop-blur-xl border border-white/10 shadow-xl">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-green-700" /> Stawka godzinowa
                    </h3>
                    <p className="text-2xl font-bold">{student.hourRate} zł</p>
                </div>

                {/* Lekcje */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/5 backdrop-blur-xl border border-white/10 shadow-xl">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-violet-400" /> Liczba lekcji
                    </h3>
                    <p className="text-2xl font-bold">{student.lessonCount}</p>
                </div>
            </div>

            <div className=" mt-10 relative p-8 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>

                <div className="relative z-10">
                  <StudentLessons studentId={id} refreshTrigger={refreshLessons}/>
                </div>
            </div>

        </div>
    );
};

export default StudentPage;
