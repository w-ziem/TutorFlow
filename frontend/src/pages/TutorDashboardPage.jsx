import React from 'react';
import LeftSummaries from "../components/LeftSummaries.jsx";
import RightSummaries from "../components/RightSummaries.jsx";

const TutorDashboardPage = () => {

    return (
        <section className="w-full h-screen flex gap-5">
            {/*<div></div>  background bubbles*/}
            //Todo: components
            <LeftSummaries />
            <RightSummaries />
        </section>
    );
};

export default TutorDashboardPage;