import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children, closing }) {
    useEffect(() => {
        const escHandler = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", escHandler);
        }

        return () => document.removeEventListener("keydown", escHandler);
    }, [isOpen, onClose]);

    if (!isOpen && !closing) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 
                ${closing ? "animate-fadeOut" : "animate-fadeIn"}`}
            onClick={onClose}
        >
            {/* Tło */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            {/* Kontener */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-none rounded-xl shadow-lg p-1 w-fit z-10 max-h-[90vh] overflow-auto
                    ${closing ? "animate-slideDown" : "animate-slideUp"}`}
            >
                {children}
            </div>
        </div>
    );
}