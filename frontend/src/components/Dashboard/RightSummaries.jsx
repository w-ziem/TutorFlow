import React from 'react';
import WeeklyProgress from "./WeeklyProgress.jsx";
import AttentionRequired from "./AttentionRequired.jsx";

const RightSummaries = () => {
    return (
        <div className="w-full lg:w-[40%] min-h-screen lg:h-screen mr-0 lg:mr-15 mt-0 lg:mt-15 p-4 lg:p-0 flex flex-col justify-evenly gap-6 lg:gap-0">
            <WeeklyProgress />
            <AttentionRequired />
        </div>
    );
};

export default RightSummaries;