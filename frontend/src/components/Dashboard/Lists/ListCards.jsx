import React from "react";
import ListCard from "./ListCard.jsx";

const ListCards = ({ items, renderCard }) => {
    if (!items || !Array.isArray(items)) {
        return <div>Brak danych do wyświetlenia</div>;
    }

    return (
        <div className="flex flex-wrap gap-4">
            {items.map((item, index) =>
                renderCard ? renderCard(item, index) : <ListCard key={item.id || index} item={item} />
            )}
        </div>
    );
};

export default ListCards;