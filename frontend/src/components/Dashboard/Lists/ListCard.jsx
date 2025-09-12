import React from 'react';
import StudentCard from "./StudentCard.jsx";
import LessonCard from "./LessonCard.jsx";
import MaterialCard from "./MaterialCard.jsx";
import ReportCard from "./ReportCard.jsx";

const ListCard = ({item, type}) => {
        switch (type) {
            case "students":
                return <StudentCard item={item} />;
            case "lessons":
                return <LessonCard item={item} />;
            case "materials":
                return <MaterialCard item={item} />;
            case "reports":
                return <ReportCard item={item} />;
            default:
                return <div>Brak karty dla typu: {type}</div>;
        }
};

export default ListCard;