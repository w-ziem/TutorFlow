import React, { useRef, useState } from "react";
import {FaLink} from "react-icons/fa";

const FileUpload = ({ onFileSelect }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 border-1 border-primary text-primary rounded-lg shadow hover:bg-gray-200/80 hover:translate-x-1 transition duration-300"
            >
                <FaLink className="inline " /> Wybierz plik
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {fileName && (
                <p className="mt-2 text-sm text-gray-600">Wybrano: {fileName}</p>
            )}
        </div>
    );
};

export default FileUpload;
