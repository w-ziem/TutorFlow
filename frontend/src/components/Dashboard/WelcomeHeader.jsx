import React, {useEffect, useState} from 'react';
import {useAuth} from "../../contexts/AuthProvider.jsx";
import axiosInstance from "../../utils/axiosInstance.jsx";


const WelcomeHeader = () => {
    const {user, userId,isStudent} = useAuth();
    const name = user?.name.split(" ")[0] || "Użytkowniku";
    const [tutor, setTutor] = useState(null);

    const fetchTutor = async () => {
        try{
            const res = await axiosInstance.get(`students/${userId}/tutor`);
            const data = res.data;
            setTutor(data.data);
        } catch (error) {
            console.log(error);
            setTutor("Brak");
        }
    }

    useEffect(() => {
        isStudent && fetchTutor();
    }, [userId]);


    return (
        <div className="ml-10">
            <h1 className="gradient-text drop-shadow-2xl drop-shadow-secondary text-5xl/18 line-2 font-semibold">Cześć, {name}</h1>
            <p className="text-xl text-text/70 font-medium">
                Witaj ponownie. Co dzisiaj chcesz zrobić?
            </p>
            {isStudent && <p className="text-sm text-text/70 mt-2">
                Twój korepetytor: <span className="font-semibold text-secondary">{tutor || "brak"}</span>
            </p>}
        </div>
    );
};

export default WelcomeHeader;