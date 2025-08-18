import React, { useState } from 'react';
import studentImage from "../../assets/student.svg";
import InputField from "../Ui/InputField.jsx";
import {useForm} from "../../contexts/FromContext.jsx";
import axiosInstance from "../../utils/axiosInstance.jsx";
import {toast} from "react-hot-toast";

const AddStudentForm = ({ onSuccess }) => {
    const [data, setData] = useState({
        email: '',
        communicationLink: '',
        hourlyRate: '',
        educationLevel: ''
    });

    const {setActiveForm} = useForm();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/students', data);
            console.log(res);
            if (res.status === 201) {
                toast.success("Przypisano nowego ucznia.")
                onSuccess();
            }
        }catch (error) {
            if (error.response.status === 404) {
                toast.error("Nie znaleziono ucznia.");
            }
            else if (error.response.status === 409) {
                toast.error("Uczeń jest juz do ciebie przypisany.");
            }
            else {
                console.error('Error:', error);
                toast.error("Wystąpił nieoczekiwany błąd.")
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between gap-6 min-h-[400px] p-6 bg-white rounded-lg border-1 border-primary">
            <div className="flex flex-col gap-4 flex-1">
                <h1 className="font-bold text-primary text-4xl leading-tight">
                    Weź ucznia pod swoje skrzydła
                </h1>
                <div className="flex-1 flex items-center">
                    <img
                        src={studentImage}
                        alt="Image of a student"
                        className="w-full max-w-[300px] h-auto"
                    />
                </div>
            </div>

            {/* Prawa strona - formularz */}
            <div className="flex-1">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
                    <InputField
                        id="email"
                        type="email"
                        title="Email ucznia"
                        placeholder="jan@example.com"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        id="communicationLink"
                        type="text"
                        title="Link do komunikacji"
                        placeholder="np. meet.google.com/xas-weqs-ffa"
                        value={data.communicationLink}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        id="educationLevel"
                        type="text"
                        title="Poziom edukacji"
                        placeholder="np. matura podstawowa"
                        value={data.educationLevel}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        id="hourlyRate"
                        type="number"
                        title="Stawka godzinowa"
                        placeholder="100"
                        value={data.hourlyRate}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-secondary text-white p-3 rounded-xl text-lg font-semibold
                                 hover:bg-secondary/70 transition-all duration-300 mt-2"
                    >
                        Dodaj ucznia
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;