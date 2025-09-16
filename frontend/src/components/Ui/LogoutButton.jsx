import React from 'react';
import {useAuth} from "../../contexts/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {LogOut} from "lucide-react";

const LogoutButton = () => {
    const {logout} = useAuth();
    const navigation = useNavigate();

    const handleLogout = () => {
        logout();
        navigation("/");
        toast.success("wylogowano");
    }


    return (
        <button onClick={handleLogout} className="p-3 ml-2 text-left border-1 bg-none backdrop-blux-2xl text-primary shadow-xl cursor-pointer border-primary rounded-full font-[500] text-lg w-4/5 transition duration-300 hover:bg-primary/20 hover:translate-x-2">
            <LogOut className="inline mr-1 ml-1 mb-0.5 rotate-180" size={18}/> Wyloguj się
        </button>
    );
};

export default LogoutButton;