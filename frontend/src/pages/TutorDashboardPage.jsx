import React from 'react';
import LeftSummaries from "../components/Dashboard/LeftSummaries.jsx";
import RightSummaries from "../components/Dashboard/RightSummaries.jsx";

const TutorDashboardPage = () => {

    return (
        <section className="w-full h-screen flex gap-5">
            {/*<div className="absolute w-[700px] h-[500px] bg-gradient-to-r from-secondary/60 to-fuchsia-600/50 rounded-full blur-[175px] top-50 left-170"></div>*/}
            <LeftSummaries />
            <RightSummaries />
        </section>
    );
};

export default TutorDashboardPage;