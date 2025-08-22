import React from "react";
import StudentCard from "./StudentCard.jsx";

const ListCards = ({ items, renderCard }) => {
    if (!items || !Array.isArray(items)) {
        return <div>Brak danych do wyświetlenia</div>;
    }

    return (
        <div className="flex flex-wrap gap-4">
            {items.map((item, index) =>
                renderCard && renderCard(item, index)
            )}
        </div>
    );
};

export default ListCards;