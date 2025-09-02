import axios from 'axios';

// Główna instancja axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// Oddzielna instancja TYLKO dla refresh tokena (bez interceptorów)
const refreshInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

let isRefreshing = false;
let failedRequests = [];

const processQueue = (error, token = null) => {
    failedRequests.forEach(request => {
        if (error) {
            request.reject(error);
        } else {
            request.resolve(token);
        }
    });
    failedRequests = [];
};

// Wyodrębniona funkcja do refreshu tokena
export const refreshToken = async () => {
    try {
        const response = await refreshInstance.get('/auth/refresh');
        const { token } = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        localStorage.removeItem('token');
        throw error;
    }
};

// Request interceptor - dodaje token do nagłówków
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - obsługuje 401 i refresh tokena
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedRequests.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {

            const token = await refreshToken();

            processQueue(null, token);

            // Ponów oryginalny request z nowym tokenem
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);

        } catch (refreshError) {
            console.log('Refresh token failed:', refreshError);
            processQueue(refreshError, null);

            if (refreshError.response?.status === 401) {
                window.location.href = '/login';
            }

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default axiosInstance;