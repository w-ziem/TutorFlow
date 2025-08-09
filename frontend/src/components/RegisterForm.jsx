import React, {useState} from 'react';
import {FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser, FaUserGraduate} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const navigation = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('api/auth/register', form);
        if (res.status === 201) {
            navigation('/login', {replace: true});
        } else {
            console.error('Registration error:', res.data.message);
            form.clear();
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full lg:w-1/2 gap-4 p-4 rounded-xl bg-white ">
            {/* Name Field */}
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-heading">
                    Imię i Nazwisko
                </label>
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jan Kowalski"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-heading"
                    />
                </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-heading">
                    Adres Email
                </label>
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jan@example.com"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-heading"
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-heading">
                    Hasło
                </label>
                <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Minimum 8 znaków"
                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-heading"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-secondary transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {/* Role Field */}
            <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-semibold text-heading">
                    Wybierz swoją rolę
                </label>
                <div className="relative">
                    <FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <select
                        id="role"
                        name="role"
                        required
                        value={form.role}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors duration-300 text-heading appearance-none bg-white"
                    >
                        <option value="" disabled>Wybierz rolę...</option>
                        <option value="TUTOR">Korepetytor</option>
                        <option value="STUDENT">Uczeń</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded focus:ring-secondary focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm text-text-secondary">
                    Akceptuję{' '}
                    <a href="#" className="text-secondary hover:underline font-semibold">
                        Warunki korzystania
                    </a>
                    {' '}oraz{' '}
                    <a href="#" className="text-secondary hover:underline font-semibold">
                        Politykę prywatności
                    </a>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
                Utwórz konto
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
                <p className="text-text-secondary">
                    Masz już konto?{' '}
                    <a href="/login" className="text-secondary hover:underline font-semibold">
                        Zaloguj się
                    </a>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;