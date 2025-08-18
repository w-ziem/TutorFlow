import React from "react";
import CardInfo from "../../Ui/CardInfo.jsx";


const formatLink = (link) => {
    if (!link) return '#';
    if (link.startsWith('http://') || link.startsWith('https://')) {
        return link;
    }
    return `https://${link}`;
};

const ListCard = ({ item }) => {
    // Dodaj sprawdzenie czy item istnieje
    if (!item) {
        return (
            <div className="rounded-2xl shadow-md bg-white p-4 flex flex-col gap-2">
                <p className="text-red-500">Błąd: Brak danych</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl shadow-md items-center w-fit h-fit border-text-secondary border-1 p-6 flex flex-col gap-2 hover:shadow-lg transition">
            <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.name || 'Unknown'}`}
                alt={item.name || 'Unknown'}
                className="w-16 h-16 rounded-full"
            />
            <h3 className="text-3xl font-semibold">{item.name}</h3>
            <p className="text-lg text-gray-500">{item.email}</p>
            <a href={formatLink(item.communicationLink)} target="_blank" className="text-md text-blue-700">{item.communicationLink }</a>
            <div className="flex gap-2">
                <CardInfo >{item.educationLevel }</CardInfo>
                <CardInfo >{item.hourRate}zł/h</CardInfo>
                <CardInfo>odbytych lekcji: {item.lessonCount}</CardInfo>
            </div>
        </div>
    );
};
export default ListCard;
