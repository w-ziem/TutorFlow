import React, {useState, useEffect} from 'react';
import {FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser, FaUserGraduate} from "react-icons/fa";
import {Link, useNavigate, useLocation} from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const location = useLocation();
    
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
            const response = await axios.post('api/auth/login', form);
            localStorage.setItem('token', response.data.token);
            const payload = jwtDecode(response.data.token);
            localStorage.setItem('payload', JSON.stringify(payload));
            navigation(`/dashboard-${payload.role.toLowerCase()}`, {replace: true});

        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            form.clear();
        }
    };

    //TODO: AuthContext - wywołanie login po zalogowaniu aby zapisać rzeczy
    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full lg:w-1/2 gap-4 p-4 rounded-xl bg-white ">
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
    );
};

export default LoginForm;