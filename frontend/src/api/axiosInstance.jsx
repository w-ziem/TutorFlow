import axios from 'axios';


//Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, //cookies
});


let isRefreshing = false;
let failedRequests = [];

const processQueue = (error, token = null) => {
    failedRequests.forEach(request => {
        if (error.response.status === 401 && !token) {
            request.reject(error);
        } else {
            request.resolve(token);
        }
    });


    failedRequests = [];
}



//adding token to each request
axiosInstance.interceptors.request.use(async (promise) => {
    const token = localStorage.getItem('token');
    if (token) {
        promise.headers.Authorization = `Bearer ${token}`;
    }
    return promise;
}, error => Promise.reject(error));



//handle 401 and refreshToken
axiosInstance.interceptors.response.use( (response) => response, async (error) => {
    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry) {
        if(isRefreshing) {
            return new Promise((resolve, reject) => {
                failedRequests.push({resolve, reject});
            })
            //After adding to failedRequest we wait for refresh to end
                .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
            }).catch(error => Promise.reject(error));
        }
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
        const response = await axiosInstance.get('/auth/refresh');
        const {token} = response.data;

        localStorage.setItem("token", token);
        processQueue(null, token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
    } catch(refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
    } finally {
        isRefreshing = false;
    }
} );

export default axiosInstance;
