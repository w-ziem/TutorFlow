
import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance.jsx';
import toast from 'react-hot-toast';
import TextInput from "../Ui/TextInput.jsx";
import {FaInfo} from "react-icons/fa6";

const FinishLessonForm = ({ lessonId, onSuccess }) => {
    const [formData, setFormData] = useState({
        grade: '',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zmiana z formData.rating na formData.grade
        if (!formData.grade) {
            toast.error('Proszę wystawić ocenę');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await axiosInstance.post(`/lessons/${lessonId}/finish`, {
                grade: Number(formData.grade),
                comment: formData.comment || null
            });

            if (response.status === 200) {
                toast.success('Lekcja została zakończona pomyślnie!');
                onSuccess?.();
            }
        } catch (error) {
            console.error('Błąd podczas kończenia lekcji:', error);
            toast.error('Wystąpił błąd podczas kończenia lekcji');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[500px] min-w-[500px] p-6 bg-white rounded-lg border-1 border-primary flex flex-col justify-evenly items-center">
            <h2 className="text-3xl text-center font-semibold text-primary mb-6">Zakończ lekcję</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
                <div>
                    <label htmlFor="grade" className="block text-primary font-semibold text-xl mb-2">
                        Oceń poziom zrozumienia tematu przez ucznia
                    </label>
                    <select
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={(e) => {setFormData({ ...formData, grade: e.target.value})}} // Usunięto Number() żeby wartość była stringiem do sprawdzenia
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                    >
                        <option value="">Wybierz ocenę</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <TextInput
                    title="Uwagi / Komentarz (opcjonalnie)"
                    placeholder="Tutaj wpisz swoje uwagi, notatki, wnioski, itp."
                    value={formData.comment}
                    id="comment"
                    onChange={handleInputChange}
                    required={false} // Dodano required={false} jeśli komentarz ma być opcjonalny
                />

                <button
                    type="submit"
                    className="bg-secondary text-white p-3 rounded-xl text-lg font-semibold hover:bg-secondary/70 transition-all duration-300 mt-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Zapisywanie...' : 'Zakończ'}
                </button>

                <p className="text-gray-600 max-w-[500px] text-center"> <FaInfo className="inline mb-1"/> Rzetelne wypełnianie formularza kończącego lekcje pozwala na generowanie dokładniejszych raportów i umożliwia wykorzystanie pełnego potencjału pomocnika AI</p>

            </form>
        </div>
    );
};

export default FinishLessonForm;