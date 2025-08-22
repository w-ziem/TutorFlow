import React from 'react';
import StudentCard from "./StudentCard.jsx";
import LessonCard from "./LessonCard.jsx";

const ListCard = ({item, type}) => {
        switch (type) {
            case "students":
                return <StudentCard item={item} />;
            case "lessons":
                return <LessonCard item={item} />;
            //TODO: więcej typów (materiał, raporty)
            default:
                return <div>Brak karty dla typu: {type}</div>;
        }
};

export default ListCard;