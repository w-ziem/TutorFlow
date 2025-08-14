import React from 'react';
import LeftSummaries from "../components/Dashboard/LeftSummaries.jsx";
import RightSummaries from "../components/Dashboard/RightSummaries.jsx";

const TutorDashboardPage = () => {

    return (
        <section className="w-full h-screen flex gap-5">
            {/*<div></div>  background bubbles*/}
            <LeftSummaries />
            <RightSummaries />
        </section>
    );
};

export default TutorDashboardPage;