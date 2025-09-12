import React, {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import {toast} from "react-hot-toast";
import reportImage from "/src/assets/report.svg";
import {ClipLoader} from "react-spinners";
import {FaX, FaCheck} from "react-icons/fa6";

const GenerateReportForm = ({onSuccess}) => {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [isFetching, setIsFetching] = useState(false);


    //fetch tutor's students on form load
    useEffect(() => {
        const fetchStudents = async () => {
            setIsFetching(true);
            try {
                const res = await axiosInstance.get("/students");
                setStudents(res.data);
            } catch (err) {
                console.error('Error:', err);
                toast.error("Nie udało się pobrać listy uczniów");
            }
            setIsFetching(false);
        };
        fetchStudents();
    }, []);


    // ux for button
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("studentId: ",  studentId);
        setIsSubmitting(true);
        try {
            const res = await axiosInstance.get(`/students/${studentId}/report`);
            console.log(res);
            if (res.status === 201) {
                setIsSubmitting(false);
                setIsSuccess(true);
                toast.success("Raport Został wygenerowany. Zobacz wyniki w sekcji raporty");
                onSuccess();
            }
        }catch (error) {
            setIsSubmitting(false);
            setIsError(true);
            if (error.response?.status === 404) {
                toast.error("Nie znaleziono ucznia.");
            }
            else {
                console.error('Error:', error);
                toast.error("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później")
            }
        }
    };

    // UI
    return (
        <div className="flex flex-col md:flex-row justify-between gap-6 min-h-[400px] p-6 bg-white rounded-lg border-1 border-primary">
            <div className="flex flex-col gap-4 flex-1">
                <h1 className="font-bold text-primary text-4xl leading-tight">
                    Wygeneruj raport AI
                </h1>
                <div className="flex-1 flex items-center">
                    <img
                        src={reportImage}
                        alt="Image of a online report generating"
                        className="w-full max-w-[300px] h-auto"
                    />
                </div>
            </div>

            {/* Prawa strona - formularz */}
            {isFetching ? <ClipLoader color={"blue"} size={50}/> : <div className="flex-1">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
                    <label
                        className="text-lg text-primary font-[550]"
                        htmlFor="studentId"
                    >
                        Wybierz ucznia
                    </label>
                    <select
                        id="studentId"
                        name="studentId"
                        value={studentId}
                        onChange={(e) => {
                            setStudentId(e.target.value);
                            console.log("studentId: ", e.target.value);
                        }
                        }
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
                                key={s.id}
                                value={s.id}
                                className="text-gray-500 hover:text-primary cursor-pointer transition-colors duration-300"
                            >
                                {s.name} ({s.educationLevel})
                            </option>
                        ))}
                    </select>


                    <button
                        type="submit"
                        className="bg-secondary text-white p-3 rounded-xl text-lg font-semibold flex justify-center items-center
                                 hover:bg-secondary/70 transition-all duration-300 mt-2"
                    >
                        {isSubmitting ? <ClipLoader className={"text-center"} color={'#fff'} loading={true}
                                                    size={15}/> : isSuccess ?
                            <FaCheck className={"text-center"} size={15}/> : isError ?
                                <FaX className={"text-center"} size={15}/> : <span>Generuj raport</span>}
                    </button>
                </form>
            </div>}
        </div>
    );
};

export default GenerateReportForm;