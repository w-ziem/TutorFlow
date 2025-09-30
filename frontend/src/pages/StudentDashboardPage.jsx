import React from 'react';
import WelcomeHeader from '/src/components/Dashboard/WelcomeHeader.jsx';
import WeeklyProgress from "../components/Dashboard/WeeklyProgress.jsx";
import LatestLessonsStudent from "../components/Dashboard/Lists/LatestLessonsStudent.jsx";
import PaymentStatus from "../components/Dashboard/PaymentStatus.jsx";
import {useAuth} from "../contexts/AuthProvider.jsx";

const StudentDashboardPage = () => {
    return (
        <div className="px-20 py-5">
            <div className="absolute w-[900px] h-[300px] bg-secondary/50 rounded-[20px] blur-[250px] bottom-1/5 right-20 -z-10"></div>
            <div className="absolute w-[400px] h-[200px] bg-fuchsia-500/50 rounded-full blur-[200px] bottom-50 left-30 -z-10"></div>
            <div className="absolute w-[300px] h-[100px] bg-yellow-300/80 rounded-full blur-[100px] top-20 right-30 -z-10"></div>

            <WelcomeHeader />
            <WeeklyProgress />
            <LatestLessonsStudent />
            <PaymentStatus />
        </div>
    );
};

export default StudentDashboardPage;