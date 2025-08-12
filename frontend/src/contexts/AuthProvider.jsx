import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    //check token after starting application
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodecToken = jwtDecode(token);
                //check if token is expired
                if (decodecToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                } else {
                    setUser(decodecToken);
                    setToken(token);
                }
            } catch (error) {
                localStorage.removeItem('token');
                console.log('Token error:', error);
            }
        }

        setLoading(false);
    }, []);


    const login = (token) => {
        try {
            const payload = jwtDecode(token);
            localStorage.setItem('token', token);
            setToken(token);
            setUser(payload);
            console.log('Login success');
            console.log('USER:', payload.name, payload.role);
            return true;
        } catch (error) {
            console.log('Login error:', error);
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };


    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
        isTutor: user?.role === 'TUTOR',
        isStudent: user?.role === 'STUDENT'
    }


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );

};



