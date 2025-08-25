import React from 'react';
import LeftSummaries from "../components/Dashboard/LeftSummaries.jsx";
import RightSummaries from "../components/Dashboard/RightSummaries.jsx";

const TutorDashboardPage = () => {

    return (
        <section className="w-full h-screen flex gap-5 overflow-hidden bg-white/40 backdrop-blur-xl">
            <div className="absolute w-[900px] h-[300px] bg-secondary/70 rounded-[20px] blur-[250px] bottom-1/5 right-20 -z-10"></div>
            <div className="absolute w-[400px] h-[200px] bg-fuchsia-500/80 rounded-full blur-[200px] bottom-50 left-30 -z-10"></div>
            <div className="absolute w-[300px] h-[100px] bg-yellow-300 rounded-full blur-[100px] top-20 right-30 -z-10"></div>
            <LeftSummaries />
            <RightSummaries />
        </section>
    );
};

export default TutorDashboardPage;