import {createContext, useContext, useRef, useState} from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [activeForm, setActiveForm] = useState(null);
    const onSuccessRef = useRef(null);

    const setOnSuccessRefresh = (callback) => {
        console.log("LOG: Setting callback function:", typeof callback);
        console.log("LOG: Callback is:", callback);
        onSuccessRef.current = callback;
        console.log("LOG: After setting - ref.current:", typeof onSuccessRef.current);
    };

    const onSuccessRefresh = onSuccessRef.current;

    return (
        <FormContext.Provider value={{ activeForm, setActiveForm, onSuccessRefresh, setOnSuccessRefresh }}>
            {children}
        </FormContext.Provider>
    );
};

// custom hook for ease of use
export const useForm = () => useContext(FormContext);
