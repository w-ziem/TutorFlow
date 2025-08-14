import React, {useState} from 'react';
import {FaUser, FaEnvelope, FaLock, FaUserGraduate, FaEye, FaEyeSlash, FaArrowLeft} from 'react-icons/fa';
import registerImage from "../assets/register.svg";
import RegisterForm from "../components/Forms/RegisterForm.jsx";
import {Link} from "react-router-dom";

const RegisterPage = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-tertiary/70 via-secondary/20 to-primary/25 flex items-center justify-center py-12 px-4">
            <div className="w-fit">
                <div className="bg-white rounded-2xl shadow-2xl shadow-secondary/70 p-10 space-y-6 flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
                    {/* Header */}
                    <div className="w-full text-center lg:w-1/2 lg:text-start rounded-xl p-4 flex flex-col gap-4">
                        <h2 className="text-5xl  md:text-7xl lg:text-7xl font-bold text-heading gradient-text">
                            Dołącz do TutorFlow
                        </h2>
                        <p className="text-text mt-2">
                            Stwórz konto i zacznij organizować swoje korepetycje
                        </p>
                        <img src={registerImage} className="w-full hidden lg:block" alt=""/>
                    </div>

                    <RegisterForm />
                </div>

                {/* Additional Info */}
                <div className="text-center mt-6 h-20 flex flex-wrap items-center justify-center gap-4 group">
                    <p className="text-sm text-text-secondary">
                        🔒 Twoje dane są bezpieczne i szyfrowane
                    </p>
                    <Link className="text-primary font-bold rounded-xl p-3 border-1 transition" to="/" >
                        <FaArrowLeft className="inline mr-1 mb-0.5 group-hover:-translate-x-1 transition-transform duration-300" />
                        Powrót na stronę główną
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;