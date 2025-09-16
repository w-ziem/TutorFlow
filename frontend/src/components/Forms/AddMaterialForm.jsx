import React, {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import {toast} from "react-hot-toast";
import {useForm} from "../../contexts/FromContext.jsx";
import materialImage from "/src/assets/material.svg"
import TextInput from "../Ui/TextInput.jsx";
import LinkInput from "../Ui/LinkInput.jsx";
import FileUpload from "../Ui/FileUpload.jsx";
import {formatDate} from "../../utils/HelperFunctions.js";
import InputField from "../Ui/InputField.jsx";

const AddMaterialForm = ({onSuccess}) => {
    const [lessons, setLessons] = useState([]);
    const [data, setData] = useState({
        type: '',
        value: '',
        name: ''
    });
    const [file, setFile] = useState(null);
    const [lessonId, setLessonId] = useState(null);
    const {modalData} = useForm();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await axiosInstance.get("/lessons");
                setLessons(res.data);
            } catch (err) {
                toast.error("Nie udało się pobrać listy dostępnych lekcji");
            }
        };
        fetchLessons();
        setLessonId(modalData?.toString() || "");
    }, []);

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
            // Zawsze używamy FormData - backend oczekuje części "data"
            const formData = new FormData();

            // Dodajemy część "data" jako JSON Blob
            formData.append(
                "data",
                new Blob([JSON.stringify({
                    type: data.type,
                    value: data.value,
                    name: data.name
                })], { type: "application/json" })
            );

            // Jeśli typ to FILE i mamy plik, dodajemy go jako część "file"
            if (data.type === "FILE" && file) {
                formData.append("file", file);
            }

            const response = await axiosInstance.post(
                `/lessons/${lessonId}/materials`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Dodano materiały");
                onSuccess();
                setData({ type: "", value: "" });
                setFile(null);
                setLessonId(null);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("Nie znaleziono lekcji.");
            } else if (error.response?.status === 400) {
                toast.error("Nieprawidłowe dane. Sprawdź formularz.");
            } else {
                console.error('Error:', error);
                toast.error("Wystąpił nieoczekiwany błąd.");
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between gap-6 min-h-[400px] p-6 bg-white rounded-lg border-1 border-primary">
            <div className="flex flex-col gap-4 flex-1">
                <h1 className="font-bold text-primary text-4xl leading-tight">
                    Dodaj materiały
                </h1>
                <div className="flex-1 flex items-center">
                    <img
                        src={materialImage}
                        alt="Image of a material"
                        className="w-full max-w-[300px] h-auto"
                    />
                </div>
            </div>

            <div className="flex-1">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
                    <label className="text-lg text-primary font-[550]">
                        Wybierz lekcję
                    </label>
                    <select
                        value={lessonId ?? ""}
                        onChange={(e) => setLessonId(Number(e.target.value))}
                        className="mb-2 border-b-2 border-gray-300 p-2 text-lg text-gray-500 font-[550]
                           focus:outline-0 focus:border-b-secondary transition-all duration-300
                         hover:text-primary cursor-pointer"
                        required
                    >
                        <option value="" disabled>
                            wybierz lekcję
                        </option>
                        {lessons.map((s) => (
                            <option key={s.id} value={s.id}>
                                {`${s.topic} | ${s.studentName} | ${formatDate(s.date)}`}
                            </option>
                        ))}
                    </select>

                    <InputField
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={handleChange}
                            title="Podaj nazwę"
                            placeholder="np. Czworokąty: zadania cz.1"
                    />

                    <label className="text-lg text-primary font-[550]">
                        Wybierz typ przesyłanego materiału
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                        className="mb-2 border-b-2 border-gray-300 p-2 text-lg text-gray-500 font-[550]
                           focus:outline-0 focus:border-b-secondary transition-all duration-300
                         hover:text-primary cursor-pointer"
                        required
                    >
                        <option value="" disabled>
                            typ materiału
                        </option>
                        <option value="TEXT">Notatka tekstowa</option>
                        <option value="FILE">Plik</option>
                        <option value="LINK">Link</option>
                    </select>

                    {data.type === "TEXT" && (
                        <TextInput
                            title="Tekst"
                            placeholder="Tutaj wpisz notatkę"
                            value={data.value}
                            id="value"
                            onChange={handleChange}
                            required
                        />
                    )}
                    {data.type === "LINK" && (
                        <LinkInput
                            title="Podaj link"
                            placeholder="np. wikipedia.pl/orangutan"
                            value={data.value}
                            onChange={handleChange}
                            id="value"
                            required
                        />
                    )}
                    {data.type === "FILE" && (
                        <FileUpload onFileSelect={setFile} />
                    )}

                    <button
                        type="submit"
                        className="bg-secondary text-white p-3 rounded-xl text-lg font-semibold
                                 hover:bg-secondary/70 transition-all duration-300 mt-2"
                        disabled={!lessonId || !data.type || (data.type !== "FILE" && !data.value) || (data.type === "FILE" && !file)}
                    >
                        Dodaj materiał
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMaterialForm;