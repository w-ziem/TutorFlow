import React from 'react';
import loginImage from "../assets/login.svg";
import LoginForm from "../components/LoginForm.jsx";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-tertiary/70 via-secondary/20 to-primary/25 flex items-center justify-center py-12 px-4">
            <div className="w-3/5">
                <div className="bg-white rounded-2xl shadow-2xl shadow-secondary/70 p-10 space-y-6 flex justify-between items-center">
                    <LoginForm />

                    {/* Header */}
                    <div className="w-1/2 rounded-xl p-4 flex flex-col gap-4">
                        <h2 className="text-7xl font-bold text-heading gradient-text">
                            Zaloguj się do TutorFlow
                        </h2>
                        <img src={loginImage} className="w-full" alt=""/>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-6">
                    <p className="text-sm text-text-secondary">
                        🔒 Twoje dane są bezpieczne i szyfrowane
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;