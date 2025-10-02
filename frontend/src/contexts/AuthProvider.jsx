import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance, { refreshToken } from '../utils/axiosInstance.jsx';

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
    const [userId, setUserId] = useState(null);

    // Funkcja do próby refreshu tokena
    const tryRefreshToken = async () => {
        try {
            const newToken = await refreshToken();
            const decodedToken = jwtDecode(newToken);
            setUser(decodedToken);
            setUserId(decodedToken.sub);
            setToken(newToken);
            return true;
        } catch (error) {
            console.log('Refresh token failed:', error);
            logout();
            return false;
        }
    };

    // Check token after starting application
    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('token');
            
            if (storedToken) {
                try {
                    const decodedToken = jwtDecode(storedToken);
                    
                    // Check if token is expired
                    if (decodedToken.exp * 1000 < Date.now()) {
                        console.log('Token expired, attempting refresh...');
                        // Spróbuj odświeżyć token
                        await tryRefreshToken();
                    } else {
                        setUser(decodedToken);
                        setToken(storedToken);
                        setUserId(decodedToken.sub);
                    }
                } catch (error) {
                    console.log('Token decode error:', error);
                    // Spróbuj odświeżyć token jeśli nie można zdekodować
                    await tryRefreshToken();
                }
            }

            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (token) => {
        try {
            const payload = jwtDecode(token);
            localStorage.setItem('token', token);
            setToken(token);
            setUser(payload);
            setUserId(payload.sub);
            console.log('Login success');
            console.log('USER:', payload.name, payload.role);
            return true;
        } catch (error) {
            console.log('Login error:', error);
            return false;
        }
    };

    const logout = async () => {
        try{
            localStorage.removeItem('token');
            await axiosInstance.post("auth/logout");
            localStorage.clear();
            sessionStorage.clear();
            setToken(null);
            setUser(null);
        }catch (err) {
            console.log("Error logging out: " + err.message);
            localStorage.clear();
            sessionStorage.clear();
            setToken(null);
            setUser(null);
        }
    };

    const value = {
        user,
        userId,
        token,
        loading,
        login,
        logout,
        tryRefreshToken,
        isAuthenticated: !!token,
        isTutor: user?.role === 'TUTOR',
        isStudent: user?.role === 'STUDENT'
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};