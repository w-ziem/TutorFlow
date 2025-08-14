import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [activeForm, setActiveForm] = useState(null);

    return (
        <FormContext.Provider value={{ activeForm, setActiveForm }}>
            {children}
        </FormContext.Provider>
    );
};

// custom hook for ease of use
export const useForm = () => useContext(FormContext);
