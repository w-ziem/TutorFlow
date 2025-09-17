import React from 'react';
import WeeklyProgress from "./WeeklyProgress.jsx";
import AttentionRequired from "./AttentionRequired.jsx";

const RightSummaries = () => {
    return (
        <div className="w-[40%] h-screen mr-15 mt-15 flex flex-col justify-evenly">
            <WeeklyProgress />
            <AttentionRequired />
        </div>
    );
};

export default RightSummaries;