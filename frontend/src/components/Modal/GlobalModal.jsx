import { useState } from "react";
import { useForm } from "../../contexts/FromContext.jsx";
import Modal from "./Modal";
import AddStudentForm from "../Forms/AddStudentForm.jsx";

export const GlobalModal = () => {
    const { activeForm, setActiveForm } = useForm();
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            setActiveForm(null);
        }, 300);
    };

    return (
        <Modal
            isOpen={!!activeForm}
            onClose={handleClose}
            closing={closing}
        >
            {activeForm === "student" && <AddStudentForm onSuccess={handleClose} />}
            {/* inne formularze */}
        </Modal>
    );
};