import React, {useState, useEffect} from 'react';
import {FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser, FaUserGraduate} from "react-icons/fa";
import {Link, useNavigate, useLocation} from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import {useAuth} from "../../contexts/AuthProvider.jsx"
import {toast} from "react-hot-toast";
import {FaArrowDown} from "react-icons/fa6";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const location = useLocation();
    const {login} = useAuth();
    const BASE_URL = import.meta.env.VITE_API_URL;


    // Odbierz stan z nawigacji
    useEffect(() => {
        if (location.state) {
            const { isNewAccount, isAlreadyExistingAccount, message } = location.state;
            
            if (isNewAccount || isAlreadyExistingAccount) {
                setNotification({
                    type: isNewAccount ? 'success' : 'info',
                    message: message
                });
                
                // Wyczyść notyfikację po 5 sekundach
                setTimeout(() => setNotification(null), 5000);
            }
        }
    }, [location.state]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [form, setForm] = useState({
        email: '',
        password: ''
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
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, form);
            const token = response.data.token;

            localStorage.setItem('token', token);
            const payload = jwtDecode(token);

            if(login(token)) {
                navigation(`/dashboard-${payload.role.toLowerCase()}`, {replace: true});
            }
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error("Email lub hasło są niepoprawne!");
            }
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    const handleDemoLogin = async (role) => {
        try{
            const res = await axios.post("api/auth/login", {
                email: role === "TUTOR" ? "tutor@example.com" : "student@example.com",
                password: "password123"
            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            const payload = jwtDecode(token);

            if(login(token)) {
                navigation(`/dashboard-${payload.role.toLowerCase()}`, {replace: true});
            }
            toast.success("Zalogowano na konto testowe");
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            toast.error("Błąd logowania, prosimy o kontakt z administratorem.");
        }
    }

    return (
        <div className="flex flex-col w-full lg:w-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 p-4 rounded-xl bg-white ">
            {/* Popup z notyfikacją */}
            {notification && (
                <div className={`p-4 mb-4 rounded-xl ${
                    notification.type === 'success' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                    <div className="flex justify-between items-center">
                        <span>{notification.message}</span>
                        <button 
                            onClick={() => setNotification(null)}
                            className="text-xl font-bold hover:opacity-70"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

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


            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
                Zaloguj się
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
                <p className="text-text-secondary">
                    Nie masz jeszcze konta?{' '}
                    <Link to="/signup" className="text-secondary hover:underline font-semibold">
                        Zarejestruj się
                    </Link>
                </p>
            </div>


        </form>
        {/* Demo */}
        <div className="flex flex-col gap-4 p-4 items-center rounded-xl bg-white mb-4">
            <p className="text-center font-semibold text-secondary">Zobacz demo!</p>
            <FaArrowDown className="text-center text-primary" />
            <button className="w-full bg-gradient-to-r from-secondary/80 to-primary/80 hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    onClick={() => {handleDemoLogin("TUTOR")}}>Zaloguj jako korepetytor
            </button>
            <button className="w-full bg-gradient-to-r from-secondary/80 to-primary/80 hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    onClick={() => {handleDemoLogin("STUDENT")}}>Zaloguj jako uczeń
            </button>
        </div>
    </div>
    );
};

export default LoginForm;