import React from "react";
import StudentCard from "./StudentCard.jsx";

const ListCards = ({ items, renderCard }) => {
    if (!items || !Array.isArray(items)) {
        return <div>Brak danych do wyświetlenia</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {items.map((item, index) =>
                renderCard && renderCard(item, index)
            )}
        </div>
    );
};

export default ListCards;