import React, {useEffect, useState} from 'react';
import {useForm} from "../../contexts/FromContext.jsx";
import axiosInstance from "../../utils/axiosInstance.jsx";
import {toast} from "react-hot-toast";
import InputField from "../Ui/InputField.jsx";
import lessonImage from "/src/assets/lesson.svg";

const AddLessonForm = ({onSuccess}) => {
    const [students, setStudents] = useState([]);
    const [data, setData] = useState({
        topic: '',
        studentEmail: ''
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axiosInstance.get("/students");
                setStudents(res.data);
            } catch (err) {
                toast.error("Nie udało się pobrać listy uczniów");
            }
        };
        fetchStudents();
    }, []);

    const {setActiveForm} = useForm();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };

    //TODO: handle different responses eg. not your student etc.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/lessons', data);
            console.log(res);
            if (res.status === 201) {
                toast.success("Utworzono nową lekcję")
                onSuccess();
            }
        }catch (error) {
            if (error.response?.status === 404) {
                toast.error("Nie znaleziono ucznia.");
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
                    Utwórz nową lekcję
                </h1>
                <div className="flex-1 flex items-center">
                    <img
                        src={lessonImage}
                        alt="Image of a student"
                        className="w-full max-w-[300px] h-auto"
                    />
                </div>
            </div>

            {/* Prawa strona - formularz */}
            <div className="flex-1">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
                    <label
                        className="text-lg text-primary font-[550]"
                        htmlFor="studentEmail"
                    >
                        Wybierz ucznia
                    </label>
                    <select
                        id="studentEmail"
                        name="studentEmail"
                        value={data.studentEmail}
                        onChange={handleChange}
                        className="mb-2 border-b-2 border-gray-300 p-2 text-lg text-gray-500 font-[550]
                           focus:outline-0 focus:border-b-secondary transition-all duration-300
                         hover:text-primary cursor-pointer"
                        required
                    >
                        <option value="" disabled className="text-gray-400">
                            wybierz ucznia
                        </option>
                        {students.map((s) => (
                            <option
                                key={s.email}
                                value={s.email}
                                className="text-gray-500 hover:text-primary cursor-pointer transition-colors duration-300"
                            >
                                {s.name} ({s.educationLevel})
                            </option>
                        ))}
                    </select>


                    <InputField
                        id="topic"
                        type="text"
                        title="Temat lekcji"
                        placeholder="np. Wielomiany: schemat hornera"
                        value={data.topic}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-secondary text-white p-3 rounded-xl text-lg font-semibold
                                 hover:bg-secondary/70 transition-all duration-300 mt-2"
                    >
                        Utwórz lekcję
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLessonForm;