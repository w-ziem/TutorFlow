import React, {useEffect, useState} from 'react';
import axiosInstance from "../utils/axiosInstance.jsx";
import {useParams} from "react-router-dom";
import {formatDate} from "../utils/HelperFunctions.js";
import {ClipLoader} from "react-spinners";
import ResponseFormatter from "/src/components/Ui/ReportFormatter.jsx"
import ReportFormatter from "/src/components/Ui/ReportFormatter.jsx";
import {Calendar} from "lucide-react";

const ReportPage = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();


    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axiosInstance.get(`/reports/${id}`);
                if (res.status === 200) {
                    setReport(res.data);
                }
            } catch (err) {
                console.error('Error fetching lesson:', err);
                setError('Nie udało się załadować lekcji');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchReport();
        }
    }, [id]);


    // Loading state
    if (loading) {
        return (
            <section>
                <div className="flex justify-center items-center h-64">
                   <ClipLoader size={150} color={"#123abc"} loading={loading} />
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
    if (!report) {
        return (
            <section>
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Nie znaleziono lekcji</p>
                </div>
            </section>
        );
    }

    // <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
    //     <h1 className="text-5xl font-bold text-primary mb-4 flex items-center gap-4">
    //         <User className="w-10 h-10 text-secondary" />
    //         {student.name}
    //     </h1>
    //     <div className="flex flex-col md:flex-row gap-6 text-lg text-text/80">
    //         <div className="flex items-center gap-3">
    //             <Mail className="w-6 h-6 text-secondary" />
    //             <a href={`mailto:${student.email}`} className="hover:underline">{student.email}</a>
    //         </div>
    //         <div className="flex items-center gap-3">
    //             <GraduationCap className="w-6 h-6 text-fuchsia-500" />
    //             <span>{student.educationLevel}</span>
    //         </div>
    //     </div>
    // </div>


    // Render z danymi
    return (
        <section className="relative">
            <div className="flex flex-col p-20 m-10 ">
                <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                    <div className="flex flex-col">
                        <h1 className="text-5xl text-primary font-semibold">Raport dla: <span className="text-secondary">{report.studentName}</span></h1>
                        {report.createdDate && (
                            <p className="text-primary mt-2 text-xl">
                               <Calendar className="inline mr-2" />  Data: {formatDate(report.createdDate)}
                            </p>
                        )}
                    </div>
                </div>

                {report.response && <ReportFormatter reportText={report.response}/>}
            </div>
        </section>
    );
};

export default ReportPage;