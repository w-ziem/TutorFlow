import React, {useEffect} from 'react';
import loginImage from "../assets/login.svg";
import LoginForm from "../components/Forms/LoginForm.jsx";
import {Link, useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import {useAuth} from "../contexts/AuthProvider.jsx";
import {jwtDecode} from "jwt-decode";

const LoginPage = () => {
    const { isAuthenticated, loading, tryRefreshToken, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const attemptAutoLogin = async () => {
            console.log('Attempting auto-login...');
            console.log("token: ", token)
            const payload = jwtDecode(token);
            if (!loading && !isAuthenticated) {
                console.log('Attempting auto-login with refresh token...');
                const success = await tryRefreshToken();
                const payload = jwtDecode(token);
                if (success) {
                    console.log('Auto-login successful, redirecting to dashboard');
                    navigate(`/dashboard-${payload.role.toLowerCase()}`);
                }
            } else if (isAuthenticated) {
                navigate(`/dashboard-${payload.role.toLowerCase()}`);
            }
        };

        attemptAutoLogin();
    }, [loading, isAuthenticated, tryRefreshToken, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-tertiary/70 via-secondary/20 to-primary/25 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-4xl lg:max-w-6xl">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl shadow-secondary/70 p-6 sm:p-10 space-y-4 sm:space-y-6 flex flex-col lg:flex-row lg:justify-between items-center gap-6 lg:gap-0">
                    <LoginForm />
                    {/* Header and Image */}
                    <div className="w-full lg:w-1/2 rounded-xl p-2 sm:p-4 flex flex-col gap-4 text-center lg:text-left">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-heading gradient-text leading-tight text-center">
                            Zaloguj się do TutorFlow
                        </h2>
                        <img src={loginImage} className="w-full max-w-xs sm:max-w-sm lg:max-w-full mx-auto lg:mx-0" alt="Login illustration" />
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-4 sm:mt-6 min-h-16 sm:h-20 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 group">
                    <p className="text-xs sm:text-sm text-text-secondary">
                        🔒 Twoje dane są bezpieczne i szyfrowane
                    </p>
                    <Link className="text-primary font-bold rounded-lg sm:rounded-xl p-2 sm:p-3 border-1 transition text-sm sm:text-base" to="/" >
                        <FaArrowLeft className="inline mr-1 mb-0.5 group-hover:-translate-x-1 transition-transform duration-300" />
                        Powrót na stronę główną
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;