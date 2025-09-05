import { useState } from "react";
import { useForm } from "../../contexts/FromContext.jsx";
import Modal from "./Modal";
import AddStudentForm from "../Forms/AddStudentForm.jsx";
import AddLessonForm from "../Forms/AddLessonForm.jsx";
import AddMaterialForm from "../Forms/AddMaterialForm.jsx";
import FullNoteView from "../Modal/FullNoteView.jsx";
import FinishLessonForm from "../Forms/FinishLessonForm.jsx";

export const GlobalModal = () => {
    const { activeForm, modalData, closeModal, onSuccessRefresh } = useForm();
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            closeModal(); // Użyj nowej funkcji z kontekstu
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
            {activeForm === "materials" && <AddMaterialForm onSuccess={handleSuccess} />}
            {activeForm === "fullnote" && <FullNoteView note={modalData} onClose={handleClose} />}
            {activeForm === "finishLesson" && <FinishLessonForm onSuccess={handleSuccess} lessonId={modalData} />}
            {/* inne formularze */}
        </Modal>
    );
};