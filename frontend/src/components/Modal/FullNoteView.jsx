import React from 'react';
import { formatDate } from "../../utils/HelperFunctions.js";

const FullNoteView = ({ note, onClose }) => {
    if (!note) return null;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-xl w-full min-h-[300px] flex flex-col justify-between gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2 text-center break-words">{note.name}</h1>

            {/* Główna treść - jak linie w zeszycie */}
            <div className="text-text text-base md:text-xl mx-4 md:mx-20 overflow-auto">
                {note.value}
            </div>

            {/* Przycisk zamknięcia */}

            <button
                onClick={onClose}
                className="px-6 py-2 bg-secondary text-white rounded hover:bg-secondary/80 transition duration-300 mx-auto md:mx-50"
            >
                Zamknij
            </button>
        </div>
    );
};

export default FullNoteView;