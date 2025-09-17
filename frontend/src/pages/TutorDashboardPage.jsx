import React from 'react';
import LeftSummaries from "../components/Dashboard/LeftSummaries.jsx";
import RightSummaries from "../components/Dashboard/RightSummaries.jsx";

const TutorDashboardPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute w-[900px] h-[300px] bg-secondary/50 rounded-[20px] blur-[250px] bottom-1/5 right-20 -z-10"></div>
            <div className="absolute w-[400px] h-[200px] bg-fuchsia-500/50 rounded-full blur-[200px] bottom-50 left-30 -z-10"></div>
            <div className="absolute w-[300px] h-[100px] bg-yellow-300/80 rounded-full blur-[100px] top-20 right-30 -z-10"></div>

            <section className="relative z-10 w-full min-h-screen flex bg-white/[0.02] backdrop-blur-[1px]">
                <LeftSummaries />
                <RightSummaries />
            </section>
        </div>
    );
};

export default TutorDashboardPage;