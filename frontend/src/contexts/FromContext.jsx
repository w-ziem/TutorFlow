import {createContext, useContext, useRef, useState} from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [activeForm, setActiveForm] = useState(null);
    const [modalData, setModalData] = useState(null); // Nowe pole dla danych modalu
    const onSuccessRef = useRef(null);

    const setOnSuccessRefresh = (callback) => {
        onSuccessRef.current = callback;
    };

    const onSuccessRefresh = onSuccessRef.current;

    // Funkcja do otwierania modalu z danymi
    const openModal = (formType, data = null) => {
        setActiveForm(formType);
        setModalData(data);
    };

    // Funkcja do zamykania modalu
    const closeModal = () => {
        setActiveForm(null);
        setModalData(null);
    };

    return (
        <FormContext.Provider value={{ 
            activeForm, 
            setActiveForm, 
            modalData,
            openModal,
            closeModal,
            onSuccessRefresh, 
            setOnSuccessRefresh 
        }}>
            {children}
        </FormContext.Provider>
    );
};

// custom hook for ease of use
export const useForm = () => useContext(FormContext);