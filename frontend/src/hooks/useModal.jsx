import { useState } from "react";

export default function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const toggleModal = () => setIsOpen((prev) => !prev);

    return { isOpen, openForm: openModal, closeForm: closeModal, toggleForm: toggleModal };
}
