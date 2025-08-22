import { useState } from "react";
import { useForm } from "../../contexts/FromContext.jsx";
import Modal from "./Modal";
import AddStudentForm from "../Forms/AddStudentForm.jsx";
import AddLessonForm from "../Forms/AddLessonForm.jsx";

export const GlobalModal = () => {
    const { activeForm, setActiveForm, onSuccessRefresh } = useForm();
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            setActiveForm(null);
        }, 300);
    };

    const handleSuccess = async () => {
        handleClose();
        console.log("onSuccess value:" + typeof onSuccessRefresh);
        console.log("onSuccessRefresh value:" + onSuccessRefresh);
        await onSuccessRefresh();
    }

    return (
        <Modal
            isOpen={!!activeForm}
            onClose={handleClose}
            closing={closing}
        >
            {activeForm === "students" && <AddStudentForm onSuccess={handleSuccess} />}
            {activeForm === "lessons" && <AddLessonForm onSuccess={handleSuccess} />}
            {/* inne formularze */}
        </Modal>
    );
};