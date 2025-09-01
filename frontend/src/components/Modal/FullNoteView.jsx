import React from 'react';
import { formatDate } from "../../utils/HelperFunctions.js";

const FullNoteView = ({ note, onClose }) => {
    if (!note) return null;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl w-full min-h-[300px] flex flex-col justify-between">
            <h1 className="text-4xl font-bold text-primary mb-2 text-center">{note.name}</h1>

            {/* Główna treść - jak linie w zeszycie */}
            <div className="text-text text-xl mx-20">
                {note.value}
            </div>

            {/* Przycisk zamknięcia */}

            <button
                onClick={onClose}
                className="px-6 py-2 bg-secondary text-white rounded hover:bg-secondary/80 transition duration-300 mx-50"
            >
                Zamknij
            </button>
        </div>
    );
};

export default FullNoteView;